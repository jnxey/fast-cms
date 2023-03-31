CREATE
DATABASE fast_cms;

USE
fast_cms;

CREATE TABLE admin_user
(
  id          INT         NOT NULL AUTO_INCREMENT COMMENT '主键',
  portrait    VARCHAR(50) NOT NULL COMMENT '画像',
  system_role INT         NOT NULL COMMENT '角色',
  create_time DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='管理员表';

CREATE TABLE client_user
(
  id          INT         NOT NULL AUTO_INCREMENT COMMENT '主键',
  portrait    VARCHAR(50) NOT NULL COMMENT '画像',
  system_role INT         NOT NULL COMMENT '角色',
  create_time DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='用户表';

CREATE TABLE system_role
(
  id          INT         NOT NULL AUTO_INCREMENT COMMENT '主键',
  role_name   VARCHAR(50) NOT NULL COMMENT '角色名',
  role_auth   VARCHAR(50) NOT NULL COMMENT '角色权限集合',
  create_time DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='角色表';

CREATE TABLE system_auth
(
  id          INT         NOT NULL AUTO_INCREMENT COMMENT '主键',
  auth_name   VARCHAR(50) NOT NULL COMMENT '权限名',
  auth_code   VARCHAR(50) NOT NULL COMMENT '权限码',
  auth_parent INT         NOT NULL DEFAULT 0 COMMENT '上一级权限ID，0为第一级',
  auth_type   SMALLINT    NOT NULL DEFAULT 1 COMMENT '权限类型：1-菜单，2-页面，3-功能',
  create_time DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='权限表';

CREATE TABLE doc_space
(
  id          INT         NOT NULL AUTO_INCREMENT COMMENT '主键',
  space_name  VARCHAR(50) NOT NULL COMMENT '空间名称',
  space_mark  INT NOT NULL COMMENT '空间标识',
  sort        INT NOT NULL COMMENT '排序',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';

CREATE TABLE doc_menu
(
  id          INT         NOT NULL AUTO_INCREMENT COMMENT '主键',
  menu_name   VARCHAR(50) NOT NULL COMMENT '菜单名称',
  menu_mark   INT NOT NULL COMMENT '菜单标识',
  parent_id   INT NOT NULL COMMENT '父级菜单',
  space_id    INT NOT NULL COMMENT '所属空间',
  content_id  INT NOT NULL COMMENT '文档内容',
  sort        INT NOT NULL COMMENT '排序',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';

CREATE TABLE doc_content
(
  id          INT         NOT NULL AUTO_INCREMENT COMMENT '主键',
  doc_type    INT NOT NULL COMMENT '文档显示类型，1-富文本，2-Markdown，3-Iframe，4-SFC',
  doc_keyword VARCHAR(255) NOT NULL COMMENT '文档关键词，可用【，】分开',
  doc_content LONGTEXT NOT NULL COMMENT '文档内容',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';
