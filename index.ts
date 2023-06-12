import { Controller } from '@/framework/controller'
import { AdminUser } from '@/controller/admin/user'

const pathAssets = './assets'

const { init, app, connect, router, assets } = Controller

init({})

connect(new AdminUser())

app.use(router.routes())
app.use(assets(pathAssets))
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
