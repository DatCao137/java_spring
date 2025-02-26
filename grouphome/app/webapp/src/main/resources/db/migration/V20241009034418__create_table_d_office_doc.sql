-- Migration script: V20241009034418__create_table_d_office_doc.sql

CREATE TABLE IF NOT EXISTS `d_office_doc` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `path_id` INT UNSIGNED NOT NULL COMMENT "パスID",
    `name` VARCHAR(255) NOT NULL COMMENT "ファイル名",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_path_id` (`path_id` ASC) VISIBLE,
    INDEX `idx_name` (`name` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '文書管理情報';
