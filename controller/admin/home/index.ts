import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { View } from '@/tools/method'
import { Jwt } from '@/tools/jwt'

export class AdminHome extends Controller.Api {
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
