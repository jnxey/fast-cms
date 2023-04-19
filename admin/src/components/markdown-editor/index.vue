<template>
  <div id="content-markdown-box" />
</template>

<script setup>
import { onMounted, watch } from 'vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

let markdownEditor = null

onMounted(() => {
  markdownEditor = window.editormd('content-markdown-box', {
    width: '100%',
    height: '500px',
    markdown: props.modelValue,
    path: './editor/editor.md/lib/',
    onchange: () => {
      emit('update:modelValue', markdownEditor.getMarkdown())
    }
  })
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === markdownEditor.getMarkdown()) return
    if (markdownEditor) markdownEditor.setMarkdown(props.modelValue)
  }
)
</script>
<style></style>
