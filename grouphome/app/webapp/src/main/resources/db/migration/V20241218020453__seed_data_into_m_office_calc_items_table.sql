-- Migration script: V20241218020453__seed_data_into_m_office_calc_items_table.sql

INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (1, null, "共同生活援助サービス費",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "あり", "readonly": false}',
        null, '', "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (2, 2, "日中サービス支援型共同生活援助サービス費",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "あり", "readonly": false}',
        null, '', "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (3, 3, "外部サービス利用型共同生活援助サービス費",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "あり", "readonly": false}',
        null, '', "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (4, null, "退居後共同生活援助サービス費",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "あり", "readonly": false}',
        null, '', "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (5, 3, "退居後外部サービス利用型共同生活援助サービス費",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "あり", "readonly": false}',
        null, '', "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (6, 3, "受託居宅介護サービス費",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "あり", "readonly": false}',
        null, '', "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (7, null, "人員配置体制加算",
        '{"items": ["I", "II", "III", "IV"], "type": "radio", "readonly": false}',
        '[
           {"targets": [{"items": ["I", "II", "III", "IV"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (8, 2, "人員配置体制加算",
        '{"items": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"], "type": "radio", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (9, 3, "人員配置体制加算",
        '{"items": ["I", "II", "III", "IV", "XIII", "XIV"], "type": "radio", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II", "III", "IV", "XIII", "XIV"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (10, null, "福祉専門職員配置等加算",
        '{"items": ["I", "II", "III"], "type": "radio", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II", "III"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (11, null, "視覚・聴覚言語障害者支援体制加算",
        '{"items": ["I", "II"], "type": "check", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (12, null, "看護職員配置体制加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (13, null, "高次脳機能障害者支援体制加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (14, null, "ピアサポート実施加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (15, null, "退居後ピアサポート実施加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}],
            "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (16, null, "夜間支援等体制加算",
        '{"items": ["I", "II", "III", "IV", "V", "VI"], "type": "check", "readonly": false}',
        '[
            {"targets": [{"items": ["I"]}], "action": {"unvisible": {"selected": false, "items": ["IV", "V", "VI"], "value": false}}},
            {"targets": [{"items": ["I", "II", "III", "IV", "V", "VI"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (17, 2, "夜勤職員加配加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (18, null, "重度障害者支援加算",
        '{"items": ["I", "II"], "type": "radio", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (19, null, "医療的ケア対応支援加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"parent": "18", "items": ["I"]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}},
            {"targets": [{"items": ["あり"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (20, null, "日中支援加算",
        '{"items": ["I", "II"], "type": "check", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (21, null, "集中的支援加算",
        '{"items": ["I", "II"], "type": "check", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (22, null, "自立生活支援加算",
        '{"items": ["I", "II", "III"], "type": "check", "readonly": false}',
        '[
            {"targets": [{"items": ["III"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (23, null, "入院時支援特別加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        null, "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (24, null, "長期入院時支援特別加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"parent": "23", "items": ["あり"]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (25, null, "帰宅時支援加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        null, "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (26, null, "長期帰宅時支援加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        null, "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (27, null, "地域生活移行個別支援特別加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (28, null, "精神障害者地域移行特別加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"parent": "27", "items": ["あり"]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (29, null, "強度行動障害者地域移行特別加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"parent": "18", "items": ["あり"]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (30, null, "強度行動障害者体験利用加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"parent": "18", "items": ["あり"]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (31, null, "医療連携体制加算",
        '{"items": ["I", "II", "III", "IV", "V", "VI", "VII"], "type": "check", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II", "III"]}], "action": {"unvisible": {"selected": true, "items": ["IV"], "value": false}}},
            {"targets": [{"parent": "12", "items": ["なし"]}, {"parent": "19", "items": ["なし"]}], "action": {"available": {"items": "V", "value": false}}},
            {"targets": [{"parent": "19", "items": ["なし"]}, {"items": ["I", "II", "III", "IV"]}], "action": {"available": {"items": "VI", "value": false}}},
            {"targets": [{"items": ["VII"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (32, null, "通勤者生活支援加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (33, null, "障害者支援施設等感染対策向上加算",
        '{"items": ["I", "II"], "type": "check", "readonly": false}',
        '[
            {"targets": [{"items": ["I", "II"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (34, null, "新興感染症等施設療養加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        null, "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");
INSERT INTO `m_office_calc_items`(`id`, `group_home_type_id`, `name`, `choices`, `depends`, `type`, `created_at`, `updated_at`)
    VALUES (35, null, "福祉・介護職員等処遇改善加算",
        '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}',
        '[
            {"targets": [{"items": ["あり"]}], "action": {"required": {"notification": true}}}
        ]', "add", "2024-12-18 09:41:39", "2024-12-18 09:41:39");

