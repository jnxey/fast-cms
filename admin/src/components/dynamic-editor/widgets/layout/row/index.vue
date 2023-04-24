<script setup name="Row">
import Wrap from '../../wrap/index.vue'

const props = defineProps({ options: Object })
</script>
<template>
  <Wrap display="block">
    <slot />
  </Wrap>
</template>
