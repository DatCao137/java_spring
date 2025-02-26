-- Migration script: V20241128071024__create_d_office_room_table.sql

CREATE TABLE IF NOT EXISTS `d_office_room` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `unit_id` INT UNSIGNED NOT NULL COMMENT "所属ユニット",
    `name` VARCHAR(128) NOT NULL COMMENT "部屋名",
    `contents` JSON COMMENT "固有情報",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    UNIQUE (`unit_id`, `name`),
    INDEX `idx_unit_id` (`unit_id`),
    INDEX `idx_name` (`name`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '居室情報';