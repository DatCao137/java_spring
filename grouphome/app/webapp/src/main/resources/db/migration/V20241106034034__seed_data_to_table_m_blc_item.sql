-- Migration script: V20241106034034__seed_data_to_table_m_blc_item.sql

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (43, 1, '本入居', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (43, 2, '体験（無料）', 2);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (43, 3, '体験（有料）', 3);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (43, 4, 'SS', 4);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (43, 5, '体験（受給者証）', 5);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (43, 6, '退去', 6);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (43, 7, 'キャンセル', 7);

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (44, 1, '社保', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (44, 2, '国保', 2);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (44, 3, '後期高齢者', 3);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (44, 4, 'なし（生保）', 4);

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (45, 1, '利用中', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (45, 2, '利用終了', 2);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (45, 3, '利用中断', 3);

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 1, '1回／週', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 2, '2回／週', 2);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 3, '3回／週', 3);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 4, '4回／週', 4);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 5, '5回／週', 5);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 6, '1回／月', 6);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 7, '2回／月', 7);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (46, 8, '3回／月', 8);

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (47, 1, '要支援1', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (47, 2, '要支援2', 2);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (47, 3, '要介護1', 3);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (47, 4, '要介護2', 4);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (47, 5, '要介護3', 5);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (47, 6, '要介護4', 6);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (47, 7, '要介護5', 7);

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (48, 1, '個人', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (48, 2, '入居時推薦', 2);

INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (49, 1, '継続', 1);
INSERT INTO `m_blc_item`(`item_type_id`, `type_id`, `name`, `sort`) VALUES (49, 2, '変更', 2);