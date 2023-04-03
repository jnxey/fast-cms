import jwt from 'koa-jwt'
import Koa, { ExtendableContext, Next } from 'koa'
import { Dto, ResponseCode } from '@/controller/_tools/dto'
import jsonwebtoken from 'jsonwebtoken'
import { JD } from 'Koa'
import { Controller } from '@/tools/controller'

declare module 'Koa' {
  interface JD {
    jwtdata: JwtData
  }

  interface ExtendableContext {
    jwt?: boolean
    state?: JD
  }
}

class JwtData {
  public id?: number
  public admin_name?: string
  public system_role?: number

  constructor(id: number, admin_name: string, system_role: number) {
    this.id = id
    this.admin_name = admin_name
    this.system_role = system_role
  }
}

/// Jwt构造函数
export class Jwt {
  /// 权限限制错误码
  public static JWT_ERROR_STATUS = 401

  /// 编码私钥
  public static JWT_PRIVATE_KEY = 'shared-secret'

  /// 加密方式
  public static JWT_ALGORITHMS = 'HS256'

  /// 设置Token的名字
  public static JWT_GET_KEY = 'Auth-Token'

  /// 设置Token的名字
  public static JwtData = JwtData

  /// JWT拦截
  public static intercept() {
    console.log(Controller.JwtProtectedList, '----------------1')
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

  /// JWT处理
  public static error(ctx: ExtendableContext, next: Next) {
    return next().catch(function (err) {
      if (err.status === Jwt.JWT_ERROR_STATUS) {
        ctx.status = Jwt.JWT_ERROR_STATUS
        ctx.body = Dto(ResponseCode.error_access)
      } else {
        /// ToDo: 收集错误信息
        if (err) {
          console.log(err.stack?.toString(), 'err-----------4')
        }
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
