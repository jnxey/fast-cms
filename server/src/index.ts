import Koa from 'koa'
import Router from '@koa/router'
import Boom from '@hapi/boom'
import { AdminUser } from '@/controller/admin/user'
import { connectController } from '@/utils/router/connect-controller'

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
app.context.onerror = (err: Error) => {}

app.listen(3000)
