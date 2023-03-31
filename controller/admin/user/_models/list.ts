import {
  TypeError,
  Required,
  ParamsModel,
  ParamsType,
  Description,
  Declare
} from '@/controller/_tools/params'

export class ParamsList extends ParamsModel {
  @Declare()
  @Required('页数大小不能为空')
  @TypeError(ParamsType.Number, '页数大小必须为数值类型')
  @Description('页数大小')
  public pageSize?: number

  @Declare()
  public pageNo?: number
}
