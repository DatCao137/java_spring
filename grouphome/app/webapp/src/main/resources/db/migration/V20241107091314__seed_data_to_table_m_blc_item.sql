INSERT INTO m_blc_item (id, item_type_id, type_id, name, sort)
VALUES (253, 32, '1', '在職中', 1),
       (254, 32, '2', '休職中', 2),
       (255, 32, '3', '退職済', 3),
       (256, 33, '1', '月給', 1),
       (257, 33, '2', '時給', 2),
       (258, 33, '3', '週給', 3),
       (259, 33, '4', '日給', 4),
       (260, 37, '1', '無期雇用', 1),
       (261, 37, '2', '有期雇用', 2),
       (262, 38, '1', '有', 1),
       (263, 38, '2', '有（自動更新）', 2),
       (264, 38, '3', '無', 3),
       (265, 41, '1', '派遣・請負労働者として主として当該事業所以外で就労する', 1),
       (266, 41, '2', 'その他', 2)
ON DUPLICATE KEY UPDATE item_type_id = VALUES(item_type_id),
                        type_id      = VALUES(type_id),
                        name         = VALUES(name),
                        sort         = VALUES(sort);