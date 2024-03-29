import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, Summary } from '@/tools/method'
import { Jwt } from '@/tools/jwt'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'
import { Params, ParamsSource } from '@/tools/params'
import { Dto, ResponseCode } from '@/tools/dto'
import { Result } from '@/tools/result'
import { ParamsMenuAdd, ResultMenuAdd } from '@/controller/admin/home/_models/menu-add'
import { ParamsContentAdd, ResultContentAdd } from '@/controller/admin/home/_models/content-add'
import { ParamsContentGet, ResultContentGet } from '@/controller/admin/home/_models/content-get'
import { ParamsContentEdit } from '@/controller/admin/home/_models/content-edit'
import { ParamsContentHome, ResultContentHome } from '@/controller/admin/home/_models/content-home'
import { Auth } from '@/tools/auth'
import { menuRoot } from '@/tools/values'

export class AdminHome extends Controller.Api {
  @Get()
  @Jwt.protected()
  @Summary('获取文档菜单列表')
  public async getDocMenuList(ctx: ExtendableContext, next: Next) {
    const result: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectMenuList)
    )
    if (result.code !== Database.result.success) throw Error('拉取菜单信息失败')
    ctx.body = Dto(ResponseCode.success, Auth.menus(ctx, result.value || []))
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsMenuAdd, ParamsSource.Body)
  @Result(ResultMenuAdd)
  @Summary('添加/编辑菜单')
  public async menuAddOrEdit(ctx: ExtendableContext, next: Next) {
    const params = Params.get<ParamsMenuAdd>(ctx)
    const { id, parent_id }: ParamsMenuAdd = params

    if (id) {
      /// 权限校验
      Auth.checkMenu(ctx, id)

      /// 编辑
      await this.editMenu(ctx, params)
    } else {
      /// 权限校验
      Auth.checkMenu(ctx, parent_id)

      /// 添加
      await this.addMenu(ctx, params)
    }
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsContentAdd, ParamsSource.Body)
  @Result(ResultContentAdd)
  @Summary('添加文档内容')
  public async contentAdd(ctx: ExtendableContext, next: Next) {
    const { menu_id, doc_type }: ParamsContentAdd = Params.get<ParamsContentAdd>(ctx)

    /// 权限校验
    Auth.checkMenu(ctx, menu_id)

    const resultInsert: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.InsertContentItem, { doc_type })
    )
    if (resultInsert.code === Database.result.success) {
      const contentId = resultInsert.value.insertId
      const resultUpdate: DatabaseQueryResult = await Database.execute(
        Database.format(Database.query.UpdateMenuContentId, { id: menu_id, content_id: contentId })
      )
      if (resultUpdate.code === Database.result.success) {
        const updateResult = new ResultContentAdd()
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

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsContentEdit, ParamsSource.Body)
  @Summary('编辑文档内容')
  public async contentEdit(ctx: ExtendableContext, next: Next) {
    const { id, doc_keyword, doc_content }: ParamsContentEdit = Params.get<ParamsContentEdit>(ctx)

    /// 权限校验
    Auth.checkContent(ctx, id)

    const resultUpdate: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.UpdateDocContent, { id, doc_keyword, doc_content })
    )
    if (resultUpdate.code === Database.result.success) {
      ctx.body = Dto(ResponseCode.success)
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultUpdate.msg)
    }
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsContentHome, ParamsSource.Body)
  @Summary('设置文档内容为网站首页')
  public async contentHome(ctx: ExtendableContext, next: Next) {
    Auth.manager(ctx)

    const { id }: ParamsContentEdit = Params.get<ParamsContentHome>(ctx)
    const resultUpdate: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.UpdateDocContentHome, { page_index: id })
    )
    if (resultUpdate.code === Database.result.success) {
      ctx.body = Dto(ResponseCode.success)
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultUpdate.msg)
    }
    return next()
  }

  @Get()
  @Json()
  @Jwt.protected()
  @Result(ResultContentHome)
  @Summary('获取网站首页')
  public async contentHomeGet(ctx: ExtendableContext, next: Next) {
    const resultSelect: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectDocContentHome)
    )
    if (resultSelect.code === Database.result.success) {
      const value = resultSelect.value[0] || {}
      const homeResult = new ResultContentHome()
      homeResult.fill({ id: value.page_index })
      ctx.body = Dto(ResponseCode.success, homeResult)
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultSelect.msg)
    }
    return next()
  }

  @Get()
  @Jwt.protected()
  @Params(ParamsContentGet, ParamsSource.Query)
  @Result(ResultContentGet)
  @Summary('获取文档内容')
  public async contentGet(ctx: ExtendableContext, next: Next) {
    const { id }: ParamsContentGet = Params.get<ParamsContentGet>(ctx)
    const resultSelect: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectDocContent, { id })
    )
    if (resultSelect.code === Database.result.success) {
      const selectResult = new ResultContentGet()
      selectResult.fill(resultSelect.value[0] || {})
      ctx.body = Dto(ResponseCode.success, selectResult)
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultSelect.msg)
    }
    return next()
  }

  /// 添加菜单
  async addMenu(ctx: ExtendableContext, params: ParamsMenuAdd) {
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
          const insertResult = new ResultMenuAdd()
          const insertId = resultInsert.value.insertId
          insertResult.fill({ ...menuInfo, id: insertId })
          if (parent_id === menuRoot) {
            await Auth.addMenuAuths(ctx, insertId)
          }
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
  async editMenu(ctx: ExtendableContext, params: ParamsMenuAdd) {
    const { id, menu_name, menu_mark, menu_type, sort } = params
    const menuInfo = { id, menu_name, menu_mark, menu_type, sort }
    const resultCount: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectMenuCount, { parent_id: params.parent_id, menu_mark })
    )
    if (resultCount.code === Database.result.success) {
      const matchResult = resultCount.value
      if (!Boolean(matchResult.length) || matchResult[0].id === id) {
        const resultUpdate: DatabaseQueryResult = await Database.execute(
          Database.format(Database.query.UpdateMenuItem, menuInfo)
        )
        if (resultUpdate.code === Database.result.error) {
          ctx.body = Dto(ResponseCode.error_server, null, resultUpdate.msg)
        } else {
          const updateResult = new ResultMenuAdd()
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
