-- Migration script: V20241009102222__create_table_t_customer_inquiry.sql

CREATE TABLE IF NOT EXISTS `t_customer_inquiry` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL COMMENT "氏名",
    `gana` VARCHAR(128) COMMENT "ふりがな",
    `sex` TINYINT UNSIGNED COMMENT "性別",
    `inquiry_src` JSON NOT NULL COMMENT "問合せ支援機関等",
    `status` TINYINT UNSIGNED NOT NULL COMMENT "ステータス",
    `tenant_id` INT UNSIGNED COMMENT "入居者ID",
    `next_action` VARCHAR(256) COMMENT "ネクストアクション",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '問合せ情報';
