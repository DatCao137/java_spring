-- Migration script: V20241009102346__create_table_t_customer_hearing.sql

CREATE TABLE IF NOT EXISTS `t_customer_hearing` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `inquiry_info_id` INT UNSIGNED NOT NULL UNIQUE,
    `result` VARCHAR(512) COMMENT "結果",
    `prospect` VARCHAR(512) COMMENT "見込み状況",
    `remark` VARCHAR(512) COMMENT "メモ",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '聞き取り情報';
