import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Json, Post, Summary, View } from '@/tools/method'
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
import { SelectMenuExit, SelectMenuList, UpdateMenuItem } from '@/database/query'

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
    const { id, menu_name, menu_mark, menu_type, parent_id, content_id, sort }: ParamsMenuFormAdd =
      ctx.params
    if (Boolean(id)) {
      /// 编辑
      const menuInfo = { id, menu_name, menu_mark, sort }
      const resultCount: DatabaseQueryResult = await Database.execute(
        Database.format(Database.query.SelectMenuExit, { id })
      )
      if (resultCount.code === Database.result.success) {
        if (Boolean(resultCount.value.length)) {
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
          ctx.body = Dto(ResponseCode.error_server, null, '您要编辑的菜单不存在')
        }
      } else {
        ctx.body = Dto(ResponseCode.error_server, null, resultCount.msg)
      }
    } else {
      /// 添加
      const menuInfo = { menu_name, menu_mark, menu_type, parent_id, content_id, sort }
      const resultCount: DatabaseQueryResult = await Database.execute(
        Database.format(Database.query.SelectMenuCount, { parent_id, menu_mark })
      )
      if (resultCount.code === Database.result.success) {
        if (!Boolean(resultCount.value.length)) {
          const resultInsert: DatabaseQueryResult = await Database.execute(
            Database.format(Database.query.InsertMenuItem, menuInfo)
          )
          if (resultInsert.code === Database.result.error) {
            ctx.body = Dto(ResponseCode.error_server, null, resultInsert.msg)
          } else {
            const insertResult = new ParamsMenuFormAddResult()
            insertResult.fill({ ...menuInfo, id: resultInsert.value.insertId })
            ctx.body = Dto(ResponseCode.success, insertResult)
          }
        } else {
          ctx.body = Dto(ResponseCode.error_server, null, '您提交的菜单标识已存在')
        }
      } else {
        ctx.body = Dto(ResponseCode.error_server, null, resultCount.msg)
      }
    }
    return next()
  }
}
