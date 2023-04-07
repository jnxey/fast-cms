<script setup>
import { ref } from 'vue'
import { ElLoading, ElMessageBox } from 'element-plus'
import { Http, HttpApis } from '@/tools/http'
import { md5 } from '@/tools/md5'
import { useRouter } from 'vue-router'
import { SystemValues } from '@/tools/values'

const ruleForm = ref({ name: '', password: '' })

const ruleFormRef = ref(null)

const router = useRouter()

const rules = {
  name: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const submit = () => {
  const ref = ruleFormRef.value
  if (!ref) return
  ref.validate(function (valid) {
    if (!valid) return
    const params = { ...ruleForm.value, password: md5(ruleForm.value.password, SystemValues.salt) }
    const loading = ElLoading.service({ lock: true, text: '正在登录...' })
    Http.post(HttpApis.login, params)
      .then((response) => {
        const res = response.data
        if (res.code === SystemValues.responseMap.success.code) {
          router.push({ path: '/home' })
        } else {
          ElMessageBox.alert(res.msg, '登录失败')
        }
      })
      .catch(function (err) {
        ElMessageBox.alert(err.toString(), '登录失败')
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
      <div class="title t-ac fz-28 fw-700 mb-32">文档系统登录</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="0"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            v-model="ruleForm.name"
            type="text"
            placeholder="请输入账号名称"
            size="large"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-button" type="primary" @click="submit" size="large">
            立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
