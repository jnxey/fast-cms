import { Controller, ControllerExtra } from '@/framework/controller'
import { ExtendableContext, Next } from 'koa'
import { ParamsSource } from '@/framework/values'
import { ParamsLogin, ResultLogin } from '@/controller/admin/login/_models/login-form'
import Request from '@/framework/request'
import Response from '@/framework/response'
import { Descriptor } from '@/framework/descriptor'

export class AdminLogin extends Controller.Api {
  @Request.Post()
  @Request.Json()
  @Request.Params(ParamsLogin, ParamsSource.Body)
  @Response.Result(ResultLogin)
  @Descriptor('登录')
  public async login(ctx: ExtendableContext, next: Next, options: ControllerExtra) {
    return next()
  }
}
