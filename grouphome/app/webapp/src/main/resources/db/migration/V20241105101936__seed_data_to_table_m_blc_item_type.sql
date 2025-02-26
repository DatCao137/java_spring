-- Migration script: V20241105101936__seed_data_to_table_m_blc_item_type.sql

INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES(43, 'cust_unit_status', '利用者入居状況');
INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES(44, 'insurance_type', '保険証種別');
INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES(45, 'cust_service_status', 'サービス利用ステータス');
INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES(46, 'cust_service_pace', 'サービス利用頻度');
INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES(47, 'care_type', '要介護区分');
INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES(48, 'personal_liability_type', '個人賠償責任加入保険');
INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES(49, 'continue_or_change', '継続是非');



