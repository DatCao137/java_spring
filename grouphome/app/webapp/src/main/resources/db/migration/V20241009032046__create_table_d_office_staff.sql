-- Migration script: V20241009032046__create_table_d_office_staff.sql

CREATE TABLE IF NOT EXISTS `d_office_staff` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `smart_hr_crew_id` VARCHAR(255) NOT NULL UNIQUE COMMENT "SmartHR連携",
    PRIMARY KEY (`id`),
    INDEX `idx_crew_id` (`smart_hr_crew_id` ASC) VISIBLE
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '職員情報';

