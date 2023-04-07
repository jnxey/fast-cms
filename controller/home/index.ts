import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Summary, View } from '@/tools/method'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'
import { docTypeMap } from '@/tools/values'

export class Home extends Controller.Api {
  @View()
  @Summary('首页')
  public async index(ctx: ExtendableContext, next: Next) {
    let content = {}
    const resultSelect: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectDocContentHome)
    )
    if (resultSelect.code === Database.result.success) {
      const { page_index } = resultSelect.value[0] || {}
      const resultContent = await Database.execute(
        Database.format(Database.query.SelectDocContent, { id: page_index })
      )
      if (resultContent.code === Database.result.success) {
        content = resultContent.value[0] || {}
      }
    }
    await ctx.render('template/home', {
      layout: 'layout/empty',
      data: { content, docTypeMap }
    })
    return next()
  }
}
