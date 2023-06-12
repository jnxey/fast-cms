import { ResponseCodeValue, ResponseCodeBean, ResponseDTO } from '../types'
import { ParamsModel } from '@/framework/params'

/// 返回类
export default class Response {
  /// Response返回数据传输对象
  public static Dto<T>(response: ResponseCodeValue, value?: T, msg?: string): ResponseDTO {
    return { code: response.code, msg: msg || response.msg, result: value }
  }

  /// 返回参数检查装饰器
  public static Result<T extends ParamsModel>(Model: { new (): T }): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.value.FW_RESPONSE_RESULT_MODEL = Model
    }
  }

  /// 返回码信息
  public static code: ResponseCodeBean = {
    // 成功
    success: { code: '1000', msg: '成功' },
    // 参数错误
    error_params: { code: '1001', msg: '参数错误' },
    // 账号或密码错误
    error_password: { code: '1002', msg: '账号或密码错误' },
    // 鉴权失败
    error_access: { code: '1004', msg: '您无权限访问此资源' },
    // 未找到资源
    error_notfound: { code: '1005', msg: '未找到您访问此资源' },
    // 服务端异常
    error_server: { code: '1006', msg: '服务端异常' }
  }
}
