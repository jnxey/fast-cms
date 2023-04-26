import { ref } from 'vue'
import { getOptions } from '@/components/dynamic-editor/setting/_tools/tree'

/// 当前选中编辑的盒子
export const currentAttribute = ref(null)

/// 当前编辑的数据
export const currentData = ref({})

/// 设置要编辑的盒子
export function setCurrentAttribute(sign, widget) {
  currentAttribute.value = { sign, widget }
  currentData.value = getOptions(sign)
}

/// 清除要编辑的盒子
export function clearCurrentAttribute() {
  currentAttribute.value = null
  currentData.value = {}
}
