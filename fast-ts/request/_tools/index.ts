import { isBoolean, isString } from '../../tools'
import { ParamsType, ParamsConfigCache } from '../_values'

/// 参数模型
export class ParamsModel {
  public fill<T>(map: object) {
    const paramsConfig = this.constructor[ParamsConfigCache]
    if (!paramsConfig) return new ParamsModelFillResult(true, '无校验')
    for (let name in paramsConfig) {
      if (paramsConfig.hasOwnProperty(name)) {
        const hasNull = map[name] === undefined || map[name] === '' || map[name] === null
        if (paramsConfig[name].required && hasNull) {
          return new ParamsModelFillResult(false, paramsConfig[name].requiredMessage)
        }
        if (!hasNull && paramsConfig[name].type === ParamsType.Number && isNaN(Number(map[name]))) {
          return new ParamsModelFillResult(false, paramsConfig[name].typeErrorMessage)
        }
        if (!hasNull && paramsConfig[name].type === ParamsType.Boolean && !isBoolean(map[name])) {
          return new ParamsModelFillResult(false, paramsConfig[name].typeErrorMessage)
        }
        if (!hasNull && paramsConfig[name].type === ParamsType.String && !isString(map[name])) {
          return new ParamsModelFillResult(false, paramsConfig[name].typeErrorMessage)
        }
        if (!hasNull && paramsConfig[name].type instanceof ParamsModel) {
          const model = new paramsConfig[name]()
          const result: ParamsModelFillResult = model.fill(map[name])
          if (!result) return result
        }
        this[name] = map[name]
      }
    }
    return new ParamsModelFillResult(true, '验证通过')
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
