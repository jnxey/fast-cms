import { ExtendableContext, Next } from 'koa'
import { Controller } from '@/tools/controller'
import { Dto, ResponseCode } from '@/tools/dto'

export class ErrorKoa {
  /// 404
  public static NotFound = 404

  /// 401
  public static JWT_ERROR_STATUS = 401

  /// JWT处理
  public static onerror(ctx: ExtendableContext, next: Next) {
    const url: string = ctx.originalUrl || ''
    return next().catch(function (err) {
      const isApi = url.startsWith(Controller.ApiPrefix)
      if (ctx.status === ErrorKoa.JWT_ERROR_STATUS || err?.status === ErrorKoa.JWT_ERROR_STATUS) {
        /// 权限
        if (isApi) {
          ctx.status = ErrorKoa.JWT_ERROR_STATUS
          ctx.body = Dto(ResponseCode.error_access)
        } else {
          ctx.redirect('/admin-login/index')
        }
      } else if (ctx.status === ErrorKoa.NotFound) {
        /// 未找到
        if (isApi) {
          ctx.status = ErrorKoa.NotFound
          ctx.body = Dto(ResponseCode.error_notfound)
        } else {
          ctx.redirect('/404.html')
        }
      } else {
        /// 其他错误
        if (isApi) {
          ctx.status = ErrorKoa.NotFound
          ctx.body = Dto(ResponseCode.error_server)
        } else {
          ctx.redirect('/500.html')
        }
      }
    })
  }
}
