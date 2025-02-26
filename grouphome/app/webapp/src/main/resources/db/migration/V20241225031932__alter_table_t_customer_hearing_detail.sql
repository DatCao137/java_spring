-- Migration script: V20241225031932__alter_table_t_customer_hearing_detail.sql

ALTER TABLE `t_customer_hearing_detail`
DROP INDEX `hearing_info_id`;

ALTER TABLE `t_customer_hearing_detail`
ADD CONSTRAINT `hearing_info_id_deleted_at`
UNIQUE (`hearing_info_id`, `step`, `deleted_at`);