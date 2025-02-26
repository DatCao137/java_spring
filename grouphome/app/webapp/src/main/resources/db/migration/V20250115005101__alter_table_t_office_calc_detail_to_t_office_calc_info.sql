-- Migration script: V20250115005101__alter_table_t_office_calc_detail_to_t_office_calc_info.sql

ALTER TABLE `t_office_calc_details` RENAME TO `t_office_calc_info`;
ALTER TABLE `t_office_calc_info` DROP INDEX `idx_calc_id`;

ALTER TABLE `t_office_calc_info` RENAME COLUMN `calc_id` TO `branch_id`;
ALTER TABLE `t_office_calc_info` MODIFY `branch_id` INT UNSIGNED NOT NULL COMMENT '事業所ID';

ALTER TABLE `t_office_calc_info` ADD INDEX idx_branch_id (branch_id);

ALTER TABLE `t_office_calc_info`
ADD CONSTRAINT `unique_branch_id_calc_items_id_deleted_at`
UNIQUE (`branch_id`, `calc_items_id`, `deleted_at`);