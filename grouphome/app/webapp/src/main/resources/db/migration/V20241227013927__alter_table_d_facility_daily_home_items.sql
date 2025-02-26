-- Migration script: V20241227013927__alter_table_d_facility_daily_home_items.sql

ALTER TABLE `d_facility_daily_branch_items` RENAME TO `d_facility_daily_home_items`;

ALTER TABLE `d_facility_daily_home_items` COMMENT '日次記録(ホーム-項目)';

ALTER TABLE `d_facility_daily_home_items`
DROP INDEX `unique_branch_id_yyyymmdd_name_deleted_at`;

ALTER TABLE `d_facility_daily_home_items` RENAME COLUMN `branch_id` TO `home_id`;
ALTER TABLE `d_facility_daily_home_items` MODIFY `home_id` INT UNSIGNED NOT NULL COMMENT 'ホームID';

ALTER TABLE `d_facility_daily_home_items`
ADD CONSTRAINT `unique_home_id_yyyymmdd_name_deleted_at`
UNIQUE (`home_id`, `yyyymmdd`, `name`, `deleted_at`);