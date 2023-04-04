import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, View } from '@/tools/method'
import { Params, ParamsSource } from '@/tools/params'
import { ParamsLoginForm } from '@/controller/admin/login/_models/login-form'
import { Dto, ResponseCode } from '@/tools/dto'
import { Jwt } from '@/tools/jwt'
import { Database } from '@/database'
import { DatabaseQueryResult } from '@/database/_types'
import { ResultLoginSuccess } from '@/controller/admin/login/_models/login-success-result'
import { Result } from '@/tools/result'

export class AdminLogin extends Controller.Api {
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
        const payload = new Jwt.JwtUser(user.id, user.admin_name, user.system_role)
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

  @Post()
  @Json()
  @Jwt.protected()
  public async loginout(ctx: ExtendableContext, next: Next) {
    ctx.cookies.set(Jwt.JWT_GET_KEY, '', { httpOnly: true })
    ctx.body = Dto(ResponseCode.success, '退出成果')
    return next()
  }
}
