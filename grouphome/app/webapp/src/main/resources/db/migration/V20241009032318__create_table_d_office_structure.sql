-- Migration script: V20241009032318__create_table_d_office_structure.sql

CREATE TABLE IF NOT EXISTS `d_office_structure` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `branch_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "事務所",
    `manager_name` VARCHAR(64) COMMENT "管理者",
    `service1` JSON COMMENT "サービス管理責任者1", 
    `service2` JSON COMMENT "サービス管理責任者2",
    `life_supporter` JSON COMMENT "常勤生活支援員",
    `welfare_worker` JSON COMMENT "常勤福祉士",
    `nurse` JSON COMMENT "正看護師",
    `visiting_contract` JSON COMMENT "訪看契約",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_branch_id` (`branch_id` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '人員体制';
