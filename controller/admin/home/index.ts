import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { View } from '@/controller/_tools/method'
import { Jwt } from '@/tools/jwt'

export class AdminHome extends ControllerApi {
  @View()
  @Jwt.protected()
  public async index(ctx: ExtendableContext, next: Next) {
    const jwt = ctx?.state?.jwtdata || {}
    console.log(jwt, '---------------')
    await ctx.render('admin/home', {
      layout: 'layout/admin'
    })
    return next()
  }
}
