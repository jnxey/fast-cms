import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Summary, View } from '@/tools/method'

export class Home extends Controller.Api {
  @View()
  @Summary('首页')
  public async index(ctx: ExtendableContext, next: Next) {
    await ctx.render('template/home', {
      layout: 'layout/main',
      data: {}
    })
    return next()
  }
}
