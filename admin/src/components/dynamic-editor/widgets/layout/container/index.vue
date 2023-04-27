<script setup name="container">
import { computed } from 'vue'
import {
  getFillet,
  getHeight,
  getMargin,
  getPadding,
  getWidth
} from '@/components/dynamic-editor/setting/_tools'

const props = defineProps({ options: Object })

const style = computed(() => {
  const { width, height, margin, padding, borderRadius, backgroundColor, boxShadow } = props.options
  return {
    width: getWidth(width),
    height: getHeight(height),
    margin: getMargin(margin),
    padding: getPadding(padding),
    borderRadius: getFillet(borderRadius),
    backgroundColor: backgroundColor,
    boxShadow: boxShadow
  }
})
</script>
<template>
  <div class="widgets-container-wrap" :style="style">
    <slot />
  </div>
</template>
<style scoped>
.widgets-container-wrap {
}
</style>
.
