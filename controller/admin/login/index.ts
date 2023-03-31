import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { Json, Post, View } from '@/controller/_tools/method'
import { Params, ParamsSource } from '@/controller/_tools/params'
import { ParamsLoginForm } from '@/controller/admin/login/_models/login-form'

export class AdminLogin extends ControllerApi {
  @View()
  public async index(ctx: ExtendableContext, next: Next) {
    await ctx.render('admin/login', {
      layout: 'layout/empty'
    })
    return next()
  }

  @Post()
  @Json()
  @Params<ParamsLoginForm>(new ParamsLoginForm(), ParamsSource.Body)
  public async login(ctx: ExtendableContext, next: Next, params: ParamsLoginForm) {
    console.log(params, '-------------------')
    return next()
  }
}
