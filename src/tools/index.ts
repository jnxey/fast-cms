/// 驼峰命名=>中横线命名
function _kebabCase(str: string): string {
  const hyphenateRE: RegExp = /([^-])([A-Z])/g
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase()
}

/// 驼峰命名<=中横线命名
function _camelCase(name: string): string {
  const SPECIAL_CHARS_REGEXP: RegExp = /([\:\-\_]+(.))/g
  const MOZ_HACK_REGEXP: RegExp = /^moz([A-Z])/
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/// 驼峰命名=>中横线命名
export const kebabCase = _kebabCase
/// 驼峰命名<=中横线命名
export const camelCase = _camelCase

/// 判断数据类型
export const getType = (obj: any): string =>
  Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
export const isNumber = (obj: any) => getType(obj) === 'number'
export const isString = (obj: any) => getType(obj) === 'string'
export const isArray = (obj: any) => getType(obj) === 'array'
export const isObject = (obj: any) => getType(obj) === 'object'
export const isBoolean = (obj: any) => getType(obj) === 'boolean'
export const isFunction = (obj: any) => getType(obj).toLowerCase().indexOf('function') > -1
export const isNull = (obj: any) => getType(obj) === 'null'
export const isUndefined = (obj: any) => getType(obj) === 'undefined'
export const isPromise = (obj: any) => getType(obj) === 'promise'
export const isNode = (node: any) =>
  !isNull(node) && !isUndefined(node) && Boolean(node.nodeName) && Boolean(node.nodeType)
export const isElement = (element: any) => isNode(element) && element.nodeType === 1
