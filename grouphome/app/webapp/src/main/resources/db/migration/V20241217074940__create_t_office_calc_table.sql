-- Migration script: V20241217074940__create_t_office_calc_table.sql

CREATE TABLE IF NOT EXISTS `t_office_calc` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `branch_id` INT UNSIGNED NOT NULL COMMENT "事業所ID",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_branch_id` (`branch_id`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '算定情報';