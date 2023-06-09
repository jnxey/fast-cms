import { ParamsType } from '@/framework/values'
import { ParamsModel } from '@/framework/request/_tools'

/// 字段表述
export interface FieldConfigValue {
  type: ParamsType | ParamsModel
  required?: boolean
  typeError?: string
  emptyError?: string
  validate?: Function
  descriptor?: string
}

/// 字段描述对象
export interface FieldConfigBean {
  [key: string]: FieldConfigValue
}

/// 返回码信息
export interface ResponseCodeValue {
  code: string
  msg: string
}

/// 返回码实体
export interface ResponseCodeBean {
  [key: string]: ResponseCodeValue
}

/// Response返回码
export interface ResponseDTO {
  code: string
  msg: string
  result: any
}
