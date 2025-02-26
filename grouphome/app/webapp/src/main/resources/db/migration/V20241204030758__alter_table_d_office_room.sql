-- Migration script: V20241204030758__alter_table_d_office_room.sql
ALTER TABLE `d_office_room`
DROP INDEX `unit_id`;

ALTER TABLE `d_office_room`
ADD UNIQUE (`unit_id`, `name`, `deleted_at`);
