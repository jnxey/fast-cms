<script setup>
import { onBeforeMount, ref } from 'vue'
import { SystemValues } from '@/tools/values'
import { Http, HttpApis } from '@/tools/http'
import eventManager from '@/tools/event-manager'
import {
  EVENT_CONTENT_CLEAR,
  EVENT_CONTENT_RESET,
  EVENT_MENU_DIALOG_ADD,
  EVENT_MENU_DIALOG_EDIT
} from '@/views/space/_values'
import { ElMessageBox, ElLoading } from 'element-plus'

const { menuType, menuRoot } = SystemValues

const menuProps = { children: 'children', label: 'menu_name' }
const loading = ref(false)
const menuTree = ref([])
const currentPage = ref(null)
let menuList = []

/// 获取菜单树
const getMenuTree = (menus) => {
  const list = JSON.parse(JSON.stringify(menus))
  const getChildren = (id) => {
    var result = []
    list.forEach((val) => {
      if (val.parent_id === id) {
        val.children = getChildren(val.id)
        result.push(val)
      }
    })
    if (result.length > 0) return result
    else return null
  }
  return getChildren(menuRoot)
}

/// 初始化菜单树
const initTree = () => {
  menuTree.value = getMenuTree(menuList)
}

/// 加载菜单数据
const loadMenuList = () => {
  loading.value = true
  Http.get(HttpApis.getDocMenuList)
    .then((response) => {
      const res = response.data
      if (res.code === SystemValues.responseMap.success.code) {
        menuList = res.result
        initTree()
      } else {
        ElMessageBox.alert(res.msg)
      }
    })
    .finally(() => {
      loading.value = false
    })
}

/// 添加菜单弹窗
const addMenu = (id) => {
  eventManager.emit(EVENT_MENU_DIALOG_ADD, id)
}

const editMenu = (data) => {
  eventManager.emit(EVENT_MENU_DIALOG_EDIT, data)
}

/// 设置当前页面
const setCurrentPage = (menu) => {
  if (menu.menu_type === menuType.menu) return
  let page = { ...menu }
  let content = null
  currentPage.value = page
  eventManager.emit(EVENT_CONTENT_CLEAR)
  if (!Boolean(page.content_id)) {
    eventManager.emit(EVENT_CONTENT_RESET, { page, content })
  } else {
    const tipsError = '查询失败'
    const tipsLoading = '正在加载...'
    const loading = ElLoading.service({ lock: true, text: tipsLoading })
    const params = { id: menu.content_id }
    Http.get(HttpApis.getDocContent, { params: params })
      .then((response) => {
        const res = response.data
        if (res.code === SystemValues.responseMap.success.code) {
          content = res.result
        } else {
          ElMessageBox.alert(result.msg, tipsError)
        }
      })
      .finally(function () {
        loading.close()
        eventManager.emit(EVENT_CONTENT_RESET, { page, content })
      })
  }
}

onBeforeMount(() => {
  loadMenuList()
})
</script>
<template>
  <div class="space-menu-list-wrap">
    <el-tree
      v-loading="loading"
      :data="menuTree"
      :props="menuProps"
      default-expand-all
      :expand-on-click-node="false"
      node-key="id"
    >
      <template #default="{ node, data }">
        <div
          class="space-tree-node"
          :class="{ active: currentPage && currentPage.id === data.id }"
          @click="setCurrentPage(data)"
        >
          <span class="space-tree-text">{{ node.label }}</span>
          <el-dropdown trigger="click">
            <el-icon class="space-tree-icon" @click.stop><MoreFilled /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <template v-if="menuType.menu === data.menu_type">
                  <el-dropdown-item @click="addMenu(data.id)">添加子项</el-dropdown-item>
                </template>
                <el-dropdown-item @click="editMenu(data)">编辑菜单</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </el-tree>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
