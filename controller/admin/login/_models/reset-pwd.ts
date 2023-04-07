import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsResetPwd extends ParamsModel {
  @Declare()
  @Required('管理员密码不能为空')
  @TypeError(ParamsType.String, '管理员密码不能为空必须是字符串类型')
  @Description('管理员密码不能为空')
  public admin_pwd?: string
}
