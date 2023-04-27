<script setup name="margin">
import { computed, ref } from 'vue'

const props = defineProps({ options: Object, modelValue: Array })

const emit = defineEmits(['update:modelValue'])

const input0 = ref(null)
const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const inputs = [input0, input1, input2, input3]

const top = computed(() => {
  return props.modelValue?.[0]
})

const right = computed(() => {
  return props.modelValue?.[1]
})

const bottom = computed(() => {
  return props.modelValue?.[2]
})

const left = computed(() => {
  return props.modelValue?.[3]
})

const inputHandler = (v, index) => {
  const origin = String(v.target.value)
  const value = origin.replace(/[^0-9]/g, '')
  const _value = props.modelValue || [null, null, null, null]
  _value[index] = value === '' ? null : value
  emit('update:modelValue', _value)
  if (origin !== value) {
    inputs[index].value.value = value
  }
}
</script>
<template>
  <div class="widgets-schema-padding" v-if="options">
    <div class="label">{{ options.label }}</div>
    <div class="value-box">
      <div class="place-box" />
      <div class="box-top">
        <input
          ref="input0"
          class="input"
          type="text"
          :value="top"
          @input="(v) => inputHandler(v, 0)"
          placeholder="T"
        />
      </div>
      <div class="box-right">
        <input
          ref="input1"
          class="input"
          type="text"
          :value="right"
          @input="(v) => inputHandler(v, 1)"
          placeholder="R"
        />
      </div>
      <div class="box-bottom">
        <input
          ref="input2"
          class="input"
          type="text"
          :value="bottom"
          @input="(v) => inputHandler(v, 2)"
          placeholder="B"
        />
      </div>
      <div class="box-left">
        <input
          ref="input3"
          class="input"
          type="text"
          :value="left"
          @input="(v) => inputHandler(v, 3)"
          placeholder="L"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.widgets-schema-padding {
  padding: 10px;
}
.widgets-schema-padding .label {
  margin-bottom: 10px;
}

.widgets-schema-padding .value-box {
  position: relative;
  width: 180px;
  height: 100px;
}

.widgets-schema-padding .place-box {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 2px solid #eeeeee;
}

.widgets-schema-padding .box-top {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.widgets-schema-padding .box-right {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
}

.widgets-schema-padding .box-bottom {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.widgets-schema-padding .box-left {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
}

.widgets-schema-padding .input {
  width: 30px;
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #000000;
  text-align: center;
  border: none;
  border-bottom: 1px solid #000000;
}
</style>
