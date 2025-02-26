-- Migration script: V20241125051307__create_table_t_office_room_manage.sql

CREATE TABLE IF NOT EXISTS `t_office_room_manage` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL COMMENT "顧客ID",
    `room_id` INT UNSIGNED NOT NULL COMMENT "居室ID",
    `unit_id` INT UNSIGNED NOT NULL COMMENT "ユニットID",
    `movein_at` DATE NOT NULL COMMENT "入居開始日",
    `leaving_at` DATE COMMENT "退去・移動日",
    `category` TINYINT UNSIGNED NOT NULL COMMENT "障がい支援区分",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_customer_id` (`customer_id`),
    INDEX `idx_room_id` (`room_id`),
    INDEX `idx_unit_id` (`unit_id`),
    INDEX `idx_updated_at` (`updated_at`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '居室管理';