<script setup name="txt">
import { computed } from 'vue'
import { getPX } from '@/components/dynamic-editor/setting/_tools'

const props = defineProps({ options: Object })

const style = computed(() => {
  const { lineHeight, fontSize, fontWeight, color, marginLeft, marginRight } = props.options || {}
  return {
    lineHeight: getPX(lineHeight),
    fontSize: getPX(fontSize),
    fontWeight: fontWeight,
    color: color,
    marginLeft: getPX(marginLeft),
    marginRight: getPX(marginRight)
  }
})
</script>
<template>
  <span v-if="options" :style="style">
    {{ options.value }}
  </span>
</template>
