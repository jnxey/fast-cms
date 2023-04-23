<script setup>
import { Widgets } from '../_values/widgets'
import { gestureDestroy, gestureInit, gestureStart } from '../_gesture/gesture'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const $el = ref(null)

const start = (e, widget) => {
  const target = $el.value?.querySelector('#widget-box-' + widget.key)
  const box = target.cloneNode(true)
  box.setAttribute('id', '')
  gestureStart(e, widget, box)
}

onMounted(() => {
  gestureInit()
})

onBeforeUnmount(() => {
  gestureDestroy()
})
</script>
<template>
  <div class="dynamic-setting-widgets-box" ref="$el">
    <div
      class="dynamic-setting-widget-item"
      v-for="widget in Widgets"
      :key="widget.key"
      :id="'widget-box-' + widget.key"
      @mousedown="(e) => start(e, widget)"
    >
      <span :class="['widget-icon t-ac', widget.icon]" />
      <span class="widget-text t-ac">{{ widget.label }}</span>
    </div>
  </div>
</template>
<style>
@import './_styles/index.css';
</style>
