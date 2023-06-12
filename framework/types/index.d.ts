import { ParamsType } from '@/framework/values'

/// 参数类型
export type ParamsValue = ParamsType | undefined

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
