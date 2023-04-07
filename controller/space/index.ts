import { Controller } from '@/tools/controller'
import { ExtendableContext, Next } from 'koa'
import { Summary, View } from '@/tools/method'

export class Space extends Controller.Api {
  @View()
  @Summary('首页')
  public async $index(ctx: ExtendableContext, next: Next) {}
}
