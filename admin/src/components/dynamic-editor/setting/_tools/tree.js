import { ref } from 'vue'

/// 当前操作树
export const currentTree = ref([
  {
    key: 'row',
    uid: '16823910876979403298',
    options: {
      width: 750,
      height: undefined,
      padding: [30, 30, 30, 30]
    }
  }
])

/// 获取树的某个uid对于的options
export function getOptions(sign) {
  const tree = currentTree.value
  const result = { value: null, sign: sign }
  function findByList(list) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (item.uid === sign) {
        return item.options
      } else {
        const options = findByList(item.children || [])
        if (options) return options
      }
    }
  }
  result.value = findByList(tree || []) || {}
  return result
}
