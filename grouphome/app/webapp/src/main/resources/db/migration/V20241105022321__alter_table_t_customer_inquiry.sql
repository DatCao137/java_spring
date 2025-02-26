-- Migration script: V20241105022321__alter_table_t_customer_inquiry.sql

ALTER TABLE `t_customer_inquiry`
    ADD COLUMN `customer_id` INT UNSIGNED COMMENT '利用者ID' AFTER `tenant_id`;
    
CREATE INDEX idx_customer_id ON `t_customer_inquiry` (`customer_id`);