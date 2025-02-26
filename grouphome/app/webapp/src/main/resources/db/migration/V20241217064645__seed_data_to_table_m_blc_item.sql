-- Migration script: V20241217064645__seed_data_to_table_m_blc_item.sql

INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (52, 1, '策定済み', 1);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (52, 2, '未了', 2);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 1, '電話（本社）', 1);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 2, '電話（職員携帯）', 2);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 3, '電話（現場携帯）', 3);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 4, 'メールフォーム', 4);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 5, '公式LINE', 5);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 6, 'soudan@メール', 6);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 7, '申込書（FAX）', 7);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 8, '直接訪問', 8);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (53, 9, 'その他', 9);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (54, 1, '1回目フォロー(目安 1週間後)', 1);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (54, 2, '2回目フォロー(目安 2週間後)', 2);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (54, 3, '3回目フォロー(目安 1か月後)', 3);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (54, 4, '4回目フォロー(目安 1か月半後)', 4);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (54, 5, '5回目フォロー(2か月後)', 5);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (55, 1, 'STEP1 相談概要、本人状況等', 1);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (55, 2, 'STEP2 GH体制について確認したいポイント、要望、ニーズ', 2);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (55, 3, 'STEP3 見学感触、体験に向けて', 3);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (55, 4, 'STEP4 体験入居感触、本入居に向けて', 4);
INSERT INTO `m_blc_item` (`item_type_id`, `type_id`, `name`, `sort`) VALUES (55, 5, 'STEP5 本入居、契約に向けて', 5);