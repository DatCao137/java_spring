-- Migration script: V20241008083305__create_table_m_blc_item.sql

CREATE TABLE IF NOT EXISTS `m_blc_item` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `item_type_id` INT UNSIGNED NOT NULL COMMENT "項目種別",
    `type_id` VARCHAR(32) NOT NULL COMMENT "項目ID",
    `name` VARCHAR(32) NOT NULL COMMENT "項目名",
    `sort` INT UNSIGNED NOT NULL COMMENT "表示順",
    PRIMARY KEY (`id`),
    INDEX `idx_type_id` (`item_type_id`, `type_id`) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '項目情報マスタ';