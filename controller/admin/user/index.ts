import { Controller, ControllerExtra } from '@/framework/controller'
import { ParamsSource } from '@/framework/values'
import Request from '@/framework/request'
import Response from '@/framework/response'
import { FrameworkContext, FrameworkNext } from '@/framework/types'
import { ParamsLogin, ResultLogin } from './_models/login-form'
import { Jwt } from '@/framework/jwt'

export class AdminUser extends Controller.Api {
  @Request.Post()
  @Request.Json()
  @Request.Params(ParamsLogin, ParamsSource.Body)
  @Request.Descriptor('登录接口')
  @Response.Result(ResultLogin)
  public async login(ctx: FrameworkContext, next: FrameworkNext, options: ControllerExtra) {
    const result: ResultLogin = new ResultLogin()
    const info = { id: 1, name: '管理员', sex: '男', time: Date.now() }
    result.fill(info)
    Jwt.sign(ctx, info)
    ctx.body = Response.Dto<ResultLogin>(Response.code.success, result)
    return next()
  }

  @Request.Get()
  @Request.Json()
  @Request.Descriptor('获取用户信息')
  @Jwt.protected()
  public async info(ctx: FrameworkContext, next: FrameworkNext, options: ControllerExtra) {
    const result: ResultLogin = new ResultLogin()
    const userInfo = options.getJwtData<object>()
    result.fill(userInfo)
    console.log(userInfo, '----------------------')
    ctx.body = Response.Dto<ResultLogin>(Response.code.success, result)
    return next()
  }
}
