import Koa, { type ExtendableContext, type Next } from 'koa'
import Router from '@koa/router'
import Boom from '@hapi/boom'
import { AdminUser } from '@/controller/admin/user'

const app: Koa = new Koa()
const router: Router = new Router()

router.get('/params', (ctx: ExtendableContext, next: Next) => {
  ctx.body = 'hello word'
  const a: AdminUser = new AdminUser()
  a.bark()
  a.write()
})

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
