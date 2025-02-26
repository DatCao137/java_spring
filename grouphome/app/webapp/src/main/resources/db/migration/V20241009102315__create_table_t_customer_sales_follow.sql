-- Migration script: V20241009102315__create_table_t_customer_sales_follow.sql

CREATE TABLE IF NOT EXISTS `t_customer_sales_follow` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `sales_info_id` INT UNSIGNED NOT NULL,
    `step` TINYINT UNSIGNED NOT NULL COMMENT "段階",
    `follow_date` DATE COMMENT "フォロー日付",
    `staff_id` INT UNSIGNED COMMENT "担当者職員ID",
    `staff_name` VARCHAR(128) COMMENT "担当職員名",
    `contents` VARCHAR(255) COMMENT "フォロー内容",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE (`sales_info_id`, `step`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '営業フォロー情報';
