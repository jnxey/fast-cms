import { isBoolean, isObject, isString } from '@/framework/tools'
import { ParamsType } from '@/framework/values'
import { FieldConfigBean } from '@/framework/types'

/// 参数模型
export class ParamsModel {
  /// 字段配置
  private fields: FieldConfigBean = {}

  /// 初始化字段配置
  public init(fields: FieldConfigBean) {
    this.fields = fields
  }

  public fill<T>(map: object) {
    let result = new ParamsModelFillResult(true, '无校验')
    if (!isObject(this.fields)) return result
    Object.keys(this.fields).forEach((name) => {
      const typeError = this.fields[name].typeError || ''
      const emptyError = this.fields[name].emptyError || ''
      const hasNull = map[name] === undefined || map[name] === '' || map[name] === null
      if (this.fields[name].required && hasNull) {
        result = new ParamsModelFillResult(false, emptyError)
      }
      if (!hasNull && this.fields[name].type === ParamsType.Number && isNaN(Number(map[name]))) {
        result = new ParamsModelFillResult(false, typeError)
      }
      if (!hasNull && this.fields[name].type === ParamsType.Boolean && !isBoolean(map[name])) {
        result = new ParamsModelFillResult(false, typeError)
      }
      if (!hasNull && this.fields[name].type === ParamsType.String && !isString(map[name])) {
        result = new ParamsModelFillResult(false, typeError)
      }
      if (!hasNull && this.fields[name].type instanceof ParamsModel) {
        // @ts-ignore
        const model = new this.fields[name]()
        const _result: ParamsModelFillResult = model.fill(map[name])
        if (!_result) result = _result
      }
    })
    return result
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
