<script setup name="page">
const props = defineProps({ options: Object })
</script>
<template>
  <div class="widgets-page-wrap">
    <slot />
  </div>
</template>
<style scoped>
.widgets-page-wrap {
}
</style>
