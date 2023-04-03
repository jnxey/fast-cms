import { getConfig } from '@/tools/system'
import { ExtendableContext, Next } from 'koa'

/// Origin设置
export class Headers {
  /// 设置允许的origin
  public static setAllowOrigin(ctx: ExtendableContext, next: Next) {
    const allows = getConfig().allowOrigin || []
    const okey = allows.indexOf(ctx.originalUrl || '')
    if (allows.length === 0) {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else if (okey > -1) {
      ctx.set('Access-Control-Allow-Origin', allows[okey])
    } else {
      ctx.set('Access-Control-Allow-Origin', allows[0])
    }
    return next()
  }
}
