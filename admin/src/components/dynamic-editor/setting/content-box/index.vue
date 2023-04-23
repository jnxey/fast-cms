<script setup>
import Container from '../../widgets/layout/container/index.vue'

console.log(Container)
const props = defineProps({ tree: Array })
</script>
<template>
  <div class="dynamic-setting-content-box">
    <Container class="page-wrap"> </Container>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
