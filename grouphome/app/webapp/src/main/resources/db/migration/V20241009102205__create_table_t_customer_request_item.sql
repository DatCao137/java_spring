-- Migration script: V20241009102205__create_table_t_customer_request_item.sql

CREATE TABLE IF NOT EXISTS `t_customer_request_item` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `request_info_id` INT UNSIGNED NOT NULL COMMENT "申請情報ID",
    `contents` JSON NOT NULL COMMENT "内容",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_request_info_id` (`request_info_id` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '申込情報内容';

