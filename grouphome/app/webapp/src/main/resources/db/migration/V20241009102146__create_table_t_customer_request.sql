-- Migration script: V20241009102146__create_table_t_customer_request.sql

CREATE TABLE IF NOT EXISTS `t_customer_request` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `name` VARCHAR(128) COMMENT "氏名",
    `request_date` DATETIME COMMENT "申込日",
    `request_type` ENUM('visit', 'movein') COMMENT "種類・申込書",
    `request_item` ENUM('visit', 'exp', 'exp-free', 'exp-pay', 'movein') COMMENT "種類・項目",
    `home_id` INT UNSIGNED COMMENT "対象事業所(ホーム)",
    `desired_date` JSON COMMENT "希望日",
    `representative_info` JSON COMMENT "代表情報",
    `remark` TEXT COMMENT "補足",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '申込情報';
