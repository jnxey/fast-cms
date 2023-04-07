<script setup>
import MenuDialog from './_components/menu-dialog/index.vue'
import MenuList from './_components/menu-list/index.vue'
import CurrentPage from './_components/current-page/index.vue'
import eventManager from '@/tools/event-manager'
import { EVENT_MENU_DIALOG_ADD } from '@/views/space/_values'

const addMenu = () => {
  eventManager.emit(EVENT_MENU_DIALOG_ADD)
}
</script>
<template>
  <div class="page-space-wrap">
    <el-button type="primary" @click="addMenu">添加新菜单</el-button>
    <MenuDialog ref="menuDialogRef" />
    <el-container>
      <el-aside width="200px">
        <MenuList />
      </el-aside>
      <el-main>
        <CurrentPage />
      </el-main>
    </el-container>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
