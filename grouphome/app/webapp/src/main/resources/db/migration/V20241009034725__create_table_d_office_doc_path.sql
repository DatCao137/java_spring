-- Migration script: V20241009034725__create_table_d_office_doc_path.sql

CREATE TABLE IF NOT EXISTS `d_office_doc_path` (
    `id` INT UNSIGNED NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL COMMENT "フォルダ名",
    `is_base` BOOLEAN NOT NULL DEFAULT FALSE COMMENT "ベースフラグ",
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
COMMENT = '文書管理パス情報';


