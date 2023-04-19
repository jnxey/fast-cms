import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsMemberDelete extends ParamsModel {
  @Declare()
  @Required('账户ID不能为空')
  @TypeError(ParamsType.Number, '账户ID必须为数字')
  @Description('账户ID')
  public id?: number
}
