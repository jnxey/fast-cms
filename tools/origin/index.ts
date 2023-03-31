import { getConfig } from '@/tools/system'
import { ExtendableContext, Next } from 'koa'

/// 设置允许的origin
export function setAllowOrigin(ctx: ExtendableContext, next: Next) {
  const allows = getConfig().allowOrigin || []
  const okey = allows.indexOf(ctx.request?.headers?.origin || '')
  if (allows.length === 0) {
    ctx.set('Access-Control-Allow-Origin', '*')
  } else if (okey > -1) {
    ctx.set('Access-Control-Allow-Origin', allows[okey])
  } else {
    ctx.set('Access-Control-Allow-Origin', allows[0])
  }
  return next()
}
