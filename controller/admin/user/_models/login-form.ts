import { RequestParams } from '@/framework/request'
import { ParamsType } from '@/framework/values'
import { ParamsValue } from '@/framework/types'

export class ParamsLogin extends RequestParams {
  @RequestParams.Declare()
  @RequestParams.Required('名称不能为空')
  @RequestParams.TypeError(ParamsType.String, '名称只能是字符串类型')
  @RequestParams.Description('用户名称')
  public name: ParamsValue

  @RequestParams.Declare()
  @RequestParams.Required('密码不能为空')
  @RequestParams.TypeError(ParamsType.String, '密码只能是字符串类型')
  @RequestParams.Description('用户密码')
  public password: ParamsValue
}

export class ResultLogin extends RequestParams {
  @RequestParams.Declare()
  public name: ParamsValue

  @RequestParams.Declare()
  public sex: ParamsValue
}
