-- Migration script: V20241225084040__create_table_d_facility_daily_branches.sql

CREATE TABLE IF NOT EXISTS `d_facility_daily_branches` (
    `id` BIGINT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `branch_id` INT UNSIGNED NOT NULL COMMENT "事業所ID",
    `yyyymmdd` VARCHAR(8) NOT NULL COMMENT "対象年月日",
    `menu` JSON NOT NULL COMMENT "献立",
    `works` JSON NOT NULL COMMENT "勤務状況",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    CONSTRAINT `unique_branch_id_yyyymmdd_deleted_at` UNIQUE (`branch_id`, `yyyymmdd`, `deleted_at`) 
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '日次記録(事業所)';