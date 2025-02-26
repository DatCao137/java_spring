-- Migration script: V20241106035234__create_table_d_customer_document_status.sql

CREATE TABLE IF NOT EXISTS `d_customer_document_status` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `customer_id` INT UNSIGNED NOT NULL UNIQUE COMMENT "顧客ID",
    `tour` JSON COMMENT "見学申込書",
    `assessment` JSON COMMENT "アセスメントシート",
    `trial` JSON COMMENT "体験利用契約",
    `trialImportantExperience` JSON COMMENT "体験重要事項説明書",
    `usageContract` JSON COMMENT "利用契約",
    `importantExperience` JSON COMMENT "重要事項説明書",
    `plan` JSON COMMENT "個別支援計画",
    `monitoring` JSON COMMENT "モニタリング",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
) 

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = '書類状況';