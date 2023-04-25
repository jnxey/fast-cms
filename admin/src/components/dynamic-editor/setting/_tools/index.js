/// 获取Widget唯一标识
export function getUid() {
  const random = '0000000' + String(parseInt(Math.random() * 10000000))
  return String(Date.now()) + random.slice(-7)
}
