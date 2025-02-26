-- Migration script: V20241009072339__create_table_d_office_doc_file.sql

CREATE TABLE IF NOT EXISTS `d_office_doc_file` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `doc_id` INT UNSIGNED NOT NULL COMMENT "文書管理情報ID",
    `filename` VARCHAR(255) NOT NULL COMMENT "ファイル名",
    `ext` VARCHAR(32) NOT NULL COMMENT "拡張子",
    `data` LONGBLOB NOT NULL COMMENT "ファイルデータ",
    `comment` VARCHAR(255) NOT NULL COMMENT "コメント",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_doc` (`doc_id` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '文書ファイル管理';
