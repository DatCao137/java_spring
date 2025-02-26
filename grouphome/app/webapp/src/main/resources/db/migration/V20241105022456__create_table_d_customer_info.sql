-- Migration script: V20241105022456__create_table_d_customer_info.sql

CREATE TABLE IF NOT EXISTS `d_customer_info` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `name` VARCHAR(128) COMMENT "氏名",
    `name_gana` VARCHAR(128) COMMENT "氏名(ふりがな)",
    `personal` JSON COMMENT "個人情報",
    `details` JSON,
    `category` TINYINT UNSIGNED COMMENT "障がい支援区分",
    `base_customer_id` INT UNSIGNED,
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '利用者情報';