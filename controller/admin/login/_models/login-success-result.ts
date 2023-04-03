import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ResultLoginSuccess extends ParamsModel {
  @Declare()
  @Required('管理员名称不能为空')
  @TypeError(ParamsType.String, '管理员名称必须是字符串类型')
  @Description('管理员名称')
  public admin_name?: string
}
