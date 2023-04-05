/// 查询用户
export const SelectAdminUser = 'SELECT * FROM admin_user WHERE admin_name = {name}'

/// 查询文档空间列表
export const SelectSpaceList = 'SELECT * FROM doc_space'

/// 查询文档空间列表
export const SelectSpaceCount = 'SELECT * FROM doc_space WHERE space_mark = {space_mark} LIMIT 1'

/// 添加文档空间
export const InsertSpaceItem =
  'INSERT INTO doc_space(space_name,space_mark,sort,create_time) VALUES({space_name},{space_mark},{sort},CURRENT_TIMESTAMP)'
