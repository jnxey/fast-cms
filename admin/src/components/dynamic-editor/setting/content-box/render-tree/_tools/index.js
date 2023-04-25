import { ref } from 'vue'

/// 缓存当前鼠标移入的最小项
export const currentHover = ref(null)

/// 处理当前当前控制鼠标移入动作
export function syncMouseEnter(e, sign) {
  const target = document.querySelector('[data-wrap-check="' + sign + '"]') || []
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
  const target = document.querySelector('[data-wrap-check="' + sign + '"]') || []
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
