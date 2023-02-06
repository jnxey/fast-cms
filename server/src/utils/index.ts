/**
 * 判断数据类型
 */
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
