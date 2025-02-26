-- Migration script: V20241106024939__create_table_d_customer_application_status.sql

CREATE TABLE IF NOT EXISTS `d_customer_application_status` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "顧客ID",
    `government` VARCHAR(32) COMMENT "援護自治体（受給者証発行元）",
    `national_rent_subsidy` JSON COMMENT "国GH家賃補助金",
    `municipal_rent_subsidy` JSON COMMENT "市区町村GH家賃補助金",
    `individual_municipality` JSON COMMENT "自治体単独加算",
    `life_insurance_pension` JSON COMMENT "生保・年金状況",
    `personal_liability` JSON COMMENT "個人賠償責任保険",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '申請状況';