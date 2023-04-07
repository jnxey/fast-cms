import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Summary, View } from '@/tools/method'
import { Database } from '@/database'
import { docTypeMap } from '@/tools/values'
import { DatabaseQueryResult } from '@/database/_types'
import { ResultContentHome } from '@/controller/admin/home/_models/content-home'
import { Dto, ResponseCode } from '@/tools/dto'

export class Space extends Controller.Api {
  @View()
  @Summary('首页')
  public async $index(ctx: ExtendableContext, next: Next) {
    let content = {}
    let menuList = '[]'
    let menuHome = null
    let { index } = ctx.params
    //
    const resultContent = await Database.execute(
      Database.format(Database.query.SelectDocContent, { id: index })
    )
    if (resultContent.code === Database.result.success) {
      content = resultContent.value[0] || {}
    }
    //
    const resultMenuList: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectMenuList)
    )
    if (resultMenuList.code === Database.result.success) {
      menuList = JSON.stringify(resultMenuList.value || [])
    }
    //
    const resultHome: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectDocContentHome)
    )
    if (resultHome.code === Database.result.success) {
      const { page_index } = resultHome.value[0] || {}
      menuHome = page_index || 0
    }
    await ctx.render('template/space', {
      layout: 'layout/empty',
      data: { content, menuList, menuHome, docTypeMap }
    })
    return next()
  }
}
