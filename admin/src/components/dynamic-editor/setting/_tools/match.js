import { ref } from 'vue'
import { WrapSign } from '@/components/dynamic-editor/setting/_values'

/// 缓存当前鼠标移入的最小项
export const currentHover = ref(null)

/// 处理当前当前控制鼠标移入动作
export function syncMouseEnter(e, sign) {
  const target = document.querySelector('[data-wrap-check="' + sign + '"]')
  const child = target?.querySelectorAll('[data-wrap-check]') || []
  if (!child.length) {
    currentHover.value = sign
  } else {
    if (!currentHover.value) {
      currentHover.value = sign
    }
  }
}

/// 处理当前当前控制鼠标移动动作
export function syncMouseMove(e, sign) {
  const target = document.querySelector('[data-wrap-check="' + sign + '"]')
  const child = target?.querySelectorAll('[data-wrap-check]') || []
  if (!child.length) {
    currentHover.value = sign
  } else {
    if (!currentHover.value) {
      currentHover.value = sign
    }
  }
}

/// 处理当前当前控制鼠标移出动作
export function asyncMouseLeave(e, sign) {
  if (sign === currentHover.value) {
    currentHover.value = null
  }
}

/// 找到当前可插入的容器
export function getInsertBox() {
  const sign = currentHover.value
  const target = document.querySelector('[data-wrap-check="' + sign + '"]')
  if (!sign || !target) return null
  function getAble(elm) {
    const able = elm.getAttribute('data-has-children') === 'true'
    if (able) {
      return elm.getAttribute('data-wrap-check')
    } else if (elm.parentNode) {
      return getAble(elm.parentNode)
    } else {
      return null
    }
  }
  return getAble(target)
}

/// 找到当前插入容器的标识路径
export function getInsertPath(sign) {
  const path = []
  const target = document.querySelector('[data-wrap-check="' + sign + '"]')
  function getRoot(elm) {
    const _sign = elm.getAttribute('data-wrap-check')
    if (_sign) {
      if (_sign !== WrapSign) {
        path.unshift(_sign)
        getRoot(elm.parentNode)
      }
    } else {
      if (elm.parentNode) getRoot(elm.parentNode)
    }
  }
  getRoot(target)
  return path
}
