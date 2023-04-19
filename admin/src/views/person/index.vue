<script setup>
import { userInfo } from '@/tools/user'
import { SystemValues } from '@/tools/values'
</script>

<template>
  <div class="page-person-wrap">
    <template v-if="userInfo">
      <div class="fz-16 fw-700 mb-25">用户名：{{ userInfo.admin_name }}</div>
      <div class="fz-16 fw-700">角色：{{ SystemValues.systemRoleInfo[userInfo.admin_role] }}</div>
    </template>
  </div>
</template>
