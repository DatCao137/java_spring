ALTER TABLE `d_customer_care_detail`
DROP INDEX `idx_ids`,
ADD CONSTRAINT care_id_sub UNIQUE (`care_id`, `sub`, `deleted_at`),
ADD INDEX `idx_ids` (`care_id`, `sub`, `deleted_at`);
