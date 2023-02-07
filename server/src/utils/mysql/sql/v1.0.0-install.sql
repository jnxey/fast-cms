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

