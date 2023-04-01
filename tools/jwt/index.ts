import jwt from 'koa-jwt'
import { ExtendableContext, Next } from 'koa'
import { Dto, ResponseCode } from '@/controller/_tools/dto'

declare module 'Koa' {
  interface ExtendableContext {
    jwt?: boolean
  }
}

/// 权限限制错误码
const JWT_ERROR_STATUS = 401

/// 编码私钥
export const JWT_PRIVATE_KEY = 'shared-secret'

/// 加密方式
export const JWT_ALGORITHMS = 'HS256'

/// JWT拦截
export function jwtIntercept() {
  const ctx: ExtendableContext = arguments[0]
  const next: Next = arguments[1]
  if (!!ctx.jwt) {
    return jwt({ secret: JWT_PRIVATE_KEY, algorithms: [JWT_ALGORITHMS] })
  } else {
    return next()
  }
}

/// 标记JWT
export function Jwt(): Function {
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
          if (err.status === JWT_ERROR_STATUS) {
            ctx.status = JWT_ERROR_STATUS
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
