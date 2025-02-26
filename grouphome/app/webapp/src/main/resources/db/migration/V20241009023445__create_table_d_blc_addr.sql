-- Migration script: V20241009023445__create_table_d_office_addr.sql

CREATE TABLE IF NOT EXISTS `d_blc_addr` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `post_no` VARCHAR(8) DEFAULT NULL COMMENT "郵便番号",
    `pref_id` TINYINT UNSIGNED DEFAULT NULL COMMENT "都道府県",
    `city` VARCHAR(16) DEFAULT NULL COMMENT "市区",
    `town` VARCHAR(255) DEFAULT NULL COMMENT "町村以下",
    `tel` VARCHAR(13) DEFAULT NULL COMMENT "電話番号",
    `fax` VARCHAR(13) DEFAULT NULL COMMENT "FAX番号",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`),
    INDEX `idx_post_no` (`post_no` ASC) VISIBLE,
    INDEX `idx_pref` (`pref_id` ASC) VISIBLE,
    INDEX `idx_tel` (`tel` ASC) VISIBLE,
    INDEX `idx_fax` (`fax` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '住所情報';