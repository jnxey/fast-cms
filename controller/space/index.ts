import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Summary, View } from '@/tools/method'
import { Database } from '@/database'
import { docTypeMap, resourceSpace } from '@/tools/values'
import { DatabaseQueryResult } from '@/database/_types'
import MarkdownIt from 'markdown-it'

export class Space extends Controller.Api {
  @View()
  @Summary('首页')
  public async $index(ctx: ExtendableContext, next: Next) {
    let { index } = ctx.params
    let content = { id: -1 }
    let menuList = '[]'
    let menuHome = null
    //
    const resultContent = await Database.execute(
      Database.format(Database.query.SelectDocContent, { id: index })
    )
    if (resultContent.code === Database.result.success) {
      content = resultContent.value[0] || content
      content['doc_content'] = Space.getContent(content, ctx)
    } else {
      ctx.redirect('/404.html')
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

  /// 获取Content内容
  public static getContent(content: any, ctx: ExtendableContext) {
    let result = ''
    if (!content) return result
    if (content.doc_type === docTypeMap.rich) {
      // 富文本
      result = content.doc_content
    } else if (content.doc_type === docTypeMap.markdown) {
      // markdown
      const md = new MarkdownIt()
      result = md.render(content.doc_content)
    } else if (content.doc_type === docTypeMap.website) {
      // 第三方网站
      ctx.redirect(content.doc_content)
    } else if (content.doc_type === docTypeMap.assets) {
      // 静态资源
      ctx.redirect(resourceSpace + content.id)
    }
    return result
  }
}
