import Router from '@koa/router'
import { koaBody } from 'koa-body'
import { ExtendableContext, Next } from 'koa'
import { ControllerApi } from '@/controller/_tools/api'
import { kebabCase } from '@/tools'
import { RequestDataType, RequestMethod } from '@/controller/_tools/method'

/// 连接controller到router
export function connectController<T extends ControllerApi>(instance: T, router: Router) {
  const moduleName: string = instance.constructor.name
  const apis: string[] = Object.getOwnPropertyNames(instance.constructor.prototype)
  apis.forEach((name) => {
    if (name === 'constructor') return
    const resetful = '/api'
    const path: string = '/' + kebabCase(moduleName) + '/' + kebabCase(name)
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
        router.post(resetful + path, koaBody({ json: true }), handler)
      } else if (instance[name].DATA_TYPE === RequestDataType.Text) {
        router.post(resetful + path, koaBody({ text: true }), handler)
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
