import Koa from 'koa'
import Router from '@koa/router'
import { connectController } from '@/controller/_tools/connect'
import { AdminUser } from '@/controller/admin/user'

const app: Koa = new Koa()
const router: Router = new Router()

connectController<AdminUser>(new AdminUser(), router)

app.use(router.routes())
app.use(router.allowedMethods())

/// 错误监听
app.context.onerror = (err: Error) => {
  /// ToDo: 收集错误信息
  if (err) console.log('err-----------2')
}

app.listen(3000)
