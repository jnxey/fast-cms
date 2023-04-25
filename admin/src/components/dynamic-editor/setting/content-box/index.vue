<script setup>
import Wrap from './render-tree/wrap/index.vue'
import RenderTree from './render-tree/index.vue'
import { Widgets } from '@/components/dynamic-editor/setting/_values/widgets'

const props = defineProps({ tree: Object })
</script>
<template>
  <div class="dynamic-setting-content-box">
    <Wrap :display="Widgets[tree.key].display" :sign="tree.uid" class="page-wrap">
      <component :is="Widgets[tree.key].component">
        <RenderTree :list="tree.children" />
      </component>
    </Wrap>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
