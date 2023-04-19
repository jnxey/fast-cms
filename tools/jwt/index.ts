import jwt from 'koa-jwt'
import Koa, { ExtendableContext } from 'koa'
import jsonwebtoken from 'jsonwebtoken'
import { Controller } from '@/tools/controller'

class JwtUser {
  public id?: number
  public admin_name?: string
  public admin_role?: number
  public admin_auth_ids?: string

  constructor(id?: number, admin_name?: string, admin_role?: number, admin_auth_ids?: string) {
    this.id = id
    this.admin_name = admin_name
    this.admin_role = admin_role
    this.admin_auth_ids = admin_auth_ids
    return { id, admin_name, admin_role, admin_auth_ids }
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

  /// 获取state
  public static getUser(ctx: ExtendableContext): JwtUser {
    return ctx?.['state']?.['user'] || ({} as JwtUser)
  }

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
