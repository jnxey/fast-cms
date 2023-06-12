import { ParamsType } from '@/framework/values'
import { ExtendableContext, Next } from 'koa'

/// 参数类型
export type FrameworkContext = ExtendableContext

/// 参数类型
export type FrameworkNext = Next

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
