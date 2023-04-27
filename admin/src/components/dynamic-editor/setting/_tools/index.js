/// 获取Widget唯一标识
export function getWidgetUid() {
  const random = '0000000' + String(parseInt(Math.random() * 10000000))
  return String(Date.now()) + random.slice(-7)
}

/// 获取外边距By数组
export function getMargin(value) {
  return value?.map((v) => (v || 0) + 'px').join(' ')
}

/// 获取内边距By数组
export function getPadding(value) {
  return value?.map((v) => (v || 0) + 'px').join(' ')
}

/// 获取宽度
export function getWidth(value) {
  return value !== null ? value + 'px' : undefined
}

/// 获取高度
export function getHeight(value) {
  return value !== null ? value + 'px' : undefined
}

/// 获取圆角
export function getFillet(value) {
  return value?.map((v) => (v || 0) + 'px').join(' ')
}
