/// Request方法
export enum Method {
  Get = 'Get',
  Post = 'Post'
}

/// Request数据类型
export enum DataType {
  Json = 'Json',
  Text = 'Text',
  FormData = 'FormData'
}

/// Request参数来源
export enum ParamsSource {
  Query = 'Query',
  Body = 'Body'
}

/// 参数数据类型
export enum ParamsType {
  Number = 'Number',
  Boolean = 'Boolean',
  String = 'String',
  Array = 'Array'
}

/// 缓存参数配置的键
export const ParamsConfigCache: string = 'FW_PARAMS_CONFIG_CACHE'
