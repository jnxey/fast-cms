import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, View } from '@/controller/_tools/method'
import { Params, ParamsSource } from '@/controller/_tools/params'
import { ParamsLoginForm } from '@/controller/admin/login/_models/login-form'
import { Dto, ResponseCode } from '@/controller/_tools/dto'
import { Jwt } from '@/tools/jwt'
import { Database } from '@/database'
import { DatabaseQueryResult } from '@/database/_types'
import { ResultLoginSuccess } from '@/controller/admin/login/_models/login-success-result'
import { Result } from '@/controller/_tools/result'

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
  @Params(ParamsLoginForm, ParamsSource.Body)
  @Result(ResultLoginSuccess)
  public async login(ctx: ExtendableContext, next: Next) {
    const params: ParamsLoginForm = ctx.params
    const result: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.SelectAdminUser, { name: params.name })
    )
    if (result.code === Database.result.error) {
      // 查找失败
      ctx.body = Dto(ResponseCode.error_password)
    } else if (Boolean(result.value) && Boolean(result.value.length)) {
      // 查找成功
      const user = result.value[0]
      if (user.admin_pwd === params.password) {
        // 比对成功
        const payload = new Jwt.JwtData(user.id, user.admin_name, user.system_role)
        const token = Jwt.sign(payload)
        const userResult: ResultLoginSuccess = new ResultLoginSuccess()
        userResult.fill(user)
        ctx.cookies.set(Jwt.JWT_GET_KEY, token, { httpOnly: true })
        ctx.body = Dto(ResponseCode.success, userResult)
      } else {
        // 比对失败
        ctx.body = Dto(ResponseCode.error_password)
      }
    } else {
      // 查找失败
      ctx.body = Dto(ResponseCode.error_password)
    }
    return next()
  }

  @Get()
  @Json()
  @Jwt.protected()
  public async get(ctx: ExtendableContext, next: Next) {
    console.log(ctx.jwt, '----------------2')
    ctx.body = Dto(ResponseCode.success, '拉去用户信息成功')
    return next()
  }
}
