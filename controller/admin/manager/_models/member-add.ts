import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsMemberAdd extends ParamsModel {
  @Declare()
  @Required('账户名称不能为空')
  @TypeError(ParamsType.String, '账户名称必须为字符串')
  @Description('账户名称')
  public admin_name?: string

  @Declare()
  @Required('账户密码不能为空')
  @TypeError(ParamsType.String, '账户密码必须为字符串')
  @Description('账户密码')
  public admin_pwd?: string
}
