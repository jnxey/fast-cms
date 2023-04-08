import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, Summary } from '@/tools/method'
import { Params, ParamsSource } from '@/tools/params'
import { ParamsLogin, ResultLogin } from '@/controller/admin/login/_models/login-form'
import { Dto, ResponseCode } from '@/tools/dto'
import { Jwt } from '@/tools/jwt'
import { Database } from '@/database'
import { DatabaseQueryResult } from '@/database/_types'
import { Result } from '@/tools/result'
import { ResultAdminInfo } from '@/controller/admin/login/_models/admin-info'
import { ParamsResetPwd } from '@/controller/admin/login/_models/reset-pwd'

export class AdminLogin extends Controller.Api {
  @Post()
  @Json()
  @Params(ParamsLogin, ParamsSource.Body)
  @Result(ResultLogin)
  @Summary('登录')
  public async login(ctx: ExtendableContext, next: Next) {
    const params: ParamsLogin = ctx.params
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
        const userResult: ResultLogin = new ResultLogin()
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
  @Result(ResultAdminInfo)
  @Summary('获取登录信息')
  public async getAdminInfo(ctx: ExtendableContext, next: Next) {
    const user = ctx?.state?.user || {}
    const userResult = new ResultAdminInfo()
    userResult.fill(user)
    ctx.body = Dto(ResponseCode.success, userResult)
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Summary('登出')
  public async logout(ctx: ExtendableContext, next: Next) {
    ctx.cookies.set(Jwt.JWT_GET_KEY, '', { httpOnly: true })
    ctx.body = Dto(ResponseCode.success, '退出成功')
    return next()
  }

  @Post()
  @Json()
  @Jwt.protected()
  @Params(ParamsResetPwd, ParamsSource.Body)
  @Summary('修改密码')
  public async resetPwd(ctx: ExtendableContext, next: Next) {
    const { admin_pwd } = ctx.params
    const { id } = ctx?.state?.user || {}
    const result: DatabaseQueryResult = await Database.execute(
      Database.format(Database.query.UpdateAdminPwd, { id, admin_pwd })
    )
    if (result.code === Database.result.success) {
      ctx.body = Dto(ResponseCode.success, null)
    } else {
      ctx.body = Dto(ResponseCode.error_server, null, result.msg)
    }
    return next()
  }
}
