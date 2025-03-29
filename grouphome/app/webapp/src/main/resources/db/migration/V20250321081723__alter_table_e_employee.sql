-- Migration script: V20250321081723__alter_table_e_employee.sql

-- Write your migration SQL here
ALTER TABLE e_employee
ADD image_employee LONGBLOB;
