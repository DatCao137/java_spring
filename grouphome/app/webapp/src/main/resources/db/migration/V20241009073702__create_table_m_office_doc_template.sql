-- Migration script: V20241009073702__create_table_m_office_doc_template.sql

CREATE TABLE IF NOT EXISTS `m_office_doc_template` (
    `id` INT UNSIGNED NOT NULL UNIQUE,
    `type` TINYINT UNSIGNED NOT NULL COMMENT "テンプレート種別",
    `name` VARCHAR(255) NOT NULL COMMENT "フォルダ名",
    `parent_id` INT UNSIGNED COMMENT "親フォルダID",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_parent_id` (`parent_id` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '文書管理ツリーテンプレート情報';
