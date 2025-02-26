-- Migration script: V20241225062815__alter_unique_deleted_at_into_t_customer_sales_follow_table.sql

ALTER TABLE `t_customer_sales_follow`
DROP INDEX `sales_info_id`;

ALTER TABLE `t_customer_sales_follow`
ADD CONSTRAINT `sales_info_id_step_deleted_at`
UNIQUE (`sales_info_id`, `step`, `deleted_at`);