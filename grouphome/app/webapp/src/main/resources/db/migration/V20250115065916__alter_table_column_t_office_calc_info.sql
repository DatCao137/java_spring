-- Migration script: V20250115065916__alter_table_column_t_office_calc_info.sql

ALTER TABLE `t_office_calc_info` MODIFY `start_date` DATE DEFAULT NULL COMMENT '届出日';
ALTER TABLE `t_office_calc_info` MODIFY `value` JSON DEFAULT NULL COMMENT '値';