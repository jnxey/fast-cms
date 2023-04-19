/// 查询用户
export const SelectAdminUser =
  'SELECT * FROM admin_user WHERE admin_name = {name} AND admin_status=1'

/// 修改密码
export const UpdateAdminPwd = 'UPDATE admin_user SET admin_pwd={admin_pwd} WHERE id = {id}'

/// 查询文档菜单列表
export const SelectMenuList = 'SELECT * FROM doc_menu'

/// 查询文档菜单是否存在，BY Mark
export const SelectMenuCount =
  'SELECT * FROM doc_menu WHERE parent_id = {parent_id} AND menu_mark = {menu_mark} LIMIT 1'

/// 查询文档菜单是否存在，BY Id
export const SelectMenuExit = 'SELECT * FROM doc_menu WHERE id = {id} LIMIT 1'

/// 添加文档菜单
export const InsertMenuItem =
  'INSERT INTO doc_menu(menu_name,menu_mark,menu_type,parent_id,content_id,sort,create_time) VALUES({menu_name},{menu_mark},{menu_type},{parent_id},{content_id},{sort},CURRENT_TIMESTAMP)'

/// 更新文档菜单，BY Id
export const UpdateMenuItem =
  'UPDATE doc_menu SET menu_name={menu_name},menu_mark={menu_mark},menu_type={menu_type},sort={sort} WHERE id = {id}'

/// 添加新的文档内容
export const InsertContentItem =
  'INSERT INTO doc_content(doc_type,create_time) VALUES({doc_type},CURRENT_TIMESTAMP)'

/// 更新文档菜单，BY Id
export const UpdateMenuContentId = 'UPDATE doc_menu SET content_id={content_id} WHERE id = {id}'

/// 查询文档内容，BY Id
export const SelectDocContent = 'SELECT * FROM doc_content WHERE id = {id} LIMIT 1'

/// 更新文档内容，BY Id
export const UpdateDocContent =
  'UPDATE doc_content SET doc_keyword={doc_keyword},doc_content={doc_content} WHERE id = {id}'

/// 设置文档内容为首页
export const UpdateDocContentHome = 'UPDATE system_config SET page_index={page_index} WHERE id = 1'

/// 查询当前文档内容首页
export const SelectDocContentHome = 'SELECT * FROM system_config WHERE id = 1 LIMIT 1'

/// 将Blob插入文件列表中
export const InsertBlobToFile =
  'INSERT INTO file_save(file_type,file_tag,file_hash,file_blob,create_time) VALUES({file_type},{file_tag},{file_hash},{file_blob},CURRENT_TIMESTAMP)'

/// 查询文件Blob
export const SelectBlobFromFile = 'SELECT * FROM file_save WHERE file_hash = {file_hash} LIMIT 1'

/// 查询管理员列表
export const SelectManagerList = 'SELECT * FROM admin_user WHERE admin_status=1'

/// 查询账户名称是否存在，BY Mark
export const SelectMemberCount = 'SELECT * FROM admin_user WHERE admin_name = {admin_name} LIMIT 1'

/// 插入管理员列表
export const InsertMember =
  'INSERT INTO admin_user(admin_name,admin_pwd,admin_role,admin_status,create_time) VALUES({admin_name},{admin_pwd},{admin_role},1,CURRENT_TIMESTAMP)'

/// 删除管理员列表
export const DeleteMember = 'UPDATE admin_user SET admin_status=0 WHERE id={id}'

/// 获取文档空间角色列表
export const SelectMenuRoots = 'SELECT * FROM doc_menu WHERE parent_id=0'

/// 编辑管理员权限
export const UpateMemberAuths =
  'UPDATE admin_user SET admin_auth_ids={admin_auth_ids} WHERE id={id}'
