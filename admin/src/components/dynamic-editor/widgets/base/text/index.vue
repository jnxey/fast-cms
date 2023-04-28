<script setup name="text">
const props = defineProps({ options: Object })
</script>
<template>
  <span v-if="options">
    {{ options.value }}
  </span>
</template>
