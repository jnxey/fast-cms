import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { Params, ParamsSource } from '@/controller/_tools/params'
import { ParamsList } from '@/controller/admin/user/_models/list'

export class AdminUser extends ControllerApi {
  tips: string = '测试参数'
  @Params<ParamsList>(new ParamsList(), ParamsSource.Query)
  public list(ctx: ExtendableContext, next: Next) {
    console.log('--------------r1' + this.tips)
    ctx.body = 'hello word'
    return next()
  }
  private er(ctx: ExtendableContext): void {
    console.log('--------------r2')
    throw Error('报错了')
  }
}
