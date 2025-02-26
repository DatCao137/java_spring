DROP TABLE IF EXISTS `d_customer_medical_detail`;

CREATE TABLE IF NOT EXISTS `d_customer_medical_detail` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `medical_id` INT UNSIGNED NOT NULL COMMENT "医療保険基本ID",
    `sub` TINYINT UNSIGNED NOT NULL COMMENT "枝番",
    `service_name` VARCHAR(128) NOT NULL COMMENT "利用サービス名",
    `institution` VARCHAR(128) NOT NULL COMMENT "利用機関名",
    `status` TINYINT UNSIGNED NOT NULL COMMENT "ステータス",
    `pace` TINYINT UNSIGNED NOT NULL COMMENT "利用頻度",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_medical_id_sub` (`medical_id`, `sub`, `deleted_at`),
    INDEX `idx_ids` (`medical_id`, `sub`, `deleted_at`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '医療保険詳細';