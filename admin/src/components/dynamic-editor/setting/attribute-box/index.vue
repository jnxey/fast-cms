<script setup>
import { computed } from 'vue'
import { currentAttribute } from '@/components/dynamic-editor/setting/_tools/attribute'

const schema = computed(() => {
  if (!currentAttribute.value) {
    return null
  } else {
    return Widgets[currentAttribute.value.key].schema
  }
})
</script>
<template>
  <div class="dynamic-setting-attribute-box">
    <template v-if="schema"> </template>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
