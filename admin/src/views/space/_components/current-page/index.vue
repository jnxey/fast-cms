<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { Http } from '@/tools/http'
import { SystemValues } from '@/tools/values'
import eventManager from '@/tools/event-manager'
import { EVENT_CONTENT_CLEAR, EVENT_CONTENT_RESET, EVENT_MENU_CHANGE } from '@/views/space/_values'

let cacheDocContent = ''
let richEditor = null
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
  const content = pageContent.value
  content.doc_content = cacheDocContent
  if (content.doc_type === docTypeMap.rich) {
    if (richEditor) richEditor.setHtml(cacheDocContent)
  }
}

/// 创建网页内容
const addContent = () => {}

/// 清空网页内容
const clearContent = () => {
  currentPage.value = null
  pageContent.value = null
}

/// 设置网页内容
const setContent = ({ page, content }) => {
  currentPage.value = page
  pageContent.value = content
  if (!content) return
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
      const target = document.getElementById('content-markdown-box')
      new SimpleMDE({ element: target })
    }
  })
}

onMounted(() => {
  eventManager.on(EVENT_CONTENT_CLEAR, clearContent)
  eventManager.on(EVENT_CONTENT_RESET, setContent)
})

onBeforeUnmount(() => {
  eventManager.off(EVENT_CONTENT_CLEAR, clearContent)
  eventManager.off(EVENT_CONTENT_RESET, setContent)
})
</script>
<template>
  <template v-if="currentPage">
    <div class="current-page-wrap">
      <div class="current-page-title">《{{ currentPage.menu_name }}》</div>
      <template v-if="pageContent">
        <div class="info">网页类型：{{ docTypeInfo[pageContent.doc_type] }}</div>
        <div class="handler-box">
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
        <label for="content-markdown-box"></label><textarea id="content-markdown-box"></textarea>
      </template>
      <template v-if="pageContent.doc_type === docTypeMap.website">
        <div id="content-website-box">
          <el-input type="text" placeholder="请输入网站地址"></el-input>
        </div>
      </template>
      <template v-if="pageContent.doc_type === docTypeMap.assets">
        <div id="content-assets-box">
          <el-upload class="upload-demo" drag>
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">拉取图片到这里或者 <em>点击上传</em></div>
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
