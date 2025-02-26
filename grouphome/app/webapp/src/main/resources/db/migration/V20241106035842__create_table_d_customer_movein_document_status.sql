-- Migration script: V20241106035842__create_table_d_customer_movein_document_status.sql

CREATE TABLE IF NOT EXISTS `d_customer_movein_document_status` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "顧客ID",
    `basic` JSON COMMENT "基本書類",
    `plan_1st` JSON COMMENT "初回個別支援計画",
    `memo` TEXT COMMENT "MEMO",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '本入居書類状況';