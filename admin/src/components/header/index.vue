<script setup>
import { ElLoading, ElMessageBox } from 'element-plus'
import { Http, HttpApis } from '@/tools/http'
import { SystemValues } from '@/tools/values'
import { onMounted } from 'vue'
import { toLogin } from '@/tools'
import { useRouter } from 'vue-router'
import { getUserInfo, userInfo } from '@/tools/user'

const router = useRouter()

const toResetPwd = () => {
  router.push({ path: '/reset-pwd' })
}

const headerLoginOut = () => {
  ElMessageBox.confirm('确定退出登录?')
    .then(() => {
      const loading = ElLoading.service({ lock: true, text: '正在登录...' })
      Http.post(HttpApis.logout)
        .then(function (response) {
          var res = response.data
          if (res.code === SystemValues.responseMap.success.code) {
            toLogin()
          } else {
            ElMessageBox.alert(res.msg, '退出失败')
          }
        })
        .finally(function () {
          loading.close()
        })
    })
    .catch(() => {
      // catch error
    })
}

onMounted(() => {
  getUserInfo()
})
</script>
<template>
  <div class="admin-nav-top">
    <el-menu mode="horizontal" :ellipsis="false">
      <div class="flex-grow-place"></div>
      <el-sub-menu index="1" v-if="userInfo">
        <template #title>
          <img class="nav-user-icon" src="@/assets/images/user-avatar.png" alt="" />
          <span>{{ userInfo.admin_name }}</span>
        </template>
        <el-menu-item index="1-1" @click="toResetPwd">修改密码</el-menu-item>
        <el-menu-item index="1-2" @click="headerLoginOut">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
