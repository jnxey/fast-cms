import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import { Controller } from '@/tools/controller'
import { Headers } from '@/tools/headers'
import { Ejs } from '@/tools/ejs'
import { Jwt } from '@/tools/jwt'
import { AdminLogin } from '@/controller/admin/login'
import { AdminHome } from '@/controller/admin/home'

const app: Koa = new Koa()
const router: Router = new Router()

Controller.connect<AdminLogin>(new AdminLogin(), router)
Controller.connect<AdminHome>(new AdminHome(), router)

app.use(serve('./assets'))
Ejs.ejsRender(app)
app.use(Jwt.error)
app.use(Jwt.intercept())
app.use(Headers.setAllowOrigin)
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
