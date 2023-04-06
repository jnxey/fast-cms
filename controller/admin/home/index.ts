import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, Summary, View } from '@/tools/method'
import { Jwt } from '@/tools/jwt'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'
import { Params, ParamsSource } from '@/tools/params'
import { Dto, ResponseCode } from '@/tools/dto'
import { Result } from '@/tools/result'
import {
  ParamsMenuFormAdd,
  ParamsMenuFormAddResult
} from '@/controller/admin/home/_models/menu-form-add'
import {
  ParamsContentFormAdd,
  ParamsContentFormAddResult
} from '@/controller/admin/home/_models/content-form-add'
import {
  ParamsContentGet,
  ParamsContentGetResult
} from '@/controller/admin/home/_models/content-get'

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
      Database.format(Database.query.SelectMenuList)
    )
    if (result.code !== Database.result.success) throw Error('拉取空间信息失败')
    const menus = JSON.stringify(result.value || [])
    await ctx.render('admin/space/index', {
      layout: 'layout/admin',
      data: { user, menus }
    })
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsMenuFormAdd, ParamsSource.Body)
  @Result(ParamsMenuFormAddResult)
  @Summary('添加/编辑菜单')
  public async menuAddOrEdit(ctx: ExtendableContext, next: Next) {
    const { id }: ParamsMenuFormAdd = ctx.params
    if (Boolean(id)) {
      /// 编辑
      await this.editMenu(ctx, ctx.params)
    } else {
      /// 添加
      await this.addMenu(ctx, ctx.params)
    }
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsContentFormAdd, ParamsSource.Body)
  @Result(ParamsContentFormAddResult)
  @Summary('添加文档内容')
  public async contentAdd(ctx: ExtendableContext, next: Next) {
    const { menu_id, doc_type }: ParamsContentFormAdd = ctx.params
    const resultInsert: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.InsertContentItem, { doc_type })
    )
    if (resultInsert.code === Database.result.success) {
      const contentId = resultInsert.value.insertId
      const resultUpdate: DatabaseQueryResult = await Database.execute(
        Database.format(Database.query.UpdateMenuContentId, { id: menu_id, content_id: contentId })
      )
      if (resultUpdate.code === Database.result.success) {
        const updateResult = new ParamsContentFormAddResult()
        updateResult.fill({ id: contentId, menu_id, doc_type, doc_keyword: '', doc_content: '' })
        ctx.body = Dto(ResponseCode.success, updateResult)
      } else {
        ctx.body = Dto(ResponseCode.error_server, null, resultUpdate.msg)
      }
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultInsert.msg)
    }
    return next()
  }

  @Get()
  @Jwt.protected()
  @Params(ParamsContentGet, ParamsSource.Query)
  @Result(ParamsContentGetResult)
  @Summary('获取文档内容')
  public async contentGet(ctx: ExtendableContext, next: Next) {
    const { id }: ParamsContentGet = ctx.params
    const resultSelect: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectDocContent, { id })
    )
    if (resultSelect.code === Database.result.success) {
      const selectResult = new ParamsContentGetResult()
      selectResult.fill(resultSelect.value[0] || {})
      ctx.body = Dto(ResponseCode.success, selectResult)
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultSelect.msg)
    }
    return next()
  }

  /// 添加菜单
  async addMenu(ctx: ExtendableContext, params: ParamsMenuFormAdd) {
    const { menu_name, menu_mark, menu_type, parent_id, content_id, sort } = params
    const menuInfo = { menu_name, menu_mark, menu_type, parent_id, content_id, sort }
    const resultCount: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectMenuCount, { parent_id, menu_mark })
    )
    if (resultCount.code === Database.result.success) {
      if (!Boolean(resultCount.value.length)) {
        const resultInsert: DatabaseQueryResult = await Database.execute(
          Database.format(Database.query.InsertMenuItem, menuInfo)
        )
        if (resultInsert.code === Database.result.success) {
          const insertResult = new ParamsMenuFormAddResult()
          insertResult.fill({ ...menuInfo, id: resultInsert.value.insertId })
          ctx.body = Dto(ResponseCode.success, insertResult)
        } else {
          ctx.body = Dto(ResponseCode.error_server, null, resultInsert.msg)
        }
      } else {
        ctx.body = Dto(ResponseCode.error_server, null, '您提交的菜单标识已存在')
      }
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultCount.msg)
    }
  }

  /// 编辑菜单
  async editMenu(ctx: ExtendableContext, params: ParamsMenuFormAdd) {
    const { id, menu_name, menu_mark, menu_type, sort } = params
    const menuInfo = { id, menu_name, menu_mark, menu_type, sort }
    const resultCount: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectMenuCount, { parent_id: params.parent_id, menu_mark })
    )
    if (resultCount.code === Database.result.success) {
      if (!Boolean(resultCount.value.length)) {
        const resultUpdate: DatabaseQueryResult = await Database.execute(
          Database.format(Database.query.UpdateMenuItem, menuInfo)
        )
        if (resultUpdate.code === Database.result.error) {
          ctx.body = Dto(ResponseCode.error_server, null, resultUpdate.msg)
        } else {
          const updateResult = new ParamsMenuFormAddResult()
          updateResult.fill(menuInfo)
          ctx.body = Dto(ResponseCode.success, updateResult)
        }
      } else {
        ctx.body = Dto(ResponseCode.error_server, null, '您提交的菜单标识已存在')
      }
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultCount.msg)
    }
  }
}
