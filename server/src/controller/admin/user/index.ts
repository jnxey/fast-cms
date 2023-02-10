import { ControllerApi } from '@/controller/_module/api'
import { ExtendableContext } from 'koa'

export class AdminUser extends ControllerApi {
  list(ctx: ExtendableContext): void {
    console.log('Woof! Woof!')
    ctx.body = 'hello word'
  }
}
