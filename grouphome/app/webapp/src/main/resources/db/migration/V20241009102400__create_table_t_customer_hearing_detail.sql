-- Migration script: V20241009102400__create_table_t_customer_hearing_detail.sql

CREATE TABLE IF NOT EXISTS `t_customer_hearing_detail` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `hearing_info_id` INT UNSIGNED NOT NULL,
    `step` TINYINT UNSIGNED NOT NULL COMMENT "STEP",
    `contents` VARCHAR(512) COMMENT "ヒアリング内容",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE (`hearing_info_id`, `step`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '聞き取り情報詳細';
