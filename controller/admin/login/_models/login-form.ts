import { TypeError, Required, ParamsModel, ParamsType, Description, Declare } from '@/tools/params'

export class ParamsLogin extends ParamsModel {
  @Declare()
  @Required('登录名不能为空')
  @TypeError(ParamsType.String, '登录名必须为字符串')
  @Description('登录表单数据')
  public name?: string

  @Declare()
  @Required('密码不能为空')
  @TypeError(ParamsType.String, '密码必须为字符串')
  @Description('登录表单数据')
  public password?: string
}

export class ResultLogin extends ParamsModel {
  @Declare()
  @Required('管理员名称不能为空')
  @TypeError(ParamsType.String, '管理员名称必须是字符串类型')
  @Description('管理员名称')
  public admin_name?: string

  @Declare()
  @Required('管理员角色不能为空')
  @TypeError(ParamsType.Number, '管理员角色必须是数字类型')
  @Description('管理员角色')
  public admin_role?: number

  @Declare()
  @TypeError(ParamsType.String, '管理员权限必须是字符串类型')
  @Description('管理员权限')
  public admin_auth_ids?: string
}
