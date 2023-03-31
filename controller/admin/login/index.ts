import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { View } from '@/controller/_tools/method'

export class AdminLogin extends ControllerApi {
  @View()
  public async index(ctx: ExtendableContext, next: Next) {
    await ctx.render('admin/login')
    return next()
  }
}
