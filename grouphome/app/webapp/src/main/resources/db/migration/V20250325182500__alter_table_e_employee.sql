-- Migration script: V20250325182500__alter_table_e_employee.sql

-- Write your migration SQL here
ALTER TABLE e_employee
ADD file_name VARCHAR(255);
