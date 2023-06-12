import { Controller, ControllerExtra } from '@/framework/controller'
import { ExtendableContext, Next } from 'koa'
import { ParamsSource } from '@/framework/values'
import Request from '@/framework/request'
import Response from '@/framework/response'
import { ParamsLogin, ResultLogin } from './_models/login-form'

export class AdminUser extends Controller.Api {
  @Request.Post()
  @Request.Json()
  @Request.Params(ParamsLogin, ParamsSource.Body)
  @Request.Descriptor('登录')
  @Response.Result(ResultLogin)
  public async login(ctx: ExtendableContext, next: Next, options: ControllerExtra) {
    const result: ResultLogin = new ResultLogin()
    result.fill({ name: '管理员', sex: '男' })
    console.log(options.getQuery<ParamsLogin>(), '----------------------')
    ctx.body = Response.Dto<ResultLogin>(Response.code.success, result)
    return next()
  }
}
