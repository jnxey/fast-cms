<script setup>
import Setting from './setting/index.vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const el = ref(null)

onMounted(() => {})

watch(
  () => props.modelValue,
  () => {}
)
</script>
<template>
  <div class="dynamic">
    <Setting />
  </div>
</template>
<style scoped>
@import './_styles/index.css';
</style>
