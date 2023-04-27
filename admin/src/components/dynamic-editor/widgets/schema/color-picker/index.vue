<script setup name="color-picker">
const props = defineProps({ options: Object, modelValue: String })

const emit = defineEmits(['update:modelValue'])

const changeHandler = (value) => {
  emit('update:modelValue', value)
}
</script>
<template>
  <div class="widgets-schema-number" v-if="options">
    <div class="label">{{ options.label }}</div>
    <div class="value-box">
      <div class="color-box">{{ modelValue }}</div>
      <el-color-picker :model-value="modelValue" @change="changeHandler" show-alpha />
    </div>
  </div>
</template>
<style scoped>
.widgets-schema-number {
  padding: 10px;
}
.widgets-schema-number .label {
  margin-bottom: 10px;
}

.widgets-schema-number .value-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.widgets-schema-number .color-box {
  box-sizing: border-box;
  width: 132px;
  height: 32px;
  line-height: 28px;
  margin-right: 5px;
  padding-left: 5px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid #eeeeee;
}
</style>
