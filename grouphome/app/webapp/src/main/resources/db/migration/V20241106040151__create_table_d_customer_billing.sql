-- Migration script: V20241106040151__create_table_d_customer_billing.sql

CREATE TABLE IF NOT EXISTS `d_customer_billing` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "顧客ID",
    `movein_1st_at` DATE COMMENT "本入居分（初回）",
    `original_request_at` DATE COMMENT "口座振替依頼書原本発送",
    `rp_input_at` DATE COMMENT "口座振替RP入力",
    `transfer_1st_at` DATE COMMENT "初回口座振替日",
    `remark` TEXT COMMENT "備考",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '請求状況基本';