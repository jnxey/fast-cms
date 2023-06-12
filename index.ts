import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import { Controller } from '@/framework/controller'
import { AdminUser } from '@/controller/admin/user'

const pathAssets = './assets'

const app: Koa = new Koa()
const router: Router = new Router()

Controller.connect(new AdminUser(), router)

app.use(serve(pathAssets))
app.use(router.routes())
app.use(router.allowedMethods())

/// 错误监听
app.context.onerror = (err: Error) => {
  /// ToDo: 收集错误信息
  if (err) {
    console.log(err)
    console.log(err.stack?.toString(), 'err-----------2')
  }
}

app.listen(4000)
