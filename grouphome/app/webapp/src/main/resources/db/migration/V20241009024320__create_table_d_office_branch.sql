-- Migration script: V20241009024320__create_table_d_office_branch.sql

CREATE TABLE IF NOT EXISTS `d_office_branch` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `no` INT UNSIGNED NOT NULL UNIQUE COMMENT "事業所番号",
    `name` VARCHAR(255) NOT NULL COMMENT "事業所名",
    `addr_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "所在地",
    `contents` JSON COMMENT "詳細情報",
    `memo` TEXT COMMENT "メモ",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_name` (`name` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '事業所情報';