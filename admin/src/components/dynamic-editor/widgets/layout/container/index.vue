<script setup name="container">
const props = defineProps({ options: Object })
</script>
<template>
  <div class="widgets-container-wrap">
    <slot />
  </div>
</template>
<style scoped>
.widgets-container-wrap {
}
</style>
