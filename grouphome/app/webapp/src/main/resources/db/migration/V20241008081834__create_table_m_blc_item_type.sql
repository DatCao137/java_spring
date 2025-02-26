-- Migration script: V20241008081834__create_table_m_blc_item_type.sql

CREATE TABLE IF NOT EXISTS `m_blc_item_type` (
    `id` INT UNSIGNED NOT NULL UNIQUE,
    `name` VARCHAR(32) NOT NULL UNIQUE COMMENT "項目種別(英記)",
    `remark` VARCHAR(32) COMMENT "説明(日本語)",
    PRIMARY KEY (`id`),
    INDEX `idx_name` (`name` ASC) VISIBLE
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '項目情報種別マスタ';

