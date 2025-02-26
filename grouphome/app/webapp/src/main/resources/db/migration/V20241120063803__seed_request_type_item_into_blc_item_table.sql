-- Migration script: V20241120063803__add_request_type_item_into_blc_item_table.sql

INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES (50, 'appl_form_type', '申込書種類');
INSERT INTO `m_blc_item_type`(`id`, `name`, `remark`) VALUES (51, 'appl_form_item', '申込書項目');

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (50, 'visit', '見学・体験', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (50, 'movein', '入居', 2);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (51, 'visit', '見学', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (51, 'exp', '体験入居', 2);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (51, 'movein', '本入居', 3);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (51, 'exp-pay', '体験（有料）', 4);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (51, 'exp-free', '体験（無料）', 5);