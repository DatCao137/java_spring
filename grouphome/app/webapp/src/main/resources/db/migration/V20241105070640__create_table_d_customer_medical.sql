-- Migration script: V20241105070640__create_table_d_customer_medical.sql

CREATE TABLE IF NOT EXISTS `d_customer_medical` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "顧客ID",
    `insurance_type_id` TINYINT UNSIGNED NOT NULL COMMENT "保険証種別ID",
    `number` VARCHAR(15) NOT NULL COMMENT "記号-番号-枝番",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '医療保険基本';