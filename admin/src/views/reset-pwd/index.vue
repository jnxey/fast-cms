<script setup>
import { ref } from 'vue'
import {ElLoading, ElMessage, ElMessageBox} from 'element-plus'
import { Http, HttpApis } from '@/tools/http'
import { md5 } from '@/tools/md5'
import { SystemValues } from '@/tools/values'

const ruleForm = ref({ admin_pwd: '' })

const ruleFormRef = ref(null)

const rules = {
  admin_pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const submit = () => {
  const ref = ruleFormRef.value
  if (!ref) return
  ref.validate(function (valid) {
    if (!valid) return
    const params = { admin_pwd: md5(ruleForm.value.admin_pwd, SystemValues.salt) }
    const loading = ElLoading.service({ lock: true, text: '正在修改...' })
    Http.post(HttpApis.resetPwd, params)
      .then((response) => {
        const res = response.data
        if (res.code === SystemValues.responseMap.success.code) {
          ruleForm.value = { admin_pwd: '' }
          ElMessage({ message: '修改成功', type: 'success' })
        } else {
          ElMessageBox.alert(res.msg, '修改失败')
        }
      })
      .catch(function (err) {
        ElMessageBox.alert(err.toString(), '修改失败')
      })
      .finally(function () {
        loading.close()
      })
  })
}
</script>
<template>
  <div class="page-admin-page-login-wrap">
    <div class="login-box">
      <div class="title fz-16 fw-700 mb-32 t-ac">密码修改</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="admin_pwd">
          <el-input
            v-model="ruleForm.admin_pwd"
            type="password"
            placeholder="请输入要修改密码"
            size="large"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-button" type="primary" @click="submit" size="large">
            立即修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
.login-box {
  width: 400px;
  margin: 0 auto;
}
.submit-button {
  width: 100%;
}
</style>
