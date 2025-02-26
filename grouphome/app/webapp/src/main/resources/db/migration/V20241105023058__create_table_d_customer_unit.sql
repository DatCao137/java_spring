-- Migration script: V20241105023058__create_table_d_customer_unit.sql

CREATE TABLE IF NOT EXISTS `d_customer_unit` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL COMMENT "顧客ID",
    `brunch_id` INT UNSIGNED NOT NULL COMMENT "事業所ID",
    `unit_id` INT UNSIGNED NOT NULL COMMENT "ユニットID",
    `room_no` VARCHAR(5) NOT NULL COMMENT "部屋番号",
    `status` TINYINT UNSIGNED NOT NULL COMMENT "入居状況",
    `movein_at` DATE NOT NULL COMMENT "入居開始日",
    `leaving_at` DATE COMMENT "退去・移動日",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_customer_id` (`customer_id` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '利用者住居情報';