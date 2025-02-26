-- Migration script: V20241225084117__create_table_d_facility_state_templates.sql

CREATE TABLE IF NOT EXISTS `d_facility_state_templates` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `unit_id` INT UNSIGNED COMMENT "住居ID",
    `zone` ENUM('morning', 'noon', 'night') COMMENT "時間帯",
    `message` TEXT COMMENT "メッセージ",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '様子テンプレート';