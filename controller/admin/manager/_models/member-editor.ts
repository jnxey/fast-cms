import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsMemberEdit extends ParamsModel {
  @Declare()
  @Required('账户ID不能为空')
  @TypeError(ParamsType.Number, '账户ID必须为数字')
  @Description('账户ID')
  public id?: number

  @Declare()
  @Required('账户权限不能为空')
  @TypeError(ParamsType.String, '账户权限必须为字符串')
  @Description('账户权限')
  public admin_auth_ids?: string
}
