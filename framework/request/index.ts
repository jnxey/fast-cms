import { Method, DataType, ParamsSource, ParamsType, ParamsConfigCache } from '@/framework/values'
import { ExtendableContext, Next } from 'koa'
import Response from '@/framework/response'
import { ControllerExtra } from '@/framework/controller'
import { isBoolean, isObject, isString } from '@/framework/tools'

/// 请求类，用于定义请求方法类型/装饰器，数据类型/装饰器
export default class Request {
  /// Request使用Get
  public static Get(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.REQUEST_METHOD = Method.Get
    }
  }

  /// Request使用Post
  public static Post(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.REQUEST_METHOD = Method.Post
    }
  }

  /// Request使用Page
  public static Page(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.REQUEST_METHOD = Method.Page
    }
  }

  /// 获取的body的数据结构为json
  public static Json(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.REQUEST_DATA_TYPE = DataType.Json
    }
  }

  /// 获取的body的数据结构为文本
  public static Text(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.REQUEST_DATA_TYPE = DataType.Text
    }
  }

  /// 获取的body的数据结构为文本
  public static FormData(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.REQUEST_DATA_TYPE = DataType.Text
    }
  }

  /// 描述
  public static Descriptor(text: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.REQUEST_DESCRIPTOR = text
    }
  }

  /// 参数检查装饰器
  public static Params<T extends RequestParams>(
    Model: { new (): T },
    type: ParamsSource
  ): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const func: Function = descriptor.value
      const query = new Model()
      descriptor.value = function (): any {
        const args = arguments
        const ctx: ExtendableContext = args[0]
        const next: Next = args[1]
        const options: ControllerExtra = args[2]
        const current: object = type === ParamsSource.Body ? ctx.request.body : ctx.query
        const result: RequestParamsResult = query.fill(current || {})
        if (result.valid) {
          options.setQuery(query)
          return func.apply(this, args)
        } else {
          ctx.body = Response.Dto({ ...Response.code.error_params, msg: result.message })
          return next()
        }
      }
    }
  }
}

/// 参数模型
export class RequestParams {
  /// 添加参数声明
  public static Declare(): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
    }
  }

  /// 添加参数提示语
  public static Required(message?: string): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
      target.constructor[ParamsConfigCache][propertyKey].required = true
      target.constructor[ParamsConfigCache][propertyKey].requiredMessage =
        message || propertyKey + ' cannot be null'
    }
  }

  /// 添加类型错误提示语
  public static TypeError(type: ParamsType | RequestParams, message?: string): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
      target.constructor[ParamsConfigCache][propertyKey].type = type
      target.constructor[ParamsConfigCache][propertyKey].typeErrorMessage = message
      message || propertyKey + '`s data type is error'
    }
  }

  /// 添加描述提示语
  public static Description(text?: string): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
      target.constructor[ParamsConfigCache][propertyKey].description = text
    }
  }

  public fill<T>(map: object) {
    const config = this.constructor[ParamsConfigCache]
    if (!config) return new RequestParamsResult(true, 'success')
    for (let name in config) {
      if (config.hasOwnProperty(name)) {
        const hasNull = map[name] === undefined || map[name] === '' || map[name] === null
        if (config[name].required && hasNull) {
          return new RequestParamsResult(false, config[name].requiredMessage)
        }
        if (!hasNull && config[name].type === ParamsType.Number && isNaN(Number(map[name]))) {
          return new RequestParamsResult(false, config[name].typeErrorMessage)
        }
        if (!hasNull && config[name].type === ParamsType.Boolean && !isBoolean(map[name])) {
          return new RequestParamsResult(false, config[name].typeErrorMessage)
        }
        if (!hasNull && config[name].type === ParamsType.String && !isString(map[name])) {
          return new RequestParamsResult(false, config[name].typeErrorMessage)
        }
        if (!hasNull && config[name].type instanceof RequestParams) {
          const model = new config[name]()
          const result: RequestParamsResult = model.fill(map[name])
          if (!result) return result
        }
        this[name] = map[name]
      }
    }
    return new RequestParamsResult(true, 'success')
  }
}

/// 返回结果
class RequestParamsResult {
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
