/// 请求数据的方法
export enum RequestMethod {
  Get,
  Post
}

/// 请求数据的数据类型
export enum RequestDataType {
  Json,
  Text
}

/// get方法
export function Get(): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.METHOD = RequestMethod.Get
  }
}

/// post方法
export function Post(): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.METHOD = RequestMethod.Post
  }
}

/// post方法，获取的body的数据结构为json
export function Json(): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.DATA_TYPE = RequestDataType.Json
  }
}

/// post方法，获取的body的数据结构为文本
export function Text(): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.DATA_TYPE = RequestDataType.Text
  }
}
