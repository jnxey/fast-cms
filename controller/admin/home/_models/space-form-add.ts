import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsSpaceFormAdd extends ParamsModel {
  @Declare()
  @Required('文档空间名称不能为空')
  @TypeError(ParamsType.String, '文档空间名称必须为字符串')
  @Description('文档空间名称')
  public space_name?: string

  @Declare()
  @Required('文档空间标识不能为空')
  @TypeError(ParamsType.String, '文档空间标识必须为字符串')
  @Description('文档空间标识')
  public space_mark?: string

  @Declare()
  @Required('文档空间排序不能为空')
  @TypeError(ParamsType.Number, '文档空间排序必须是数字类型')
  @Description('文档空间排序')
  public sort?: number
}

export class ParamsSpaceFormAddResult extends ParamsModel {
  @Declare()
  @Required('文档空间ID不能为空')
  @TypeError(ParamsType.Number, '文档空间ID必须为数字类型')
  @Description('文档空间ID')
  public id?: number

  @Declare()
  @Required('文档空间名称不能为空')
  @TypeError(ParamsType.String, '文档空间名称必须为字符串')
  @Description('文档空间名称')
  public space_name?: string

  @Declare()
  @Required('文档空间标识不能为空')
  @TypeError(ParamsType.String, '文档空间标识必须为字符串')
  @Description('文档空间标识')
  public space_mark?: string

  @Declare()
  @Required('文档空间排序不能为空')
  @TypeError(ParamsType.Number, '文档空间排序必须是数字类型')
  @Description('文档空间排序')
  public sort?: number
}
