-- Migration script: V20241105093411__create_table_d_customer_care.sql

CREATE TABLE IF NOT EXISTS `d_customer_care` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "顧客ID",
    `care_no` VARCHAR(10) NOT NULL COMMENT "介護保険被保険者証(番号)",
    `care_type_id` TINYINT UNSIGNED NOT NULL COMMENT "要介護区分",
    `limit` INT UNSIGNED COMMENT "支給限度額",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '介護保険基本';