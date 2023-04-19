<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userInfo } from '@/tools/user'
import { SystemValues } from '@/tools/values'

const close = ref(false)

const route = useRoute()

const router = useRouter()

const closeBodyStyle = 'close-slider'

const closeCacheKey = 'SliderBarClose'

const closeCacheValue = { close: 'close', open: 'open' }

const menuList = [
  { label: '首页', path: '/home' },
  { label: '文档空间', path: '/space' },
  { label: '成员管理', path: '/manager', auth: SystemValues.systemRole.manager },
  { label: '个人中心', path: '/person' }
]

const toPath = (path) => {
  router.push({ path })
}

const initClose = () => {
  if (document.body) {
    if (close.value) document.body.classList.add(closeBodyStyle)
    else document.body.classList.remove(closeBodyStyle)
  }
}

const hasAuth = (item) => {
  if (item.auth) {
    return item.auth === userInfo.value?.admin_role
  } else {
    return true
  }
}

const toogleClose = () => {
  close.value = !close.value
  initClose()
  localStorage.setItem(closeCacheKey, close.value ? closeCacheValue.close : closeCacheValue.open)
}

const activeIndex = computed(() => {
  return String(route.path)
})
onBeforeMount(() => {
  close.value = localStorage.getItem(closeCacheKey) === closeCacheValue.close
  initClose()
})
</script>
<template>
  <el-menu
    class="admin-nav-left"
    :class="{ close: close }"
    :default-active="activeIndex"
    background-color="#3a444f"
    text-color="#fff"
  >
    <template v-if="!close">
      <el-menu-item index="-1" @click="toPath('/home')">
        <img class="layui-nav-logo-img" src="@/assets/images/admin-nav-left-logo.png" alt="" />
      </el-menu-item>
      <template v-for="(item, index) in menuList">
        <template v-if="hasAuth(item)">
          <el-menu-item :key="String(index)" :index="item.path" @click="toPath(item.path)">
            <span>{{ item.label }}</span>
          </el-menu-item>
        </template>
      </template>
    </template>
    <div class="close-button" @click="toogleClose()">
      <el-icon class="icon" v-if="!close"><DArrowLeft /></el-icon>
      <el-icon class="icon" v-else><DArrowRight /></el-icon>
    </div>
  </el-menu>
</template>
<style scoped>
@import './_styles/index.css';
</style>
