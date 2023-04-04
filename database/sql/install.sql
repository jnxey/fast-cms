CREATE
DATABASE fast_cms;

USE
fast_cms;

CREATE TABLE admin_user
(
  id          INT         NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  admin_name  VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  admin_pwd   VARCHAR(50) NOT NULL COMMENT '密码',
  system_role INT         NOT NULL COMMENT '角色',
  create_time DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='管理员表';

CREATE TABLE system_role
(
  id          INT         NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  role_name   VARCHAR(50) NOT NULL UNIQUE COMMENT '角色名',
  role_auth   VARCHAR(50) NOT NULL COMMENT '角色权限集合',
  create_time DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='角色表';

CREATE TABLE system_auth
(
  id          INT         NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  auth_name   VARCHAR(50) NOT NULL UNIQUE COMMENT '权限名',
  auth_code   VARCHAR(50) NOT NULL UNIQUE COMMENT '权限码',
  auth_parent INT         NOT NULL DEFAULT 0 COMMENT '上一级权限ID，0为第一级',
  auth_type   SMALLINT    NOT NULL DEFAULT 1 COMMENT '权限类型：1-菜单，2-页面，3-功能',
  create_time DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='权限表';

CREATE TABLE system_config (
  id          INT      NOT NULL UNIQUE COMMENT '主键',
  page_index  INT                      COMMENT '商城首页文档ID',
  create_time DATETIME NOT NULL        COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='系统配置';

CREATE TABLE doc_space
(
  id          INT         NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  space_name  VARCHAR(50) NOT NULL UNIQUE COMMENT '空间名称',
  space_mark  VARCHAR(50) NOT NULL UNIQUE COMMENT '空间标识',
  sort        INT NOT NULL COMMENT '排序',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';

CREATE TABLE doc_menu
(
  id          INT         NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  menu_name   VARCHAR(50) NOT NULL UNIQUE COMMENT '菜单名称',
  menu_mark   VARCHAR(50) NOT NULL UNIQUE COMMENT '菜单标识',
  parent_id   INT NOT NULL COMMENT '父级菜单',
  space_id    INT NOT NULL COMMENT '所属空间',
  content_id  INT NOT NULL COMMENT '文档内容',
  sort        INT NOT NULL COMMENT '排序',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';

CREATE TABLE doc_content
(
  id          INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  doc_type    INT NOT NULL      COMMENT '文档显示类型，1-富文本，2-Markdown，3-Iframe，4-SFC',
  doc_keyword LONGTEXT NOT NULL COMMENT '文档关键词，可用【，】分开',
  doc_content LONGTEXT NOT NULL COMMENT '文档内容',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';

INSERT INTO admin_user    VALUES (1, 'admin', '698495dad777ebb0be5281f4f44d27c6', 999, CURRENT_TIMESTAMP);
INSERT INTO system_config VALUES (1, 0, CURRENT_TIMESTAMP);

CREATE INDEX admin_name_index ON admin_user (admin_name);