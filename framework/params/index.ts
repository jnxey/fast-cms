import { ParamsConfigCache, ParamsType } from '@/framework/values'
import { isArray, isBoolean, isFunction, isString } from '@/framework/tools'

/// 参数模型
export class ParamsModel {
  /// 添加参数声明
  public static Declare(): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
    }
  }

  /// 添加参数提示语
  public static Required(message?: string): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
      target.constructor[ParamsConfigCache][propertyKey].required = true
      target.constructor[ParamsConfigCache][propertyKey].requiredMessage =
        message || propertyKey + ' cannot be null'
    }
  }

  /// 添加类型错误提示语
  public static TypeCheck(type: ParamsType | ParamsModel, message?: string): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
      target.constructor[ParamsConfigCache][propertyKey].type = type
      target.constructor[ParamsConfigCache][propertyKey].typeMessage = message
      message || propertyKey + '`s data type is error'
    }
  }

  /// 添加类型错误提示语-数组，默认不能为空
  public static TypeArray(childType: ParamsType | ParamsModel, message?: string): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
      target.constructor[ParamsConfigCache][propertyKey].type = ParamsType.Array
      target.constructor[ParamsConfigCache][propertyKey].childType = childType
      target.constructor[ParamsConfigCache][propertyKey].typeMessage = message
      message || propertyKey + '`s data type is error'
    }
  }

  /// 添加描述提示语
  public static Description(text?: string): Function {
    return function (target: any, propertyKey: string) {
      _checkParamsConfigExist(target, propertyKey)
      target.constructor[ParamsConfigCache][propertyKey].description = text
    }
  }

  public fill<T>(map: object) {
    const config = this.constructor[ParamsConfigCache]
    if (!config) return new ParamsModelResult(true, 'success')
    for (let name in config) {
      if (config.hasOwnProperty(name)) {
        const value = map[name]
        const hasNull = value === undefined || value === '' || value === null
        if (config[name].required && hasNull) {
          return new ParamsModelResult(false, config[name].requiredMessage)
        }
        if (!hasNull) {
          const _result = _checkParamsResult(config[name], value, config[name].typeMessage)
          if (!_result.valid) return _result
        }
        this[name] = value
      }
    }
    return new ParamsModelResult(true, 'success')
  }
}

/// 返回结果
export class ParamsModelResult {
  public valid: boolean = false
  public message: string = ''
  constructor(valid: boolean, message: string) {
    this.valid = valid
    this.message = message
  }
}

/// 检查参数配置是否存在
function _checkParamsConfigExist(target: any, propertyKey: string) {
  if (!target.constructor[ParamsConfigCache]) target.constructor[ParamsConfigCache] = {}
  if (!target.constructor[ParamsConfigCache][propertyKey])
    target.constructor[ParamsConfigCache][propertyKey] = {}
}

/// 检查参数方法
const _checkParamsFuncMap = {
  [ParamsType.Number]: function (value) {
    return !isNaN(Number(value))
  },
  [ParamsType.Boolean]: function (value) {
    return isBoolean(value)
  },
  [ParamsType.String]: function (value) {
    return isString(value)
  }
}

/// 检查参数并返回结果
function _checkParamsResult(config, value, message): ParamsModelResult {
  if (isFunction(_checkParamsFuncMap[config.type]) && !_checkParamsFuncMap[config.type](value)) {
    return new ParamsModelResult(false, message)
  } else if (config.type === ParamsType.Array) {
    if (!isArray(value)) return new ParamsModelResult(false, message)
    for (let i = 0; i < value.length; i++) {
      const _result = _checkParamsResult(config.childType, value[i], message)
      if (!_result.valid) return new ParamsModelResult(false, message)
    }
  } else if (config.type instanceof ParamsModel) {
    const model = new config.type()
    const _result: ParamsModelResult = model.fill(value)
    if (!_result.valid) return new ParamsModelResult(false, message)
  }
  return new ParamsModelResult(true, 'success')
}
