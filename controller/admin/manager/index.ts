import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, Summary } from '@/tools/method'
import { DatabaseQueryResult } from '@/database/_types'
import { Database } from '@/database'
import { Dto, ResponseCode } from '@/tools/dto'
import { ParamsMemberAdd } from '@/controller/admin/manager/_models/member-add'
import { Params, ParamsSource } from '@/tools/params'
import { systemRoles } from '@/tools/values'
import { ParamsMemberDelete } from '@/controller/admin/manager/_models/member-delete'
import { Jwt } from '@/tools/jwt'
import { ParamsMemberEdit } from '@/controller/admin/manager/_models/member-editor'
import { Auth } from '@/tools/auth'

export class AdminManager extends Controller.Api {
  @Get()
  @Jwt.protected()
  @Summary('获取管理员列表')
  public async list(ctx: ExtendableContext, next: Next) {
    Auth.manager(ctx)

    const resultSelect: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectManagerList)
    )
    if (resultSelect.code === Database.result.success) {
      ctx.body = Dto(ResponseCode.success, resultSelect.value)
    } else {
      ctx.body = Dto(ResponseCode.success, null, resultSelect.msg)
    }
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsMemberAdd, ParamsSource.Body)
  @Summary('添加管理员')
  public async add(ctx: ExtendableContext, next: Next) {
    Auth.manager(ctx)

    const { admin_name, admin_pwd }: ParamsMemberAdd = Params.get<ParamsMemberAdd>(ctx)
    const resultCount: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectMemberCount, { admin_name })
    )
    if (resultCount.code === Database.result.success) {
      if (!Boolean(resultCount.value.length)) {
        const resultInsert: DatabaseQueryResult = await Database.execute(
          Database.format(Database.query.InsertMember, {
            admin_name,
            admin_pwd,
            admin_role: systemRoles.editor
          })
        )
        if (resultInsert.code === Database.result.success) {
          ctx.body = Dto(ResponseCode.success)
        } else {
          ctx.body = Dto(ResponseCode.error_server, null, resultInsert.msg)
        }
      } else {
        ctx.body = Dto(ResponseCode.error_server, null, '您提交的账户名称已存在')
      }
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultCount.msg)
    }
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsMemberDelete, ParamsSource.Body)
  @Summary('删除管理员')
  public async delete(ctx: ExtendableContext, next: Next) {
    Auth.manager(ctx)

    const { id }: ParamsMemberDelete = Params.get<ParamsMemberDelete>(ctx)
    const resultDelete: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.DeleteMember, { id })
    )
    if (resultDelete.code === Database.result.success) {
      ctx.body = Dto(ResponseCode.success)
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, resultDelete.msg)
    }
    return next()
  }

  @Post()
  @Json()
  @Params(ParamsMemberEdit, ParamsSource.Body)
  @Jwt.protected()
  @Summary('编辑管理员权限')
  public async authsEdit(ctx: ExtendableContext, next: Next) {
    Auth.manager(ctx)

    const { id, admin_auth_ids }: ParamsMemberEdit = Params.get<ParamsMemberEdit>(ctx)
    const resultUpdate: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.UpateMemberAuths, { id, admin_auth_ids })
    )
    if (resultUpdate.code === Database.result.success) {
      ctx.body = Dto(ResponseCode.success)
    } else {
      ctx.body = Dto(ResponseCode.success, null, resultUpdate.msg)
    }
    return next()
  }

  @Get()
  @Json()
  @Jwt.protected()
  @Summary('获取文档角色列表')
  public async auths(ctx: ExtendableContext, next: Next) {
    Auth.manager(ctx)

    const resultSelect: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectMenuRoots)
    )
    if (resultSelect.code === Database.result.success) {
      ctx.body = Dto(ResponseCode.success, resultSelect.value)
    } else {
      ctx.body = Dto(ResponseCode.success, null, resultSelect.msg)
    }
    return next()
  }
}
