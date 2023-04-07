import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsContentHome extends ParamsModel {
  @Declare()
  @Required('文档ID不能为空')
  @TypeError(ParamsType.Number, '文档ID必须为数字')
  @Description('文档ID')
  public id?: number
}

export class ResultContentHome extends ParamsModel {
  @Declare()
  @Required('文档ID不能为空')
  @TypeError(ParamsType.Number, '菜单ID必须为数字')
  @Description('菜单ID')
  public id?: number
}
