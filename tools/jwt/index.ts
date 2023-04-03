import jwt from 'koa-jwt'
import { ExtendableContext, Next } from 'koa'
import { Dto, ResponseCode } from '@/controller/_tools/dto'
import jsonwebtoken from 'jsonwebtoken'
import { JD } from 'Koa'

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
    const ctx: ExtendableContext = arguments[0]
    const next: Next = arguments[1]
    if (!!ctx.jwt) {
      return jwt({
        secret: Jwt.JWT_PRIVATE_KEY,
        algorithms: [Jwt.JWT_ALGORITHMS],
        getToken(_ctx: ExtendableContext): string | null {
          return _ctx.cookies.get(Jwt.JWT_GET_KEY) || null
        }
      })
    } else {
      return next()
    }
  }

  /// 生成token
  public static sign(payload: any) {
    return jsonwebtoken.sign(payload, Jwt.JWT_PRIVATE_KEY, {
      algorithm: Jwt.JWT_ALGORITHMS,
      expiresIn: '2h'
    })
  }

  /// JWT装饰器
  public static decorate(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const func: Function = descriptor.value
      descriptor.value = function (): any {
        const args = arguments
        const ctx: ExtendableContext = args[0]
        ctx.jwt = true
        return func.apply(this, args).catch(function (err) {
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
    }
  }
}
