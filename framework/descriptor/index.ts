/// 描述装饰器
export function Descriptor(text: string): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.DESCRIPTOR_TEXT = text
  }
}
