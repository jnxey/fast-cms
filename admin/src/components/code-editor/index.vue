<template>
  <div id="content-codemirror-box" class="code-mirror" ref="el" />
</template>

<script setup>
import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const el = ref(null)

const editorState = EditorState.create({
  doc: props.modelValue,
  extensions: [
    basicSetup,
    html(),
    javascript(),
    EditorView.updateListener.of((viewUpdate) => {
      if (viewUpdate.docChanged) {
        emit('update:modelValue', viewUpdate.state.doc.toString())
      }
    })
  ]
})

let editorView = null

onMounted(() => {
  editorView = new EditorView({
    state: editorState,
    parent: el.value
  })
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue === editorView?.state.doc.toString()) return
    editorView?.dispatch({
      changes: {
        from: 0,
        to: editorView?.state.doc.length,
        insert: props.modelValue
      }
    })
  }
)
</script>
<style>
.code-mirror .cm-editor {
  border: 1px solid #eeeeee;
  min-height: 300px;
}
</style>
