-- Migration script: V20241009102259__create_table_t_customer_sales.sql

CREATE TABLE IF NOT EXISTS `t_customer_sales` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `inquiry_info_id` INT UNSIGNED NOT NULL UNIQUE,
    `first_inquiry_date` DATE COMMENT "初回問合せ",
    `first_inquiry_how` TINYINT UNSIGNED COMMENT "初回問合せ方法",
    `contact` JSON NOT NULL COMMENT "連絡情報",
    `decision` JSON NOT NULL COMMENT "意思決定者情報",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '営業情報';
