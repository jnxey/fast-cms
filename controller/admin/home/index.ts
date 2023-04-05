import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Json, Post, Summary, View } from '@/tools/method'
import { Jwt } from '@/tools/jwt'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'
import {
  ParamsSpaceFormAdd,
  ParamsSpaceFormAddResult
} from '@/controller/admin/home/_models/space-form-add'
import { Params, ParamsSource } from '@/tools/params'
import { Dto, ResponseCode } from '@/tools/dto'
import { Result } from '@/tools/result'

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

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsSpaceFormAdd, ParamsSource.Body)
  @Result(ParamsSpaceFormAddResult)
  @Summary('添加文档空间')
  public async spaceAdd(ctx: ExtendableContext, next: Next) {
    const { space_name, space_mark, sort }: ParamsSpaceFormAdd = ctx.params
    const insertInfo = { space_name, space_mark, sort }
    const resultCount: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectSpaceCount, { space_mark })
    )
    if (resultCount.code === Database.result.success) {
      if (!Boolean(resultCount.value?.length)) {
        const resultInsert: DatabaseQueryResult = await Database.execute(
          Database.format(Database.query.InsertSpaceItem, insertInfo)
        )
        if (resultInsert.code === Database.result.error) {
          ctx.body = Dto(ResponseCode.error_server, null, resultInsert.msg)
        } else {
          const insertResult = new ParamsSpaceFormAddResult()
          insertResult.fill({ ...insertInfo, id: resultInsert.value.insertId })
          ctx.body = Dto(ResponseCode.success, insertResult)
        }
      } else {
        ctx.body = Dto(ResponseCode.error_server, null, '您提交的文档空间标识已存在')
      }
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultCount.msg)
    }
    return next()
  }
}
