<script setup name="row">
/// options: { padding: [30,30,30,30] }
import { computed } from 'vue'
import { getMargin } from '@/components/dynamic-editor/setting/_tools'

const props = defineProps({ options: Object })

const style = computed(() => {
  const { padding } = props.options
  return { padding: getMargin(padding) }
})
</script>
<template>
  <div class="widgets-row-wrap" :style="style">
    <slot />
  </div>
</template>
<style scoped>
.widgets-row-wrap {
  display: flex;
  flex-direction: row;
}
</style>
.
