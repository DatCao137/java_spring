-- Migration script: V20241009102331__create_table_t_customer_inquiry_profile.sql

CREATE TABLE IF NOT EXISTS `t_customer_inquiry_profile` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `inquiry_info_id` INT UNSIGNED NOT NULL UNIQUE,
    `introducer` JSON NOT NULL COMMENT "紹介者",
    `disabled` JSON NOT NULL COMMENT "障害特性",
    `pocket_book` JSON NOT NULL COMMENT "手帳状況",
    `service` JSON NOT NULL COMMENT "利用中サービス",
    `residence` JSON NOT NULL COMMENT "現在の住居",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '問合せプロフィール';

