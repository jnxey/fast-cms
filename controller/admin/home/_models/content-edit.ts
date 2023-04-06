import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsContentEdit extends ParamsModel {
  @Declare()
  @Required('文档ID不能为空')
  @TypeError(ParamsType.Number, '菜单ID必须为数字')
  @Description('菜单ID')
  public id?: number

  @Declare()
  @TypeError(ParamsType.String, '文档关键词必须为字符串')
  @Description('文档关键词')
  public doc_keyword?: string

  @Declare()
  @TypeError(ParamsType.String, '文档内容必须为字符串')
  @Description('文档内容')
  public doc_content?: string
}
