import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, View } from '@/controller/_tools/method'
import { Params, ParamsSource } from '@/controller/_tools/params'
import { ParamsLoginForm } from '@/controller/admin/login/_models/login-form'
import { Dto, ResponseCode } from '@/controller/_tools/dto'
import { Jwt } from '@/tools/jwt'
import { Database } from '@/database'
import { DatabaseQueryResult } from '@/database/_types'

export class AdminLogin extends ControllerApi {
  @View()
  public async index(ctx: ExtendableContext, next: Next) {
    await ctx.render('admin/login', {
      layout: 'layout/empty'
    })
    return next()
  }

  @Post()
  @Json()
  @Params<ParamsLoginForm>(new ParamsLoginForm(), ParamsSource.Body)
  public async login(ctx: ExtendableContext, next: Next) {
    const params: ParamsLoginForm = ctx.params
    const result: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectAdminUser, { name: params.name })
    )
    if (result.code === Database.result.error) {
      // 查找失败
      ctx.body = Dto(ResponseCode.error_password)
    } else {
      if (result.value && result.value.length === 1) {
        // 查找成功
        const user = result.value[0]
        if (user.admin_pwd === params.password) {
          // 比对成功
          const payload = { name: params.name }
          const token = Jwt.sign(payload)
          ctx.body = Dto(ResponseCode.success, token)
        } else {
          // 比对失败
          ctx.body = Dto(ResponseCode.error_password)
        }
      } else {
        // 查找失败
        ctx.body = Dto(ResponseCode.error_password)
      }
    }
    return next()
  }

  @Get()
  @Json()
  @Jwt.decorate()
  public async get(ctx: ExtendableContext, next: Next) {
    console.log(ctx.jwt, '----------------2')
    ctx.body = Dto(ResponseCode.success, '拉去用户信息成功')
    return next()
  }
}
