import { Declare, Description, ParamsModel, ParamsType, Required, TypeError } from '@/tools/params'

export class ParamsMenuAdd extends ParamsModel {
  @Declare()
  @TypeError(ParamsType.Number, '菜单ID必须为数字类型')
  @Description('菜单ID')
  public id?: number

  @Declare()
  @Required('菜单名称不能为空')
  @TypeError(ParamsType.String, '菜单名称必须为字符串')
  @Description('菜单名称')
  public menu_name?: string

  @Declare()
  @Required('菜单标识不能为空')
  @TypeError(ParamsType.String, '菜单标识必须为字符串')
  @Description('菜单标识')
  public menu_mark?: string

  @Declare()
  @Required('菜单类型不能为空')
  @TypeError(ParamsType.Number, '菜单类型必须为数字类型')
  @Description('菜单类型，1-菜单，2-页面')
  public menu_type?: number

  @Declare()
  @Required('父级菜单不能为空')
  @TypeError(ParamsType.Number, '父级菜单必须为数字类型')
  @Description('父级菜单')
  public parent_id?: number

  @Declare()
  @Required('文档内容不能为空')
  @TypeError(ParamsType.Number, '文档内容必须为数字类型')
  @Description('文档内容')
  public content_id?: number

  @Declare()
  @Required('菜单排序不能为空')
  @TypeError(ParamsType.Number, '菜单排序必须是数字类型')
  @Description('菜单排序')
  public sort?: number
}

export class ResultMenuAdd extends ParamsModel {
  @Declare()
  @Required('菜单ID不能为空')
  @TypeError(ParamsType.Number, '菜单ID必须为数字类型')
  @Description('菜单ID')
  public id?: number

  @Declare()
  @Required('菜单名称不能为空')
  @TypeError(ParamsType.String, '菜单名称必须为字符串')
  @Description('菜单名称')
  public menu_name?: string

  @Declare()
  @Required('菜单标识不能为空')
  @TypeError(ParamsType.String, '菜单标识必须为字符串')
  @Description('菜单标识')
  public menu_mark?: string

  @Declare()
  @Required('菜单类型不能为空')
  @TypeError(ParamsType.Number, '菜单类型必须为数字类型')
  @Description('菜单类型，1-菜单，2-页面')
  public menu_type?: number

  @Declare()
  @Required('父级菜单不能为空')
  @TypeError(ParamsType.Number, '父级菜单必须为数字类型')
  @Description('父级菜单')
  public parent_id?: number

  @Declare()
  @Required('文档内容不能为空')
  @TypeError(ParamsType.Number, '文档内容必须为数字类型')
  @Description('文档内容')
  public content_id?: number

  @Declare()
  @Required('菜单排序不能为空')
  @TypeError(ParamsType.Number, '菜单排序必须是数字类型')
  @Description('菜单排序')
  public sort?: number
}
