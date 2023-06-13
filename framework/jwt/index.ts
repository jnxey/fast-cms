import jsonwebtoken from 'jsonwebtoken'
import { isString, syncFunctionProperty } from '@/framework/tools'
import { FrameworkContext, FrameworkNext } from '@/framework/types'
import Response from '@/framework/response'
import { ControllerExtra } from '@/framework/controller'

/// Jwt构造函数
export class Jwt {
  /// 编码私钥
  public static JWT_PRIVATE_KEY = 'shared-secret'

  /// 加密方式
  public static JWT_ALGORITHMS = 'HS256'

  /// 设置Token的名字
  public static JWT_GET_KEY = 'Auth-Token'

  /// Token过期时间，2天，当时间过半，权限保护装饰器被调用时，权限时间自动延长
  public static EXPIRE_TIME = 2 * (1000 * 60 * 60 * 24)

  /// 生成token
  public static sign<T>(ctx: FrameworkContext, payload: T) {
    const token = jsonwebtoken.sign(payload, Jwt.JWT_PRIVATE_KEY, {
      algorithm: Jwt.JWT_ALGORITHMS,
      expiresIn: Jwt.EXPIRE_TIME
    })

    ctx.cookies.set(Jwt.JWT_GET_KEY, token)
  }

  /// 刷新token
  public static refresh<T>(ctx: FrameworkContext, payload: T) {
    delete payload['iat']
    delete payload['exp']
    delete payload['nbf']
    delete payload['jti']
    const token = jsonwebtoken.sign(payload, Jwt.JWT_PRIVATE_KEY, {
      algorithm: Jwt.JWT_ALGORITHMS,
      expiresIn: Jwt.EXPIRE_TIME
    })

    ctx.cookies.set(Jwt.JWT_GET_KEY, token)
  }

  /// JWT装饰器-权限保护
  public static protected(auth?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const func: Function = descriptor.value
      descriptor.value = function () {
        const args = arguments
        const ctx: FrameworkContext = args[0]
        const next: FrameworkNext = args[1]
        const options: ControllerExtra = args[2]
        try {
          const token = ctx.cookies.get(Jwt.JWT_GET_KEY) || null
          const decoded = jsonwebtoken.verify(token, Jwt.JWT_PRIVATE_KEY, {
            algorithm: Jwt.JWT_ALGORITHMS
          })
          const isRefresh = decoded['exp'] - Date.now() > Jwt.EXPIRE_TIME / 2
          if (isRefresh) Jwt.refresh(ctx, { ...decoded })
          if (isString(auth)) {
            /// ToDo：处理单个权限，用户权限保存在JwtData内
          }
          options.setJwtData(decoded)
          return func.apply(this, args)
        } catch (e) {
          ctx.body = Response.Dto({ ...Response.code.error_access })
          next()
        }
      }

      /// 设置权限标识
      descriptor.value.FW_JWT_PROTECTED = true

      /// 同步原有属性
      syncFunctionProperty(func, descriptor.value)
    }
  }
}
