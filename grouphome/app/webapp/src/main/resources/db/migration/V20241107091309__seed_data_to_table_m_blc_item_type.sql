INSERT INTO m_blc_item_type (id, name, remark)
VALUES (32, 'hr_enrollment_status', '在籍状況'),
       (33, 'hr_payment_form', '給与支給形態'),
       (34, 'hr_business_grade', '等級'),
       (35, 'hr_department', '部署'),
       (36, 'hr_position', '役職'),
       (37, 'hr_contract_type', '雇用契約種別'),
       (38, 'hr_contract_renewal_type', '契約更新の有無'),
       (39, 'hr_nationality', '国籍'),
       (40, 'hr_remaining_status', '在留資格'),
       (41, 'hr_remaining_class', '派遣・請負就労区分'),
       (42, 'hr_family_relationship', '続柄')
ON DUPLICATE KEY UPDATE name   = VALUES(name),
                        remark = VALUES(remark);