-- Migration script: V20241009102243__create_table_t_customer_inquiry_item.sql

CREATE TABLE IF NOT EXISTS `t_customer_inquiry_item` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `inquiry_info_id` INT UNSIGNED NOT NULL,
    `status` TINYINT UNSIGNED NOT NULL COMMENT "進捗状況",
    `home_id` INT UNSIGNED COMMENT "対象ホーム",
    `gh_data` VARCHAR(32) COMMENT "契約GH転送用データ",
    `date` DATE COMMENT "日付",
    `breakdown` JSON NOT NULL COMMENT "内訳人数",
    `record` JSON NOT NULL COMMENT "記録",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE (`inquiry_info_id`, `status`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '問合せ情報詳細';
