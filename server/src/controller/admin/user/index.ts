import { ControllerApi } from '@/controller/_module/api'
import { ExtendableContext, Next } from 'koa'

export class AdminUser extends ControllerApi {
  list(ctx: ExtendableContext, next: Next) {
    console.log('--------------r1')
    ctx.body = 'hello word'
    return next()
  }
  er(ctx: ExtendableContext): void {
    console.log('--------------r2')
    throw Error('报错了')
  }
}
