<script setup name="row">
/// options: { paddingTop: 30, paddingLeft: 30, paddingBottom: 30, paddingRight: 30 }
import { computed } from 'vue'

const props = defineProps({ options: Object })

const style = computed(() => {
  const { paddingTop, paddingLeft, paddingBottom, paddingRight } = props.options
  return { paddingTop, paddingLeft, paddingBottom, paddingRight }
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
