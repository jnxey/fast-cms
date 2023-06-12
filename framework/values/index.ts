/// Request方法
export enum Method {
  Get,
  Post,
  Page
}

/// Request数据类型
export enum DataType {
  Json,
  Text,
  FormData
}

/// Request参数来源
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

/// 缓存参数配置的键
export const ParamsConfigCache: string = 'PARAMS_CONFIG_CACHE'