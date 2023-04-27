<script setup name="shadow">
const props = defineProps({ options: Object, modelValue: String })

const emit = defineEmits(['update:modelValue'])

const shadow = '0 5px 8px 0 rgba(0,0,0,.1)'

const changeHandler = (value) => {
  emit('update:modelValue', value)
}
</script>
<template>
  <div class="widgets-schema-number" v-if="options">
    <div class="label">{{ options.label }}</div>
    <div class="value-box">
      <el-switch
        :model-value="modelValue"
        @change="changeHandler"
        :active-value="shadow"
        :inactive-value="null"
      />
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
