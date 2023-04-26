<script setup>
import { computed } from 'vue'
import { currentAttribute, currentData } from '@/components/dynamic-editor/setting/_tools/attribute'
import { SchemaTypeComponent } from '@/components/dynamic-editor/setting/_values/schema'

const schema = computed(() => {
  if (!currentAttribute.value) {
    return null
  } else {
    return currentAttribute.value.widget.schema
  }
})
</script>
<template>
  <div class="dynamic-setting-attribute-box">
    <template v-if="schema">
      <div v-for="(item, index) in schema" :key="index" class="attribute-box-item">
        <component
          :is="SchemaTypeComponent[item.type]"
          v-model="currentData[item.field]"
          :options="item"
        />
      </div>
    </template>
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
