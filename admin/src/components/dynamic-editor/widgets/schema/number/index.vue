<script setup name="number">
const props = defineProps({ options: Object, modelValue: Number })

const emit = defineEmits(['update:modelValue'])

const inputHandler = (value) => {
  emit('update:modelValue', value)
}
</script>
<template>
  <div class="widgets-schema-number" v-if="options">
    <div class="label">{{ options.label }}</div>
    <div class="value-box">
      <el-input-number class="input" :model-value="modelValue" @input="inputHandler" />
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

.widgets-schema-number .input {
  width: 180px;
}
</style>
