<script setup>
import {onBeforeMount, ref} from "vue";
import {Http, HttpApis} from "@/tools/http";
import {SystemValues} from "../../tools/values";

const user = ref(null)

const getAdminInfo = () => {
  Http.get(HttpApis.getAdminInfo).then(function (response) {
    var res = response.data
    if (res.code === SystemValues.responseMap.success.code) {
      user.value = res.result
    }
  })
}

onBeforeMount(() => {
  getAdminInfo()
})
</script>

<template>
  <div class="page-person-wrap">
    <template v-if="user">
      <div class="fz-16 fw-700 mb-25">
        用户名：{{user.admin_name}}
      </div>
    </template>
  </div>
</template>
