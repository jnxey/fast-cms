<script setup>
import Wrap from './render-tree/wrap/index.vue'
import RenderTree from './render-tree/index.vue'
import { WidgetsPage, WrapSign } from '@/components/dynamic-editor/setting/_values'
import { currentTree } from '@/components/dynamic-editor/setting/_tools/tree'

const props = defineProps()
</script>
<template>
  <div class="dynamic-setting-content-box">
    <Wrap :display="WidgetsPage.display" :sign="WrapSign" :widget="WidgetsPage" class="page-wrap">
      <component :is="WidgetsPage.component">
        <RenderTree :list="currentTree" />
      </component>
    </Wrap>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
