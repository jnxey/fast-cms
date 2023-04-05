/// 查询用户
export const SelectAdminUser = 'SELECT * FROM admin_user WHERE admin_name = {name}'

/// 查询文档菜单列表
export const SelectMenuList = 'SELECT * FROM doc_menu'

/// 查询文档菜单列表
export const SelectMenuCount =
  'SELECT * FROM doc_menu WHERE id = {parent_id} AND menu_mark = {menu_mark} LIMIT 1'

/// 添加文档菜单
export const InsertMenuItem =
  'INSERT INTO doc_menu(menu_name,menu_mark,menu_type,parent_id,content_id,sort,create_time) VALUES({menu_name},{menu_mark},{menu_type},{parent_id},{content_id},{sort},CURRENT_TIMESTAMP)'
