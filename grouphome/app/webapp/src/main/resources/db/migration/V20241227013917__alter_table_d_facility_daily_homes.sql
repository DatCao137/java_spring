-- Migration script: V20241227013917__alter_table_d_facility_daily_homes.sql

ALTER TABLE `d_facility_daily_branches` RENAME TO `d_facility_daily_homes`;

ALTER TABLE `d_facility_daily_homes` COMMENT '日次記録(ホーム)';

ALTER TABLE `d_facility_daily_homes`
DROP INDEX `unique_branch_id_yyyymmdd_deleted_at`;

ALTER TABLE `d_facility_daily_homes` RENAME COLUMN `branch_id` TO `home_id`;
ALTER TABLE `d_facility_daily_homes` MODIFY `home_id` INT UNSIGNED NOT NULL COMMENT 'ホームID';

ALTER TABLE `d_facility_daily_homes`
ADD CONSTRAINT `unique_home_id_yyyymmdd_deleted_at`
UNIQUE (`home_id`, `yyyymmdd`, `deleted_at`);
