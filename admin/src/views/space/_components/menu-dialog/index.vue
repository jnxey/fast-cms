<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { SystemValues } from '@/tools/values'
import { ElLoading, ElMessageBox } from 'element-plus'
import { Http } from '@/tools/http'
import eventManager from '@/tools/event-manager'
import {
  EVENT_MENU_CHANGE,
  EVENT_MENU_DIALOG_ADD,
  EVENT_MENU_DIALOG_EDIT
} from '@/views/space/_values'

const { menuType, menuRoot } = SystemValues

const tempenuForm = {
  menu_name: '',
  menu_mark: '',
  menu_type: menuType.menu,
  parent_id: menuRoot,
  content_id: 0,
  sort: 0
}

const visibleMenu = ref(false)
const formMenu = ref({ ...tempenuForm })

/// 添加菜单弹窗
const add = (id) => {
  var temp = Boolean(id) ? { parent_id: id } : {}
  formMenu.value = { ...tempenuForm, ...temp }
  visibleMenu.value = true
}

/// 编辑菜单弹窗
const edit = (data) => {
  formMenu.value = { ...tempenuForm, ...data }
  visibleMenu.value = true
}

/// 添加/编辑菜单
const addOrEditMenu = () => {
  const form = formMenu.value
  const isValid = form.menu_name && form.menu_mark
  if (isValid) {
    const params = { ...form }
    const tipsSuccess = params.id ? '编辑成功' : '添加成功'
    const tipsError = params.id ? '编辑失败' : '添加失败'
    const tipsLoading = params.id ? '正在编辑...' : '正在添加...'
    const loading = ElLoading.service({ lock: true, text: tipsLoading })
    Http.post(HttpApis.menuAddOrEdit, params)
      .then((response) => {
        const res = response.data
        if (res.code === SystemValues.responseMap.success.code) {
          visibleMenu.value = false
          ElMessage({ message: tipsSuccess, type: 'success' })
          if (Boolean(params.id)) {
            eventManager.emit(EVENT_MENU_CHANGE, { id: params.id, value: res.result })
          }
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

onMounted(() => {
  eventManager.on(EVENT_MENU_DIALOG_ADD, add)
  eventManager.on(EVENT_MENU_DIALOG_EDIT, edit)
})

onBeforeUnmount(() => {
  eventManager.off(EVENT_MENU_DIALOG_ADD, add)
  eventManager.off(EVENT_MENU_DIALOG_EDIT, edit)
})
</script>
<template>
  <el-dialog v-model="visibleMenu" :title="formMenu.id ? '编辑空间' : '添加空间'" width="400px">
    <el-form :model="formMenu" label-width="100px">
      <el-form-item label="菜单名称">
        <el-input v-model="formMenu.menu_name" placeholder="菜单名称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单标识">
        <el-input v-model="formMenu.menu_mark" placeholder="菜单标识" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="formMenu.menu_type" :disabled="Boolean(formMenu.id)">
          <el-radio :label="menuType.menu" size="large">菜单</el-radio>
          <el-radio :label="menuType.page" size="large">页面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单排序">
        <el-input-number
          class="space-add-number"
          v-model="formMenu.sort"
          :min="0"
          :step="1"
          step-strictly
        ></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visibleMenu = false">取消</el-button>
        <el-button type="primary" @click="addOrEditMenu">
          确认{{ formMenu.id ? '编辑' : '添加' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
