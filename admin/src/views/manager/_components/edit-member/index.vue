<script setup>
import { onBeforeMount, ref } from 'vue'
import { SystemValues } from '@/tools/values'
import { ElLoading, ElMessageBox, ElMessage } from 'element-plus'
import { Http, HttpApis } from '@/tools/http'

const { menuType, menuRoot } = SystemValues

const tempenuForm = { id: null, auths: [] }

const visible = ref(false)
const form = ref({ ...tempenuForm })
const auths = ref([])

const emit = defineEmits(['success'])

/// 编辑权限弹窗
const show = (id, auths) => {
  form.value = { ...tempenuForm, ...{ id, auths } }
  visible.value = true
}

const getAuths = () => {
  Http.get(HttpApis.managerAuths).then((response) => {
    const res = response.data || {}
    if (res.code === SystemValues.responseMap.success.code) {
      auths.value = res.result || []
    } else {
      ElMessageBox.alert(res.msg, '查询失败')
    }
  })
}

/// 编辑权限
const editMember = () => {
  const _form = form.value
  const params = { id: _form.id, admin_auth_ids: JSON.stringify(_form.auths) }
  const loading = ElLoading.service({ lock: true, text: '正在提交...' })
  Http.post(HttpApis.managerAuthsEdit, params)
    .then((response) => {
      const res = response.data
      if (res.code === SystemValues.responseMap.success.code) {
        visible.value = false
        emit('success')
        ElMessage({ message: '提交成功', type: 'success' })
      } else {
        ElMessageBox.alert(res.msg, '提交失败')
      }
    })
    .finally(function () {
      loading.close()
    })
}

onBeforeMount(() => {
  getAuths()
})

defineExpose({ show })
</script>
<template>
  <el-dialog v-model="visible" title="编辑权限" width="300px">
    <el-form :model="form" label-width="100px">
      <div class="auths-box">
        <el-checkbox-group v-model="form.auths">
          <div class="auths-box-item" v-for="(item, index) in auths" :key="index">
            <el-checkbox :label="item.id">{{ item.menu_name }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="editMember"> 确认提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.auths-box {
  max-height: 50vh;
}
</style>
