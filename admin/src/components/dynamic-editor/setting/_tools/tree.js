import { ref } from 'vue'
import { SchemaOptions } from '@/components/dynamic-editor/setting/_values/schema'
import { getWidgetUid } from '@/components/dynamic-editor/setting/_tools/index'

/// 当前操作树
export const currentTree = ref([
  {
    key: 'row',
    uid: '16823910876979403298',
    options: { ...SchemaOptions.row }
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

/// 插入新的节点
export function insertWidget(sign, path, config) {
  const tree = currentTree.value
  const widget = _getWidgetByPath(tree || [], path)
  console.log(tree, '------------------')
  const newWidget = {
    key: config.key,
    uid: getWidgetUid(),
    options: { ...(SchemaOptions[config.key] || {}) }
  }
  if (widget.children) {
    widget.children.push(newWidget)
  } else {
    widget.children = [newWidget]
  }
}

/// 找到节点By路径
function _getWidgetByPath(tree, path) {
  const key = tree.findIndex((val) => val.uid === path[0])
  if (key > -1) {
    if (path.length <= 1) {
      return tree[key]
    } else {
      return _getWidgetByPath(tree.children || [], path.slice(1))
    }
  } else {
    return null
  }
}
