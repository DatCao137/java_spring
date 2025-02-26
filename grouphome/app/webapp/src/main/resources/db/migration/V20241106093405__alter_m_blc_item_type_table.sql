INSERT INTO m_blc_item_type (id, name, remark)
VALUES (29, 'hr_occupation', '職種'),
       (30, 'hr_employee_type', '雇用形態')
ON DUPLICATE KEY UPDATE name   = VALUES(name),
                        remark = VALUES(remark);