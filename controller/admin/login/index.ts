import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { Get, Json, Post, View } from '@/controller/_tools/method'
import { Params, ParamsSource } from '@/controller/_tools/params'
import { ParamsLoginForm } from '@/controller/admin/login/_models/login-form'
import { Dto, ResponseCode } from '@/controller/_tools/dto'
import { Jwt } from '@/tools/jwt'
import jsonwebtoken from 'jsonwebtoken'

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
    console.log(params, '-------------------')
    const payload = { name: params.name }
    const token = jsonwebtoken.sign(payload, Jwt.JWT_PRIVATE_KEY, {
      algorithm: Jwt.JWT_ALGORITHMS,
      expiresIn: '2h'
    })
    ctx.body = Dto(ResponseCode.success, token)
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
