-- Migration script: V20241204030735__alter_table_d_office_branch.sql
ALTER TABLE `d_office_branch`
DROP INDEX `no`;

ALTER TABLE `d_office_branch`
ADD UNIQUE (`no`, `deleted_at`);
