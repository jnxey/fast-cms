<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import AddContent from './_components/add-content/index.vue'
import CodeEditor from '@/components/code-editor/index.vue'
import WangEditor from '@/components/wang-editor/index.vue'
import MarkdownEditor from '@/components/markdown-editor/index.vue'
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
import { userInfo } from '@/tools/user'

let cacheDocContent = ''
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
  cacheEditor(content)
}

/// 设置网页内容
const setContent = ({ page, content }) => {
  currentPage.value = page
  pageContent.value = content
  if (!content) return
  cacheEditor(content)
}

/// 缓存文档内容
const cacheEditor = (content) => {
  cacheDocContent = content.doc_content
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

const jumpPage = () => {
  if (pageContent.value?.id === homeId) {
    window.open('/home/index')
  } else {
    window.open('/space/' + pageContent.value?.id)
  }
}

const canSetHome = computed(() => {
  return userInfo.value?.admin_role === SystemValues.systemRole.manager
})

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
          <template
            v-if="!Boolean(currentPage.parent_id) && pageContent.id !== homeId && canSetHome"
          >
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
        <WangEditor v-model="pageContent.doc_content" />
      </template>
      <template v-if="pageContent.doc_type === docTypeMap.markdown">
        <MarkdownEditor v-model="pageContent.doc_content" />
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
      <template v-if="pageContent.doc_type === docTypeMap.code">
        <CodeEditor v-model="pageContent.doc_content" />
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
