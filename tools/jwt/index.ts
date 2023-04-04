import jwt from 'koa-jwt'
import Koa, { ExtendableContext, Next } from 'koa'
import { Dto, ResponseCode } from '@/tools/dto'
import jsonwebtoken from 'jsonwebtoken'
import { Controller } from '@/tools/controller'

declare module 'Koa' {
  interface User {
    user: JwtUser
  }

  interface ExtendableContext {
    jwt?: boolean
    state?: User
  }
}

class JwtUser {
  public id?: number
  public admin_name?: string
  public system_role?: number

  constructor(id: number, admin_name: string, system_role: number) {
    this.id = id
    this.admin_name = admin_name
    this.system_role = system_role
    return { id, admin_name, system_role }
  }
}

/// Jwt构造函数
export class Jwt {
  /// 编码私钥
  public static JWT_PRIVATE_KEY = 'shared-secret'

  /// 加密方式
  public static JWT_ALGORITHMS = 'HS256'

  /// 设置Token的名字
  public static JWT_GET_KEY = 'Auth-Token'

  /// 设置Token的名字
  public static JwtUser = JwtUser

  /// JWT拦截
  public static intercept() {
    return jwt({
      debug: false,
      secret: Jwt.JWT_PRIVATE_KEY,
      algorithms: [Jwt.JWT_ALGORITHMS],
      getToken(_ctx: ExtendableContext): string | null {
        return _ctx.cookies.get(Jwt.JWT_GET_KEY) || null
      }
    }).unless({
      custom: function (ctx: Koa.Context) {
        let result = true
        const url: string = ctx.originalUrl || ''
        for (let i = 0; i < Controller.JwtProtectedList.length; i++) {
          const path = Controller.JwtProtectedList[i]
          if (url.startsWith(path)) {
            result = false
            break
          }
        }
        return result
      }
    })
  }

  /// 生成token
  public static sign(payload: any) {
    return jsonwebtoken.sign(payload, Jwt.JWT_PRIVATE_KEY, {
      algorithm: Jwt.JWT_ALGORITHMS,
      expiresIn: '2h'
    })
  }

  /// JWT装饰器-保护
  public static protected(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.JWT_PROTECTED = true
    }
  }
}
