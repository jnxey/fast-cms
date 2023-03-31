import { ControllerApi } from '@/controller/_tools/api'
import { ExtendableContext, Next } from 'koa'
import { Params, ParamsSource } from '@/controller/_tools/params'
import { ParamsList } from '@/controller/admin/user/_models/list'
import { Get, Json, Post } from '@/controller/_tools/method'
import { ParamsER } from '@/controller/admin/user/_models/er'
import { setAllowOrigin } from '@/tools/origin'

export class AdminUser extends ControllerApi {
  tips: string = '测试参数'

  @Get()
  @Params<ParamsList>(new ParamsList(), ParamsSource.Query)
  public list(ctx: ExtendableContext, next: Next) {
    console.log('--------------r1' + this.tips)
    setAllowOrigin(ctx)
    ctx.body = '{"result":1,"data":"成功了"}'
    return next()
  }

  @Post()
  @Json()
  @Params<ParamsER>(new ParamsER(), ParamsSource.Body)
  public er(ctx: ExtendableContext, next: Next) {
    console.log('--------------r2')
    ctx.body = 'hello word2'
    return next()
  }
}
