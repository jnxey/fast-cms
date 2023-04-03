import jwt from 'koa-jwt'
import { ExtendableContext, Next } from 'koa'
import { Dto, ResponseCode } from '@/controller/_tools/dto'

declare module 'Koa' {
  interface ExtendableContext {
    jwt?: boolean
  }
}

export class Jwt {
  /// 权限限制错误码
  static JWT_ERROR_STATUS = 401

  /// 编码私钥
  static JWT_PRIVATE_KEY = 'shared-secret'

  /// 加密方式
  static JWT_ALGORITHMS = 'HS256'

  /// JWT拦截
  static intercept() {
    const ctx: ExtendableContext = arguments[0]
    const next: Next = arguments[1]
    if (!!ctx.jwt) {
      return jwt({ secret: Jwt.JWT_PRIVATE_KEY, algorithms: [Jwt.JWT_ALGORITHMS] })
    } else {
      return next()
    }
  }

  /// 标记JWT
  static decorate(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const func: Function = descriptor.value
      descriptor.value = function (): any {
        const ctx: ExtendableContext = arguments[0]
        const next: Next = arguments[1]
        ctx.jwt = true
        return next()
          .then(function () {
            return func.apply(this, arguments)
          })
          .catch(function (err) {
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
