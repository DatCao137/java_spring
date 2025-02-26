-- Migration script: V20241204090005__alter_table_d_customer_billing_detail.sql

ALTER TABLE `d_customer_billing_detail`
DROP INDEX `billing_id`;

ALTER TABLE `d_customer_billing_detail`
ADD CONSTRAINT `unique_billing_yyyymm_deleted_at_constraint`
UNIQUE (`billing_id`, `yyyymm`, `deleted_at`);