-- Migration script: V20241217064608__alter_table_t_customer_inquiry.sql

ALTER TABLE `t_customer_inquiry`
ADD COLUMN `age` TINYINT UNSIGNED COMMENT '年齢' AFTER `sex`;