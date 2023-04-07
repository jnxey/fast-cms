<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from '@/components/header/index.vue'
import Sliderbar from '@/components/sliderbar/index.vue'

const route = useRoute()

const layout = computed(() => {
  return Boolean(route.meta.layout)
})
</script>

<template>
  <template v-if="layout">
    <Header />
    <Sliderbar />
    <div class="page-container">
      <RouterView />
    </div>
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>

<style>
html,
body {
  background-color: #f3f3f3;
}

.page-container {
  box-sizing: border-box;
  margin-top: 75px;
  margin-left: 235px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ffffff;
  transition: margin-left linear 0.3s;
}

.close-slider .page-container {
  margin-left: 65px;
}
</style>
