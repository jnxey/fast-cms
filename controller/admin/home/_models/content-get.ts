import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsContentGet extends ParamsModel {
  @Declare()
  @Required('文档ID不能为空')
  @TypeError(ParamsType.Number, '文档ID必须为数字')
  @Description('文档ID')
  public id?: number
}

export class ResultContentGet extends ParamsModel {
  @Declare()
  @Required('文档ID不能为空')
  @TypeError(ParamsType.Number, '菜单ID必须为数字')
  @Description('菜单ID')
  public id?: number

  @Declare()
  @Required('文档类型不能为空')
  @TypeError(ParamsType.Number, '文档类型必须为数字')
  @Description('文档类型')
  public doc_type?: number

  @Declare()
  @Description('文档关键词')
  public doc_keyword?: string

  @Declare()
  @Description('文档内容')
  public doc_content?: string
}
