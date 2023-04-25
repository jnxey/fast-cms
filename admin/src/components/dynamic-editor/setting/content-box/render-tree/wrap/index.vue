<script setup>
import { current } from '../../../_gesture/gesture'
import { computed, ref } from 'vue'

// display: inline inline-block block
const props = defineProps({ sign: String, display: String })
const mark = ref(false)

const check = (e) => {
  if (!current.value) return
  console.log(e)
}

const signEnter = () => {
  mark.value = true
}

const signLeave = () => {
  mark.value = false
}

const markStyle = computed(() => {
  return mark.value ? { display: 'block' } : {}
})
</script>
<template>
  <div
    class="widgets-wrap"
    :class="{ [display]: true }"
    :data-sign="sign"
    @mouseenter="signEnter"
    @mouseleave="signLeave"
    @mousemove="check"
  >
    <slot />
    <span class="widget-boundary-line widget-line-top" :style="markStyle" />
    <span class="widget-boundary-line widget-line-right" :style="markStyle" />
    <span class="widget-boundary-line widget-line-bottom" :style="markStyle" />
    <span class="widget-boundary-line widget-line-left" :style="markStyle" />
  </div>
</template>
<style scoped>
.widgets-wrap {
  position: relative;
  display: inline;
  width: 100%;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.inline-block {
  display: inline-block;
}

.widgets-wrap .widget-boundary-line {
  position: absolute;
  display: none;
}

.widgets-wrap.mark .widget-boundary-line {
  display: block;
}

.widget-boundary-line.widget-line-top {
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 1px dashed #000;
}

.widget-boundary-line.widget-line-right {
  top: 0;
  right: 0;
  width: 0;
  height: 100%;
  border-right: 1px dashed #000;
}

.widget-boundary-line.widget-line-bottom {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-bottom: 1px dashed #000;
}

.widget-boundary-line.widget-line-left {
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  border-left: 1px dashed #000;
}
</style>
