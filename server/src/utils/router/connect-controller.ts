import Router from '@koa/router'
import { ExtendableContext, Next } from 'koa'
import { ControllerApi } from '@/controller/_module/api'
import { kebabCase } from '@/utils'

/// 连接controller到router
export function connectController<T extends ControllerApi>(instance: T, router: Router) {
  const moduleName: string = instance.constructor.name
  const apis: string[] = Object.getOwnPropertyNames(instance.constructor.prototype)
  apis.forEach((name) => {
    if (name === 'constructor') return
    const path: string = '/' + kebabCase(moduleName) + '/' + kebabCase(name)
    router.get(path, (ctx: ExtendableContext, next: Next) => {
      instance[name](ctx, next)
    })
  })
}
