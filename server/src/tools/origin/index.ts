import { getConfig } from '@/tools/system'
import { ExtendableContext } from 'koa'

/// 设置允许的origin
export function setAllowOrigin(ctx: ExtendableContext) {
  const allows = getConfig().allowOrigin || []
  const okey = allows.indexOf(ctx.request.headers.origin || '')
  if (allows.length === 0) {
    ctx.set('Access-Control-Allow-Origin', '*')
  } else if (okey > -1) {
    ctx.set('Access-Control-Allow-Origin', allows[okey])
  } else {
    ctx.set('Access-Control-Allow-Origin', allows[0])
  }
}
