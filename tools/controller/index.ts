import Router from '@koa/router'
import { koaBody } from 'koa-body'
import { ExtendableContext, Next } from 'koa'
import { kebabCase } from '@/tools'
import { RequestDataType, RequestMethod } from '@/tools/method'

export class Api {}
export class Controller {
  /// Api前缀
  public static ApiPrefix = '/api/'

  /// 页面前缀
  public static ViewPrefix = '/'

  /// 控制器Api
  public static Api = Api

  /// Jwt白名单
  public static JwtProtectedList: string[] = []

  /// 连接控制器
  public static connect<T extends Api>(instance: T, router: Router) {
    const moduleName: string = instance.constructor.name
    const apis: string[] = Object.getOwnPropertyNames(instance.constructor.prototype)
    apis.forEach((name) => {
      if (name === 'constructor') return
      const resetful =
        instance[name].METHOD === RequestMethod.View ? Controller.ViewPrefix : Controller.ApiPrefix
      const extn = name.indexOf('$') === 0 ? ':' : '/:'
      const module = kebabCase(moduleName)
      const func = kebabCase(name).replace('$', extn)
      const path: string = resetful + module + '/' + func
      /// 添加jwt白名单
      if (instance[name].JWT_PROTECTED) {
        Controller.JwtProtectedList.push(path)
      }
      const handler: Router.Middleware = (ctx: ExtendableContext, next: Next) => {
        try {
          return instance[name](ctx, next)
        } catch (err: Error | any) {
          /// ToDo: 收集错误信息
          if (err instanceof Error) console.log(err.stack?.toString(), 'err-----------1')
        }
      }
      if (instance[name].METHOD === RequestMethod.Post) {
        if (instance[name].DATA_TYPE === RequestDataType.Json) {
          router.post(path, koaBody({ json: true }), handler)
        } else if (instance[name].DATA_TYPE === RequestDataType.Text) {
          router.post(path, koaBody({ text: true }), handler)
        } else if (instance[name].DATA_TYPE === RequestDataType.FormData) {
          router.post(
            path,
            koaBody({
              multipart: true,
              formidable: {
                maxFileSize: 500 * 1024 * 1024 // 设置上传文件大小最大限制，默认5M
              }
            }),
            handler
          )
        } else {
          router.post(path, handler)
        }
      } else if (instance[name].METHOD === RequestMethod.Get) {
        router.get(path, handler)
      } else if (instance[name].METHOD === RequestMethod.View) {
        router.get(path, handler)
      }
    })
  }
}
