import { ExtendableContext, Next } from 'koa'

export class Ext {
  public static image(ctx: ExtendableContext, next: Next) {
    const orign = ctx.originalUrl || ''
    if (/(\.jpg|\.jpeg|\.png|\.gif)$/i.test(orign)) {
      const last = orign.lastIndexOf('.')
      ctx.response.set('content-type', 'image/' + orign.slice(last + 1))
    }
    return next()
  }
}
