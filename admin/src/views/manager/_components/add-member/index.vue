<script setup>
import { ref } from 'vue'
import { SystemValues } from '@/tools/values'
import { ElLoading, ElMessageBox, ElMessage } from 'element-plus'
import { Http, HttpApis } from '@/tools/http'
import { md5 } from '@/tools/md5'

const { menuType, menuRoot } = SystemValues

const tempenuForm = {
  admin_name: '',
  admin_pwd: ''
}

const visible = ref(false)
const form = ref({ ...tempenuForm })

const emit = defineEmits(['success'])

/// 添加成员弹窗
const show = () => {
  form.value = { ...tempenuForm }
  visible.value = true
}

/// 添加成员
const addMember = () => {
  const _form = form.value
  const isValid = _form.admin_name && _form.admin_pwd
  if (isValid) {
    const params = { ..._form }
    params.admin_pwd = md5(params.admin_pwd, SystemValues.salt)
    const tipsSuccess = '添加成功'
    const tipsError = '添加失败'
    const tipsLoading = '正在添加...'
    const loading = ElLoading.service({ lock: true, text: tipsLoading })
    Http.post(HttpApis.managerAdd, params)
      .then((response) => {
        const res = response.data
        if (res.code === SystemValues.responseMap.success.code) {
          visible.value = false
          emit('success')
          ElMessage({ message: tipsSuccess, type: 'success' })
        } else {
          ElMessageBox.alert(res.msg, tipsError)
        }
      })
      .finally(function () {
        loading.close()
      })
  } else {
    ElMessage({ message: '请完善表单信息', type: 'warning' })
  }
}

defineExpose({ show })
</script>
<template>
  <el-dialog v-model="visible" title="添加成员" width="400px">
    <el-form :model="form" label-width="100px">
      <el-form-item label="成员名称">
        <el-input v-model="form.admin_name" placeholder="成员名称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="成员密码">
        <el-input
          v-model="form.admin_pwd"
          placeholder="成员密码"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="addMember"> 确认添加 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
