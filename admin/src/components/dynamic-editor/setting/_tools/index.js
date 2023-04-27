/// 获取Widget唯一标识
export function getWidgetUid() {
  const random = '0000000' + String(parseInt(Math.random() * 10000000))
  return String(Date.now()) + random.slice(-7)
}

/// 获取边距By数组
export function getMargin(value) {
  return value.map((v) => (v || 0) + 'px').join(' ')
}
