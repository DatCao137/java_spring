-- Migration script: V20241105021657__alter_table_t_customer_request.sql

ALTER TABLE `t_customer_request`
    ADD COLUMN `customer_id` INT UNSIGNED COMMENT '利用者ID' AFTER `representative_info`;
    
CREATE INDEX idx_customer_id ON `t_customer_request` (`customer_id`);