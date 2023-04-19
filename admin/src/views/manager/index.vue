<script setup>
import { onMounted, ref } from 'vue'
import { Http, HttpApis } from '@/tools/http'
import { SystemValues } from '@/tools/values'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import AddMember from './_components/add-member/index.vue'
import EditMember from './_components/edit-member/index.vue'
import { getJSON } from '@/tools'

const tableData = ref([])
const addMember = ref(null)
const editMember = ref(null)

const getTableData = () => {
  Http.get(HttpApis.managerList).then((response) => {
    const res = response.data || {}
    if (res.code === SystemValues.responseMap.success.code) {
      const list = res.result || []
      list.forEach((item, index) => {
        item.index = index + 1
        item.system_role_name = SystemValues.systemRoleInfo[item.admin_role]
        item.isEditor = item.admin_role !== SystemValues.systemRole.manager
      })
      tableData.value = list
    } else {
      ElMessageBox.alert(res.msg, '查询失败')
    }
  })
}

const deleteMember = (item) => {
  ElMessageBox.confirm(`确认删除成员【${item.admin_name}】？`, '提示').then(() => {
    const loading = ElLoading.service({ lock: true, text: '正在删除...' })
    Http.post(HttpApis.managerDelete, { id: item.id })
      .then((response) => {
        const res = response.data || {}
        if (res.code === SystemValues.responseMap.success.code) {
          getTableData()
          ElMessage({ message: '删除成功', type: 'success' })
        } else {
          ElMessageBox.alert(res.msg, '删除失败')
        }
      })
      .finally(() => {
        loading.close()
      })
  })
}

const add = () => {
  addMember.value?.show()
}

const edit = (row) => {
  editMember.value?.show(row.id, getJSON(row.admin_auth_ids, []))
}

onMounted(() => {
  getTableData()
})
</script>
<template>
  <div class="page-manager-wrap">
    <div class="handler-box mb-10">
      <el-button type="primary" @click="add">添加成员</el-button>
      <el-button type="default" @click="getTableData">刷新</el-button>
    </div>
    <el-table :data="tableData" height="calc(100vh - 160px)" border>
      <el-table-column prop="index" label="序号" width="100" />
      <el-table-column prop="admin_name" label="账号" width="200" />
      <el-table-column prop="system_role_name" label="角色" width="200">
        <template #default="scope">
          <el-tag type="success">{{ scope.row.system_role_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" min-width="200" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button
            text
            type="primary"
            size="small"
            v-if="scope.row.isEditor"
            @click="edit(scope.row)"
          >
            编辑权限
          </el-button>
          <el-button
            text
            type="danger"
            size="small"
            v-if="scope.row.isEditor"
            @click="deleteMember(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <AddMember ref="addMember" @success="getTableData" />
    <EditMember ref="editMember" @success="getTableData" />
  </div>
</template>
