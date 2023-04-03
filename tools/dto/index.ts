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
export interface DtoBean {
  code: string
  msg: string
  result: any
}

/// 返回码信息
export const ResponseCode: ResponseCodeBean = {
  // 成功
  success: { code: '1000', msg: '成功' },
  // 参数错误
  error_params: { code: '1001', msg: '参数错误' },
  // 账号或密码错误
  error_password: { code: '1002', msg: '账号或密码错误' },
  // 鉴权失败
  error_access: { code: '1004', msg: '您无权限访问此资源' }
}

/// Response返回码
export function Dto(response: ResponseCodeValue, value?: any): DtoBean {
  return { code: response.code, msg: response.msg, result: value }
}
