ALTER TABLE `d_customer_medical_detail`
DROP INDEX `idx_ids`,
ADD CONSTRAINT medical_id_sub UNIQUE (`medical_id`, `sub`, `deleted_at`),
ADD INDEX `idx_ids` (`medical_id`, `sub`, `deleted_at`);
