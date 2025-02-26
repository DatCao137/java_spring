-- Migration script: V20241008085903__create_table_m_blc_postal_address.sql

CREATE TABLE IF NOT EXISTS `m_blc_postal_address` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `post_no` VARCHAR(7) NOT NULL COMMENT "郵便番号",
    `pref` VARCHAR(4) NOT NULL COMMENT "都道府県名",
    `city` VARCHAR(16) NOT NULL COMMENT "市区町村名",
    `town` VARCHAR(64) NOT NULL COMMENT "その他",
    PRIMARY KEY (`id`),
    INDEX `idx_post_no` (`post_no` ASC) VISIBLE,
    INDEX `idx_pref` (`pref` ASC) VISIBLE
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '郵便住所マスタ';