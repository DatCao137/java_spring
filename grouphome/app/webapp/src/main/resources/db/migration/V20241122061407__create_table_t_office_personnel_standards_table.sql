-- Migration script: V20241122061407__create_table_t_office_personnel_standards_table.sql

CREATE TABLE IF NOT EXISTS `t_office_personnel_standards` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `yyyymm` VARCHAR(6) NOT NULL COMMENT "対象年月",
    `unit_id` INT UNSIGNED NOT NULL COMMENT "ユニットID",
    `total` DECIMAL(4,1) NOT NULL COMMENT "利用者の数",
    `category3` DECIMAL(4,1) NOT NULL COMMENT "区分3の人数",
    `category4` DECIMAL(4,1) NOT NULL COMMENT "区分4の人数",
    `category5` DECIMAL(4,1) NOT NULL COMMENT "区分5の人数",
    `category6` DECIMAL(4,1) NOT NULL COMMENT "区分6の人数",
    `caregivers` DECIMAL(4,1) NOT NULL COMMENT "必要世話人数",
    `supporter` DECIMAL(4,1) NOT NULL COMMENT "必要生活支援員数",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE (`yyyymm`, `unit_id`),
    INDEX `idx_yyyymm` (`yyyymm`),
    INDEX `idx_unit_id` (`unit_id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '人員基準記録';