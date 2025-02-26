-- Migration script: V20241106024342__create_table_d_customer_handbook_status.sql

CREATE TABLE IF NOT EXISTS `d_customer_handbook_status` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "顧客ID",
    `recipient` JSON COMMENT "受給者情報",
    `disabled` JSON COMMENT "障害者情報",
    `limit` JSON COMMENT "上限情報",
    `visiting_place` VARCHAR(128) COMMENT "通所先",
    `service` VARCHAR(128) COMMENT "サービス",
    `handbook_type` VARCHAR(10) COMMENT "障がい者手帳種類",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '手帳状況';