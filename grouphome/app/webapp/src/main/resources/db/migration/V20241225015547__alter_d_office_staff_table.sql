-- Migration script: V20241225015547__alter_d_office_staff_table.sql

ALTER TABLE `d_office_staff`
DROP COLUMN `branch_id`,
DROP COLUMN `main_home_id`,
DROP COLUMN `sub_home_id`,
ADD COLUMN `affiliations` JSON COMMENT '所属' AFTER `occupation_id`;

