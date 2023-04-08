<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import AddContent from './_components/add-content/index.vue'
import { Http, HttpApis } from '@/tools/http'
import { SystemValues } from '@/tools/values'
import eventManager from '@/tools/event-manager'
import {
  EVENT_CONTENT_ADD,
  EVENT_CONTENT_CHANGE,
  EVENT_CONTENT_CLEAR,
  EVENT_CONTENT_RESET
} from '@/views/space/_values'
import { homeId } from '@/views/space/_values/home'
import { UploadFilled } from '@element-plus/icons-vue'

let cacheDocContent = ''
let richEditor = null
let markdownEditor = null
const { docTypeMap, docTypeInfo } = SystemValues
const currentPage = ref(null)
const pageContent = ref(false)

/// 编辑文档内容
const editSubmit = () => {
  ElMessageBox.confirm('确认保存您所编辑的内容？', '提示').then(() => {
    const params = { ...pageContent.value }
    const tipsSuccess = '提交成功'
    const tipsError = '提交失败'
    const tipsLoading = '正在提交...'
    const loading = ElLoading.service({ lock: true, text: tipsLoading })
    Http.post(HttpApis.editDocContent, params)
      .then(function (response) {
        const res = response.data
        if (res.code === SystemValues.responseMap.success.code) {
          ElMessage({ message: tipsSuccess, type: 'success' })
        } else {
          ElMessageBox.alert(result.msg, tipsError)
        }
      })
      .finally(() => {
        loading.close()
      })
  })
}

/// 撤销已编辑的内容
const repackEdit = () => {
  ElMessageBox.confirm('确认撤销您的编辑？', '提示').then(() => {
    const content = pageContent.value
    content.doc_content = cacheDocContent
    if (content.doc_type === docTypeMap.rich) {
      if (richEditor) richEditor.setHtml(cacheDocContent)
    } else if (content.doc_type === docTypeMap.markdown) {
      if (markdownEditor) markdownEditor.setMarkdown(cacheDocContent)
    }
  })
}

/// 创建网页内容
const addContent = () => {
  eventManager.emit(EVENT_CONTENT_ADD, currentPage.value)
}

/// 清空网页内容
const clearContent = () => {
  currentPage.value = null
  pageContent.value = null
}

/// 添加网页内容
const changeContent = (content) => {
  pageContent.value = content
  initEditor(content)
}

/// 设置网页内容
const setContent = ({ page, content }) => {
  currentPage.value = page
  pageContent.value = content
  if (!content) return
  initEditor(content)
}

/// 初始化文档编辑器
const initEditor = (content) => {
  nextTick(() => {
    cacheDocContent = content.doc_content
    if (content.doc_type === docTypeMap.rich) {
      const createEditor = window.wangEditor.createEditor
      const createToolbar = window.wangEditor.createToolbar
      const editorConfig = {
        placeholder: 'Type here...',
        scroll: false,
        onChange: function (editor) {
          pageContent.value.doc_content = editor.getHtml()
        }
      }
      const toolbarConfig = {}
      richEditor = createEditor({
        selector: '#editor-container',
        html: content.doc_content,
        config: editorConfig,
        mode: 'default'
      })
      createToolbar({
        editor: richEditor,
        selector: '#toolbar-container',
        config: toolbarConfig,
        mode: 'default'
      })
    } else if (content.doc_type === docTypeMap.markdown) {
      markdownEditor = editormd('content-markdown-box', {
        width: '100%',
        height: '500px',
        markdown: content.doc_content,
        path: './editor/editor.md/lib/',
        onchange: () => {
          pageContent.value.doc_content = markdownEditor.getMarkdown()
        }
      })
    }
  })
}

const setHome = () => {
  ElMessageBox.confirm('确认将当前页设置为网站首页？', '提示').then(() => {
    const params = { id: pageContent.value.id }
    const tipsSuccess = '提交成功'
    const tipsError = '提交失败'
    const tipsLoading = '正在提交...'
    const loading = ElLoading.service({ lock: true, text: tipsLoading })
    Http.post(HttpApis.setDocContentHome, params)
      .then(function (response) {
        const res = response.data
        if (res.code === SystemValues.responseMap.success.code) {
          homeId.value = params.id
          ElMessage({ message: tipsSuccess, type: 'success' })
        } else {
          ElMessageBox.alert(result.msg, tipsError)
        }
      })
      .finally(() => {
        loading.close()
      })
  })
}

const uploadSuccess = (e) => {
  pageContent.value.doc_content = e.result.hash
}

const uploadError = (e) => {
  ElMessageBox.alert(e.result.msg, '上传失败')
}

const jumpPage = () => {
  window.open('/space/' + pageContent.value?.id)
}

onMounted(() => {
  eventManager.on(EVENT_CONTENT_CLEAR, clearContent)
  eventManager.on(EVENT_CONTENT_RESET, setContent)
  eventManager.on(EVENT_CONTENT_CHANGE, changeContent)
})

onBeforeUnmount(() => {
  eventManager.off(EVENT_CONTENT_CLEAR, clearContent)
  eventManager.off(EVENT_CONTENT_RESET, setContent)
  eventManager.off(EVENT_CONTENT_CHANGE, changeContent)
})
</script>
<template>
  <template v-if="currentPage">
    <AddContent />
    <div class="current-page-wrap">
      <div class="current-page-title lh-1-5">
        <span>《{{ currentPage.menu_name }}》</span>
        <el-tag v-if="pageContent && pageContent.id === homeId">首页</el-tag>
      </div>
      <template v-if="pageContent">
        <div class="info">网页类型：{{ docTypeInfo[pageContent.doc_type] }}</div>
        <div class="handler-box">
          <template v-if="!Boolean(currentPage.parent_id) && pageContent.id !== homeId">
            <el-button @click="setHome">设置首页</el-button>
          </template>
          <el-button @click="jumpPage">查看页面</el-button>
          <el-button @click="repackEdit">撤销</el-button>
          <el-button type="primary" @click="editSubmit">保存</el-button>
        </div>
      </template>
      <template v-else>
        <el-button type="primary" @click="addContent">选择网页类型</el-button>
      </template>
    </div>
    <el-divider></el-divider>
    <template v-if="pageContent">
      <template v-if="pageContent.doc_type === docTypeMap.rich">
        <div id="content-rich-box">
          <div id="toolbar-container"><!-- 工具栏 --></div>
          <div id="editor-container"><!-- 编辑器 --></div>
        </div>
      </template>
      <template v-if="pageContent.doc_type === docTypeMap.markdown">
        <div id="content-markdown-box"></div>
      </template>
      <template v-if="pageContent.doc_type === docTypeMap.website">
        <div id="content-website-box">
          <el-input
            v-model="pageContent.doc_content"
            type="text"
            placeholder="请输入网站地址"
          ></el-input>
        </div>
      </template>
      <template v-if="pageContent.doc_type === docTypeMap.assets">
        <div id="content-assets-box">
          <el-upload class="upload-demo" drag :action="HttpApis.fileSave" @success="uploadSuccess">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拉取ZIP文件到这里或者 <em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">仅支持ZIP格式文件，最大不能超过5M</div>
            </template>
          </el-upload>
        </div>
      </template>
    </template>
  </template>
  <template v-if="pageContent === false">
    <el-empty description="请在左侧选中页面"></el-empty>
  </template>
</template>
<style scoped>
@import './_styles/index.css';
</style>
