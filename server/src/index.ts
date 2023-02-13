import Koa from 'koa'
import Router from '@koa/router'
import Boom from '@hapi/boom'
import { AdminUser } from '@/controller/admin/user'
import { connectController } from '@/tools/router/connect-controller'

const app: Koa = new Koa()
const router: Router = new Router()

connectController<AdminUser>(new AdminUser(), router)

app.use(router.routes())
app.use(
  router.allowedMethods({
    throw: true,
    notImplemented: () => Boom.notImplemented(),
    methodNotAllowed: () => Boom.methodNotAllowed()
  })
)

/// 错误监听
app.context.onerror = (err: Error) => {
  /// ToDo: 收集错误信息
  if (err) console.log('err-----------2')
}

app.listen(3000)
