<script setup>
import Wrap from './wrap/index.vue'
import { Widgets } from '@/components/dynamic-editor/setting/_values/widgets'

const props = defineProps({ list: Array })
</script>
<script>
export default { name: 'RenderTree' }
</script>
<template>
  <template v-for="widget in list">
    <Wrap
      v-if="Widgets[widget.key]"
      :key="widget.uid"
      :sign="widget.uid"
      :display="Widgets[widget.key].display"
    >
      <component :is="Widgets[widget.key].component" :options="widget.options">
        <template v-if="widget.children">
          <RenderTree :list="widget.children" />
        </template>
      </component>
    </Wrap>
  </template>
</template>
