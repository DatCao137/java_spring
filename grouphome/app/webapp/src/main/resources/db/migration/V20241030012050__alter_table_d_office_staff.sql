-- Migration script: V20241030012050__alter_table_d_office_staff.sql

ALTER TABLE `d_office_staff`
    CHANGE `name` `name_sei` VARCHAR(64) NOT NULL COMMENT '氏名(姓)',
    ADD COLUMN `name_mei` VARCHAR(64) NOT NULL COMMENT '氏名(名)' AFTER `name_sei`;
