-- Migration script: V20241009031520__create_table_d_office_unit.sql

CREATE TABLE IF NOT EXISTS `d_office_unit` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `home_id` INT UNSIGNED NOT NULL COMMENT "所属ホーム",
    `name` VARCHAR(128) NOT NULL COMMENT "共同生活住居名",
    `addr_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "住所(電話)",
    `mail` VARCHAR(255) COMMENT "メールアドレス",
    `contents` JSON COMMENT "定員数",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_home_id` (`home_id` ASC) VISIBLE,
    INDEX `idx_name` (`name` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '住居情報';
