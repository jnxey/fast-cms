import { Method, DataType, ParamsSource } from '@/framework/values'
import { ExtendableContext, Next } from 'koa'
import Response from '@/framework/response'
import { ParamsModel, ParamsModelFillResult } from '@/framework/request/_tools'
import { ControllerExtra } from '@/framework/controller'

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

  /// 参数检查装饰器
  public static Params<T extends ParamsModel>(Model: { new (): T }, type: ParamsSource): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const func: Function = descriptor.value
      const query = new Model()
      descriptor.value = function (): any {
        const args = arguments
        const ctx: ExtendableContext = args[0]
        const next: Next = args[1]
        const options: ControllerExtra = args[3]
        const current: object = type === ParamsSource.Body ? ctx.request.body : ctx.query
        const result: ParamsModelFillResult = query.fill(current)
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

  /// 参数模型
  public static ParamsModel = ParamsModel
}
