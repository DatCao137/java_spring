-- Migration script: V20241217080256__create_m_office_calc_items_table.sql

CREATE TABLE IF NOT EXISTS `m_office_calc_items` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `group_home_type_id` TINYINT UNSIGNED COMMENT "類型ID",
    `name` VARCHAR(255) NOT NULL COMMENT "算定項目名",
    `choices` JSON COMMENT "選択肢",
    `depends` JSON COMMENT "前提",
    `type` ENUM('', 'add', 'del') NOT NULL COMMENT "区分",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_group_home_type_id` (`group_home_type_id`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '算定項目マスタ';