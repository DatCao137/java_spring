-- Migration script: V20241009030730__create_table_d_office_home.sql

CREATE TABLE IF NOT EXISTS `d_office_home` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL COMMENT "ホーム名",
    `branch_id` INT UNSIGNED NOT NULL COMMENT "事業所ID",
    `same_branch` BOOLEAN NOT NULL DEFAULT FALSE COMMENT "事業所と同じ住所か？",
    `addr_id` INT UNSIGNED DEFAULT NULL COMMENT "所在地",
    `contents` JSON COMMENT "詳細情報",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_name` (`name` ASC) VISIBLE,
    INDEX `idx_branch_id` (`branch_id` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = 'ホーム情報';
