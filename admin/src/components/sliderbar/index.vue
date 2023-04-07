<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const close = ref(false)

const route = useRoute()

const closeBodyStyle = 'close-slider'

const closeCacheKey = 'SliderBarClose'

const closeCacheValue = { close: 'close', open: 'open' }

const menuList = [
  { label: '首页', path: '/home' },
  { label: '文档空间', path: '/space' },
  { label: '个人中心', path: '/person' }
]

const toPath = (path) => {
  location.href = path
}

const toogleClose = () => {
  close.value = !this.close
  this.initClose()
  localStorage.setItem(closeCacheKey, close.value ? closeCacheValue.close : closeCacheValue.open)
}

const initClose = () => {
  if (document.body) {
    if (close.value) document.body.classList.add(closeBodyStyle)
    else document.body.classList.remove(closeBodyStyle)
  }
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
        <template v-if="!item.children">
          <el-menu-item :key="String(index)" :index="item.path" @click="toPath(item.path)">
            <span>{{ item.label }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-sub-menu :key="String(index)" :index="String(index)">
            <template #title>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item
              v-for="(_item, _index) in item.children"
              :key="String(index) + '_' + String(_index)"
              :index="_item.path"
              @click="toPath(_item.path)"
            >
              {{ _item.label }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </template>
    </template>
    <div class="close-button" @click="toogleClose()">
      <span class="iconfont icon-arrow-down"></span>
    </div>
  </el-menu>
</template>
<style scoped>
@import './_styles/index.css';
</style>
