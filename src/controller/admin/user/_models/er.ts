import {
  TypeError,
  Required,
  ParamsModel,
  ParamsType,
  Description,
  Declare
} from '@/controller/_tools/params'

class ERAddr extends ParamsModel {
  @Declare()
  @Required('名字不能为空')
  @TypeError(ParamsType.String, '名字必须是字符串类型')
  @Description('地址名字')
  public name?: string

  @Declare()
  public detailAddr?: string
}

export class ParamsER extends ParamsModel {
  @Declare()
  @Required('表单数据不能为空')
  @TypeError(ERAddr, '页数大小必须为数值类型')
  @Description('表单数据')
  public form?: ERAddr
}
