-- Migration script: V20241106040542__create_table_d_customer_billing_detail.sql

CREATE TABLE IF NOT EXISTS `d_customer_billing_detail` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `billing_id` INT UNSIGNED NOT NULL COMMENT "請求状況基本ID",
    `yyyymm` VARCHAR(6) NOT NULL COMMENT "提供月",
    `national_at` DATE COMMENT "国保連",
    `self_governing_at` DATE COMMENT "自治単独加算等",
    `other_at` DATE COMMENT "その他助成金等",
    `issue_at` DATE COMMENT "発行日",
    `memo` TEXT COMMENT "メモ",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE (`billing_id`, `yyyymm`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '請求状況詳細';