/// 控制器额外参数
export interface ControllerExtra {
  /// Jwt参数
  jwtData?: object
  /// 请求参数
  query?: object
  /// 路由参数
  params?: object
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
