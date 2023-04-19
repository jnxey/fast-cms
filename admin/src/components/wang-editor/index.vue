<template>
  <div id="content-rich-box">
    <div id="toolbar-container"><!-- 工具栏 --></div>
    <div id="editor-container"><!-- 编辑器 --></div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { toolbarKeys } from './toolbarKeys'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

let richEditor = null

onMounted(() => {
  const createEditor = window.wangEditor.createEditor
  const createToolbar = window.wangEditor.createToolbar
  const editorConfig = {
    placeholder: 'Type here...',
    scroll: false,
    onChange: function (editor) {
      emit('update:modelValue', editor.getHtml())
    }
  }
  const toolbarConfig = {
    toolbarKeys: toolbarKeys
  }
  richEditor = createEditor({
    selector: '#editor-container',
    html: props.modelValue,
    config: editorConfig,
    mode: 'default'
  })
  createToolbar({
    editor: richEditor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default'
  })
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === richEditor.getHtml()) return
    richEditor?.setHtml(props.modelValue)
  }
)
</script>
<style>
#content-rich-box {
  border: 1px solid #ccc;
  z-index: 100;
}

#content-rich-box #toolbar-container {
  border-bottom: 1px solid #ccc;
}

#content-rich-box #editor-container {
  min-height: 300px;
}
</style>
