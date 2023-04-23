<script setup name="Container">
import Wrap from '../../wrap/index.vue'

const props = defineProps({ options: Object })
</script>
<template>
  <Wrap class="widgets-container-wrap" display="block">
    <slot />
  </Wrap>
</template>
<style scoped>
.widgets-container-wrap {
}
</style>
