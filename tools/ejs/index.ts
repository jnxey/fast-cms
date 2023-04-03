import Application from 'koa'
import render from '@koa/ejs'
import path from 'path'
const root = path.resolve('.')

export class Ejs {
  /// 初始化模版渲染
  static ejsRender(app: Application) {
    render(app, {
      root: path.resolve(root, 'views'),
      layout: 'layout/main',
      viewExt: 'ejs',
      cache: false,
      debug: false
    })
  }
}
