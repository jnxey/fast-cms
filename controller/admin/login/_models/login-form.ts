import {
  TypeError,
  Required,
  ParamsModel,
  ParamsType,
  Description,
  Declare
} from '@/controller/_tools/params'

export class ParamsLoginForm extends ParamsModel {
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
