import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Summary, View } from '@/tools/method'
import { Jwt } from '@/tools/jwt'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'

export class AdminHome extends Controller.Api {
  @View()
  @Jwt.protected()
  @Summary('后台首页')
  public async index(ctx: ExtendableContext, next: Next) {
    const user = ctx?.state?.user || {}
    await ctx.render('admin/home/index', {
      layout: 'layout/admin',
      data: { user }
    })
    return next()
  }

  @View()
  @Jwt.protected()
  @Summary('后台个人中心页')
  public async person(ctx: ExtendableContext, next: Next) {
    const user = ctx?.state?.user || {}
    await ctx.render('admin/person/index', {
      layout: 'layout/admin',
      data: { user }
    })
    return next()
  }

  @View()
  @Jwt.protected()
  @Summary('后台文档空间')
  public async space(ctx: ExtendableContext, next: Next) {
    const user = ctx?.state?.user || {}
    const result: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectSpaceList)
    )
    if (result.code !== Database.result.success) throw Error('拉取空间信息失败')
    const spaces = result.value || []
    await ctx.render('admin/space/index', {
      layout: 'layout/admin',
      data: { user, spaces }
    })
    return next()
  }
}
