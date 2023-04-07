import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import { Controller } from '@/tools/controller'
import { Headers } from '@/tools/headers'
import { ErrorKoa } from '@/tools/error'
import { Ejs } from '@/tools/ejs'
import { Jwt } from '@/tools/jwt'
import { AdminLogin } from '@/controller/admin/login'
import { AdminHome } from '@/controller/admin/home'
import { Home } from '@/controller/home'
import { Space } from '@/controller/space'

const pathHome = '/home/index'
const pathAssets = './assets'

const app: Koa = new Koa()
const router: Router = new Router()

router.get('/', (ctx) => {
  ctx.redirect(pathHome)
})
Controller.connect<AdminLogin>(new AdminLogin(), router)
Controller.connect<AdminHome>(new AdminHome(), router)
Controller.connect<Home>(new Home(), router)
Controller.connect<Space>(new Space(), router)

app.use(serve(pathAssets))
Ejs.ejsRender(app)
app.use(ErrorKoa.onerror)
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
