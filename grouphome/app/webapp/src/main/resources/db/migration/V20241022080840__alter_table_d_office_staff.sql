-- Migration script: V20241022080840__alter_table_d_office_staff.sql

ALTER TABLE `d_office_staff`
    ADD COLUMN `employee_no` VARCHAR(8) NOT NULL COMMENT '社員番号',
    ADD COLUMN `name` VARCHAR(64) NOT NULL COMMENT '氏名',
    ADD COLUMN `occupation_id` TINYINT UNSIGNED DEFAULT NULL COMMENT '職種ID',
    ADD COLUMN `branch_id` INT UNSIGNED DEFAULT NULL COMMENT '事業所ID',
    ADD COLUMN `main_home_id` INT UNSIGNED DEFAULT NULL COMMENT 'ホームID(主)',
    ADD COLUMN `sub_home_id` INT UNSIGNED DEFAULT NULL COMMENT 'ホームID(副)',
    ADD COLUMN `employee_type` TINYINT UNSIGNED DEFAULT NULL COMMENT '雇用形態',
    ADD COLUMN `enrollment` JSON DEFAULT NULL COMMENT '在籍内容',
    ADD COLUMN `qualification` JSON DEFAULT NULL COMMENT '保有資格',
    ADD COLUMN `smart_hr_data` JSON DEFAULT NULL COMMENT 'SmartHR連携データ',
    ADD COLUMN `created_at` DATETIME NOT NULL COMMENT '作成日',
    ADD COLUMN `updated_at` DATETIME NOT NULL COMMENT '更新日',
    ADD COLUMN `deleted_at` DATETIME DEFAULT NULL COMMENT '削除日';
