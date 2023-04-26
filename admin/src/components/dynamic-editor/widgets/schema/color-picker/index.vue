<script setup name="color-picker">
const props = defineProps({ options: Object, modelValue: String })

const emit = defineEmits(['update:modelValue'])

const inputHandler = (value) => {
  emit('update:modelValue', value)
}
</script>
<template>
  <div class="widgets-schema-number" v-if="options">
    <div class="label">{{ options.label }}</div>
    <div class="value-box">
      <el-input :model-value="modelValue" @input="inputHandler" />
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
</style>
