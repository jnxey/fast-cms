<script setup>
import Text from '../../../widgets/base/text/index.vue'
import Column from '../../../widgets/layout/column/index.vue'
import Container from '../../../widgets/layout/container/index.vue'
import Row from '../../../widgets/layout/row/index.vue'

const props = defineProps({ list: Array })
</script>
<template>
  <div class="dynamic-setting-content-box">
    <Container class="page-wrap"> </Container>
  </div>
</template>
