CREATE
DATABASE nr_document;

USE
nr_document;

CREATE TABLE admin_user
(
  id              INT         NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  admin_name      VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  admin_pwd       VARCHAR(50) NOT NULL COMMENT '密码',
  admin_role      INT         NOT NULL COMMENT '角色，999-超级管理员，888-一般编辑员',
  admin_auth_ids  VARCHAR(255)         COMMENT '权限IDS',
  admin_status    INT         NOT NULL COMMENT '用户状态，1-正常，0-删除',
  create_time     DATETIME    NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='管理员表';

CREATE TABLE system_config (
  id          INT      NOT NULL UNIQUE COMMENT '主键',
  page_index  INT                      COMMENT '商城首页文档ID',
  create_time DATETIME NOT NULL        COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='系统配置';

CREATE TABLE doc_menu
(
  id          INT         NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  menu_name   VARCHAR(50) NOT NULL        COMMENT '菜单名称',
  menu_mark   VARCHAR(50) NOT NULL        COMMENT '菜单标识',
  menu_type   INT NOT NULL COMMENT '菜单类型，1-菜单，2-页面',
  parent_id   INT NOT NULL COMMENT '父级菜单',
  content_id  INT NOT NULL COMMENT '文档内容',
  sort        INT NOT NULL COMMENT '排序',
  create_time DATETIME    NOT NULL        COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';

CREATE TABLE doc_content
(
  id          INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  doc_type    INT NOT NULL      COMMENT '文档显示类型，1-richText，2-Markdown，3-website，4-code',
  doc_title   VARCHAR(50)       COMMENT '文档标题',
  doc_keyword VARCHAR(50)       COMMENT '文档关键词',
  doc_content LONGTEXT          COMMENT '文档内容',
  create_time DATETIME NOT NULL COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文档空间列表';

CREATE TABLE file_save
(
  id          INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '主键',
  file_type   VARCHAR(50)  NOT NULL              COMMENT '文件类型',
  file_tag    INT          NOT NULL              COMMENT '文件标签，一般为所属文档ID，否则为-1',
  file_hash   VARCHAR(50)  NOT NULL              COMMENT '文件Hash',
  file_blob   LONGTEXT     NOT NULL              COMMENT '文件内容',
  create_time DATETIME     NOT NULL              COMMENT '创建时间',
  PRIMARY KEY (id)
) ENGINE=InnoDB COMMENT='文件存储';

INSERT INTO admin_user    VALUES (1, 'admin', '698495dad777ebb0be5281f4f44d27c6', 999, NULL, 1, CURRENT_TIMESTAMP);
INSERT INTO system_config VALUES (1, 0, CURRENT_TIMESTAMP);

CREATE INDEX admin_name_index ON admin_user (admin_name);
-- CREATE INDEX space_mark_index ON doc_space (space_mark);
-- CREATE INDEX menu_mark_index ON doc_menu (menu_mark);


