<script setup name="margin">
import { computed, ref } from 'vue'

const props = defineProps({ options: Object, modelValue: Array })

const emit = defineEmits(['update:modelValue'])

const input0 = ref(null)
const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const inputs = [input0, input1, input2, input3]

const topLeft = computed(() => {
  return props.modelValue?.[0]
})

const topRight = computed(() => {
  return props.modelValue?.[1]
})

const bottomRight = computed(() => {
  return props.modelValue?.[2]
})

const bottomLeft = computed(() => {
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
  <div class="widgets-schema-fillet" v-if="options">
    <div class="label">{{ options.label }}</div>
    <div class="value-box">
      <div class="box-top-left">
        <input
          ref="input0"
          class="input"
          type="text"
          :value="topLeft"
          @input="(v) => inputHandler(v, 0)"
          placeholder="TL"
        />
      </div>
      <div class="box-top-right">
        <input
          ref="input1"
          class="input"
          type="text"
          :value="topRight"
          @input="(v) => inputHandler(v, 1)"
          placeholder="TR"
        />
      </div>
      <div class="box-bottom-right">
        <input
          ref="input2"
          class="input"
          type="text"
          :value="bottomRight"
          @input="(v) => inputHandler(v, 2)"
          placeholder="BR"
        />
      </div>
      <div class="box-bottom-left">
        <input
          ref="input3"
          class="input"
          type="text"
          :value="bottomLeft"
          @input="(v) => inputHandler(v, 3)"
          placeholder="BL"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.widgets-schema-fillet {
  padding: 10px;
}
.widgets-schema-fillet .label {
  margin-bottom: 10px;
}

.widgets-schema-fillet .value-box {
  position: relative;
  width: 180px;
  height: 100px;
}

.widgets-schema-fillet .box-top-left {
  position: absolute;
  top: 15px;
  left: 15px;
}

.widgets-schema-fillet .box-top-left:before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  width: 10px;
  height: 10px;
  border-top: 2px solid #eeeeee;
  border-left: 2px solid #eeeeee;
  border-top-left-radius: 5px;
}

.widgets-schema-fillet .box-top-right {
  position: absolute;
  top: 15px;
  right: 15px;
}

.widgets-schema-fillet .box-top-right:before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  width: 10px;
  height: 10px;
  border-top: 2px solid #eeeeee;
  border-right: 2px solid #eeeeee;
  border-top-right-radius: 5px;
}

.widgets-schema-fillet .box-bottom-right {
  position: absolute;
  right: 15px;
  bottom: 15px;
}

.widgets-schema-fillet .box-bottom-right:before {
  content: '';
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #eeeeee;
  border-right: 2px solid #eeeeee;
  border-bottom-right-radius: 5px;
}

.widgets-schema-fillet .box-bottom-left {
  position: absolute;
  left: 15px;
  bottom: 15px;
}

.widgets-schema-fillet .box-bottom-left:before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: -10px;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #eeeeee;
  border-left: 2px solid #eeeeee;
  border-bottom-left-radius: 5px;
}

.widgets-schema-fillet .input {
  position: relative;
  width: 30px;
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #000000;
  text-align: center;
  border: none;
  border-bottom: 1px solid #000000;
  background-color: transparent;
  z-index: 10;
}
</style>
