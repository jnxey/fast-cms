export const SystemValues = {
  /// md5盐值
  salt: 'fc-salt',
  /// 无权限状态码
  noAuth: 401,
  /// 返回状态信息
  responseMap: {
    // 成功
    success: { code: '1000', msg: '成功' },
    // 参数错误
    error_params: { code: '1001', msg: '参数错误' },
    // 账号或密码错误
    error_password: { code: '1002', msg: '账号或密码错误' },
    // 鉴权失败
    error_access: { code: '1004', msg: '您无权限访问此资源' }
  },
  /// 菜单根节点信息
  menuRoot: 0,
  /// 菜单类型信息
  menuType: { menu: 1, page: 2 },
  /// 文档类型，1-富文本，2-Markdown，3-Iframe，4-资源
  docTypeMap: { rich: 1, markdown: 2, website: 3, assets: 4 },
  /// 文档对应信息
  docTypeInfo: { 1: '富文本', 2: 'Markdown', 3: '外部网站', 4: '静态资源' }
}
