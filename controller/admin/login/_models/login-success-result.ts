import {
  Declare,
  Description,
  ParamsModel,
  ParamsType,
  Required,
  TypeError
} from '@/controller/_tools/params'

export class ResultLoginSuccess extends ParamsModel {
  @Declare()
  @Required('管理员ID不能为空')
  @TypeError(ParamsType.Number, '管理员ID必须是数字类型')
  @Description('管理员ID')
  public id?: number

  @Declare()
  @Required('管理员名称不能为空')
  @TypeError(ParamsType.String, '管理员名称必须是字符串类型')
  @Description('管理员名称')
  public admin_name?: string

  @Declare()
  @Required('管理员Token不能为空')
  @TypeError(ParamsType.String, '管理员Token必须是字符串类型')
  @Description('管理员Token')
  public token?: string
}
