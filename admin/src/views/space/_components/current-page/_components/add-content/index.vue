<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { SystemValues } from '@/tools/values'
import { Http, HttpApis } from '@/tools/http'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import eventManager from '@/tools/event-manager'
import { EVENT_CONTENT_ADD, EVENT_CONTENT_CHANGE, EVENT_MENU_CHANGE } from '@/views/space/_values'
const { menuType, docTypeMap, docTypeInfo } = SystemValues
const tempenuForm = { menu_id: 0, doc_type: docTypeMap.rich }
const visibleContent = ref(false)
const formContent = ref({ ...tempenuForm })

/// 添加文档内容
const addSubmit = () => {
  const params = { ...formContent.value }
  const tipsSuccess = '添加成功'
  const tipsError = '添加失败'
  const tipsLoading = '正在添加...'
  const loading = ElLoading.service({ lock: true, text: tipsLoading })
  Http.post(HttpApis.addDocContent, params)
    .then((response) => {
      var res = response.data
      if (res.code === SystemValues.responseMap.success.code) {
        const content = res.result
        visibleContent.value = false
        ElMessage({ message: tipsSuccess, type: 'success' })
        eventManager.emit(EVENT_MENU_CHANGE, {
          id: params.menu_id,
          value: { content_id: content.id }
        })
        eventManager.emit(EVENT_CONTENT_CHANGE, content)
      } else {
        ElMessageBox.alert(result.msg, tipsError)
      }
    })
    .finally(function () {
      loading.close()
    })
}

const add = (page) => {
  const menu_id = page.id
  formContent.value = { ...tempenuForm, menu_id: menu_id }
  visibleContent.value = true
}

onMounted(() => {
  eventManager.on(EVENT_CONTENT_ADD, add)
})

onBeforeUnmount(() => {
  eventManager.off(EVENT_CONTENT_ADD, add)
})
</script>
<template>
  <el-dialog v-model="visibleContent" title="选择文档类型" width="400px">
    <el-form :model="formContent">
      <el-form-item label="文档类型">
        <el-radio-group v-model="formContent.doc_type">
          <el-radio class="form-content-radio" border :label="docTypeMap.rich" size="large">
            {{ docTypeInfo[docTypeMap.rich] }}
          </el-radio>
          <el-radio class="form-content-radio" border :label="docTypeMap.markdown" size="large">
            {{ docTypeInfo[docTypeMap.markdown] }}
          </el-radio>
          <el-radio class="form-content-radio" border :label="docTypeMap.website" size="large">
            {{ docTypeInfo[docTypeMap.website] }}
          </el-radio>
          <el-radio class="form-content-radio" border :label="docTypeMap.assets" size="large">
            {{ docTypeInfo[docTypeMap.assets] }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibleContent = false">取消</el-button>
        <el-button type="primary" @click="addSubmit"> 确认添加 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
@import './_styles/index.css';
</style>
