import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import { connectController } from '@/controller/_tools/connect'
import { setAllowOrigin } from '@/tools/origin'
import { Ejs } from '@/tools/ejs'
import { Jwt } from '@/tools/jwt'
import { AdminLogin } from '@/controller/admin/login'
import { AdminHome } from '@/controller/admin/home'

const app: Koa = new Koa()
const router: Router = new Router()

connectController<AdminLogin>(new AdminLogin(), router)
connectController<AdminHome>(new AdminHome(), router)

Ejs.ejsRender(app)
app.use(Jwt.intercept)
app.use(setAllowOrigin)
app.use(serve('./assets'))
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
