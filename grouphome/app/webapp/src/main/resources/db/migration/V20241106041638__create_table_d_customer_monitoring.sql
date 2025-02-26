-- Migration script: V20241106041638__create_table_d_customer_monitoring.sql

CREATE TABLE IF NOT EXISTS `d_customer_monitoring` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL COMMENT "顧客ID",
    `yyyymm` VARCHAR(6) NOT NULL,
    `info` JSON NOT NULL,
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE (`customer_id`, `yyyymm`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = 'モニタリング';