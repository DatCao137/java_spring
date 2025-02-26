-- Migration script: V20241217075409__create_t_office_calc_details_table.sql

CREATE TABLE IF NOT EXISTS `t_office_calc_details` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `calc_id` INT UNSIGNED NOT NULL COMMENT "算定情報ID",
    `start_date` DATE NOT NULL COMMENT "適用開始日",
    `notification_date` DATE COMMENT "届出日",
    `valid_start_date` DATE COMMENT "有効期間開始",
    `valid_end_date` DATE COMMENT "有効期間終了",
    `calc_items_id` INT UNSIGNED NOT NULL COMMENT "算定項目ID",
    `value` JSON NOT NULL,
    `remark` VARCHAR(255) COMMENT "備考",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_calc_id` (`calc_id`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '算定情報詳細';