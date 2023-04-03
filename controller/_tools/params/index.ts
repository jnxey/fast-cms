import { ExtendableContext, Next } from 'koa'
import { isBoolean, isString } from '@/tools'
import { Dto, ResponseCode } from '@/controller/_tools/dto'

declare module 'Koa' {
  interface ExtendableContext {
    params?: any
  }
}

/// 缓存参数配置的键
const ParamsConfigCache: string = 'PARAMS_CONFIG_CACHE'

/// 参数来源
export enum ParamsSource {
  Query,
  Body
}

/// 参数数据类型
export enum ParamsType {
  Number,
  Boolean,
  String
}

/// 添加参数声明
export function Declare(): Function {
  return function (target: any, propertyKey: string) {
    _checkParamsConfigExist(target, propertyKey)
  }
}

/// 参数检查装饰器
export function Params<T extends ParamsModel>(params: { new (): T }, type: ParamsSource): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const func: Function = descriptor.value
    const _params = new params()
    descriptor.value = function (): any {
      const args = arguments
      const ctx: ExtendableContext = args[0]
      const next: Next = args[1]
      const current: object = type === ParamsSource.Body ? ctx.request.body : ctx.query
      const result: ParamsModelFillResult = _params.fill(current)
      if (result.valid) {
        ctx.params = _params
        return func.apply(this, args)
      } else {
        ctx.body = Dto({ ...ResponseCode.error_params, msg: result.message })
        return next()
      }
    }
  }
}

/// 添加参数提示语
export function Required(message?: string): Function {
  return function (target: any, propertyKey: string) {
    _checkParamsConfigExist(target, propertyKey)
    target.constructor[ParamsConfigCache][propertyKey].required = true
    target.constructor[ParamsConfigCache][propertyKey].requiredMessage =
      message || propertyKey + ' cannot be null'
  }
}

/// 添加类型错误提示语
export function TypeError(type: ParamsType | Function, message?: string): Function {
  return function (target: any, propertyKey: string) {
    _checkParamsConfigExist(target, propertyKey)
    target.constructor[ParamsConfigCache][propertyKey].type = type
    target.constructor[ParamsConfigCache][propertyKey].typeErrorMessage = message
    message || propertyKey + '`s data type is error'
  }
}

/// 添加描述提示语
export function Description(text?: string): Function {
  return function (target: any, propertyKey: string) {
    _checkParamsConfigExist(target, propertyKey)
    target.constructor[ParamsConfigCache][propertyKey].description = text
  }
}

/// 参数模型
export class ParamsModel {
  public fill<T>(map: object) {
    const paramsConfig = this.constructor[ParamsConfigCache]
    if (!paramsConfig) return new ParamsModelFillResult(true, '无校验')
    for (let name in paramsConfig) {
      if (paramsConfig.hasOwnProperty(name)) {
        if (
          paramsConfig[name].required &&
          (map[name] === undefined || map[name] === '' || map[name] === null)
        ) {
          return new ParamsModelFillResult(false, paramsConfig[name].requiredMessage)
        }
        if (paramsConfig[name].type === ParamsType.Number && isNaN(Number(map[name]))) {
          return new ParamsModelFillResult(false, paramsConfig[name].typeErrorMessage)
        }
        if (paramsConfig[name].type === ParamsType.Boolean && !isBoolean(map[name])) {
          return new ParamsModelFillResult(false, paramsConfig[name].typeErrorMessage)
        }
        if (paramsConfig[name].type === ParamsType.String && !isString(map[name])) {
          return new ParamsModelFillResult(false, paramsConfig[name].typeErrorMessage)
        }
        if (paramsConfig[name].type instanceof ParamsModel) {
          const model = new paramsConfig[name]()
          const result: ParamsModelFillResult = model.fill(map[name])
          if (!result) return result
        }
        this[name] = map[name]
      }
    }
    return new ParamsModelFillResult(true, '验证通过')
  }
}

/// 返回结果
export class ParamsModelFillResult {
  public valid: boolean = false
  public message: string = ''
  constructor(valid: boolean, message: string) {
    this.valid = valid
    this.message = message
  }
}

/// 检查参数配置是否存在
function _checkParamsConfigExist(target: any, propertyKey: string) {
  if (!target.constructor[ParamsConfigCache]) target.constructor[ParamsConfigCache] = {}
  if (!target.constructor[ParamsConfigCache][propertyKey])
    target.constructor[ParamsConfigCache][propertyKey] = {}
}
