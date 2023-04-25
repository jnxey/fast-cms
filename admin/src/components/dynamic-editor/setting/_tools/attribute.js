import { ref } from 'vue'

/// 当前选中编辑的盒子
export const currentAttribute = ref(null)

/// 设置要编辑的盒子
export function setCurrentAttribute(sign, key) {
  currentAttribute.value = { sign, key }
}

/// 清除要编辑的盒子
export function clearCurrentAttribute() {
  currentAttribute.value = null
}
