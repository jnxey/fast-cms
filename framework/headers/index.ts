import { ExtendableContext, Next } from 'koa'

/// Origin设置
export class Headers {
  /// 设置允许的origin
  public static setAllowOrigin(ctx: ExtendableContext, next: Next) {
    const allows = ['']
    const key = allows.indexOf(ctx.originalUrl || '')
    if (allows.length === 0) {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else if (key > -1) {
      ctx.set('Access-Control-Allow-Origin', allows[key])
    } else {
      ctx.set('Access-Control-Allow-Origin', allows[0])
    }
    return next()
  }

  /// 设置图片格式
  public static setImageExt(ctx: ExtendableContext, next: Next) {
    const orign = ctx.originalUrl || ''
    if (/(\.jpg|\.jpeg|\.png|\.gif)$/i.test(orign)) {
      const last = orign.lastIndexOf('.')
      ctx.response.set('content-type', 'image/' + orign.slice(last + 1))
    }
    return next()
  }
}
