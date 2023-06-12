import { RequestParams } from '@/framework/request'
import { ParamsType } from '@/framework/values'
import { ParamsValue } from '@/framework/types'

export class ParamsLogin extends RequestParams {
  @RequestParams.Declare()
  @RequestParams.Required('名称不能为空')
  @RequestParams.TypeCheck(ParamsType.String, '名称只能是字符串类型')
  @RequestParams.Description('用户名称')
  public name: ParamsValue

  @RequestParams.Declare()
  @RequestParams.Required('密码不能为空')
  @RequestParams.TypeCheck(ParamsType.String, '密码只能是字符串类型')
  @RequestParams.Description('用户密码')
  public password: ParamsValue

  @RequestParams.Declare()
  @RequestParams.Required('权限不能为空')
  @RequestParams.TypeArray(ParamsType.String, '权限类型只能是[字符串]')
  @RequestParams.Description('用户权限')
  public auths: ParamsValue
}

export class ResultLogin extends RequestParams {
  @RequestParams.Declare()
  public name: ParamsValue

  @RequestParams.Declare()
  public sex: ParamsValue
}
