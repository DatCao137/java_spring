-- Migration script: V20241122090127__create_table_m_office_qualification.sql

CREATE TABLE IF NOT EXISTS `m_office_qualification` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `type` ENUM('common', 'care', 'related ', 'construction', 'etc') NOT NULL COMMENT "資格種別",
    `name` VARCHAR(255) NOT NULL COMMENT "資格名",
    `limit` JSON COMMENT "更新条件",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '資格情報マスタ';