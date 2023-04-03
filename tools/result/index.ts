import { ParamsModel } from '@/tools/params'

/// 返回参数检查装饰器
export function Result<T extends ParamsModel>(params: { new (): T }): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.RESULT_MODE = params
  }
}
