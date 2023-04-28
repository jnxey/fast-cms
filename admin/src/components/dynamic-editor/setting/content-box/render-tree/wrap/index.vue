<script setup>
import { computed } from 'vue'
import {
  currentHover,
  asyncMouseLeave,
  syncMouseEnter,
  syncMouseMove
} from '@/components/dynamic-editor/setting/_tools/match'
import {
  clearCurrentAttribute,
  currentAttribute,
  setCurrentAttribute
} from '@/components/dynamic-editor/setting/_tools/attribute'

// display: inline inline-block block
const props = defineProps({ widget: Object, sign: String, display: String })

const mouseEnter = (e) => {
  syncMouseEnter(e, props.sign)
}

const mouseMove = (e) => {
  syncMouseMove(e, props.sign)
}

const mouseLeave = (e) => {
  asyncMouseLeave(e, props.sign)
}

const setAttribute = () => {
  if (props.sign === currentAttribute.value?.sign) {
    clearCurrentAttribute()
  } else {
    setCurrentAttribute(props.sign, props.widget)
  }
}

const markStyle = computed(() => {
  return currentHover.value === props.sign ? { display: 'block' } : {}
})

const selectStyle = computed(() => {
  return currentAttribute.value?.sign === props.sign
    ? { display: 'block', borderColor: 'blue' }
    : {}
})
</script>
<template>
  <div
    class="widgets-wrap"
    :class="{ [display]: true }"
    :data-wrap-check="sign"
    :data-has-children="widget.hasChildren"
    @mouseover="mouseEnter"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
    @click.stop="setAttribute"
  >
    <slot />
    <span class="widget-boundary-line widget-line-top" :style="[markStyle, selectStyle]" />
    <span class="widget-boundary-line widget-line-right" :style="[markStyle, selectStyle]" />
    <span class="widget-boundary-line widget-line-bottom" :style="[markStyle, selectStyle]" />
    <span class="widget-boundary-line widget-line-left" :style="[markStyle, selectStyle]" />
  </div>
</template>
<style scoped>
.widgets-wrap {
  position: relative;
  display: inline;
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
