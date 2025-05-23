-- Migration script: V20241202022108__seed_data_fix_m_blc_item_table.sql

delete from m_blc_item where id between 267 and 299;

INSERT INTO `m_blc_item`(`id`, `item_type_id`, `type_id`, `name`, `sort`) 
VALUES  (267, 43, 1, '本入居', 1),
        (268, 43, 2, '体験（無料）', 2),
        (269, 43, 3, '体験（有料）', 3),
        (270, 43, 4, 'SS', 4),
        (271, 43, 5, '体験（受給者証）', 5),
        (272, 43, 6, '退去', 6),
        (273, 43, 7, 'キャンセル', 7),

        (274, 44, 1, '社保', 1),
        (275, 44, 2, '国保', 2),
        (276, 44, 3, '後期高齢者', 3),
        (277, 44, 4, 'なし（生保）', 4),

        (278, 45, 1, '利用中', 1),
        (279, 45, 2, '利用終了', 2),
        (280, 45, 3, '利用中断', 3),

        (281, 46, 1, '1回／週', 1),
        (282, 46, 2, '2回／週', 2),
        (283, 46, 3, '3回／週', 3),
        (284, 46, 4, '4回／週', 4),
        (285, 46, 5, '5回／週', 5),
        (286, 46, 6, '1回／月', 6),
        (287, 46, 7, '2回／月', 7),
        (288, 46, 8, '3回／月', 8),

        (289, 47, 1, '要支援1', 1),
        (290, 47, 2, '要支援2', 2),
        (291, 47, 3, '要介護1', 3),
        (292, 47, 4, '要介護2', 4),
        (293, 47, 5, '要介護3', 5),
        (294, 47, 6, '要介護4', 6),
        (295, 47, 7, '要介護5', 7),

        (296, 48, 1, '個人', 1),
        (297, 48, 2, '入居時推薦', 2),

        (298, 49, 1, '継続', 1),
        (299, 49, 2, '変更', 2);