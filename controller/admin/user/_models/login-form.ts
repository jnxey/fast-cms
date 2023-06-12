import { ParamsType } from '@/framework/values'
import { ParamsValue } from '@/framework/types'
import { ParamsModel } from '@/framework/params'

export class ParamsLogin extends ParamsModel {
  @ParamsModel.Declare()
  @ParamsModel.Required('名称不能为空')
  @ParamsModel.TypeCheck(ParamsType.String, '名称只能是字符串类型')
  @ParamsModel.Description('用户名称')
  public name: ParamsValue

  @ParamsModel.Declare()
  @ParamsModel.Required('密码不能为空')
  @ParamsModel.TypeCheck(ParamsType.String, '密码只能是字符串类型')
  @ParamsModel.Description('用户密码')
  public password: ParamsValue

  @ParamsModel.Declare()
  @ParamsModel.Required('权限不能为空')
  @ParamsModel.TypeArray(ParamsType.String, '权限类型只能是[字符串]')
  @ParamsModel.Description('用户权限')
  public auths: ParamsValue
}

export class ResultLogin extends ParamsModel {
  @ParamsModel.Declare()
  public name: ParamsValue

  @ParamsModel.Declare()
  public sex: ParamsValue
}
