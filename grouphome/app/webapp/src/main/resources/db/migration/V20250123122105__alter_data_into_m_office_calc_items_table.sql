-- Migration script: V20250123122105__alter_data_into_m_office_calc_items_table.sql

UPDATE `m_office_calc_items`
SET `choices` = '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}'
WHERE `id` = 4;

UPDATE `m_office_calc_items`
SET `choices` = '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}'
WHERE `id` = 5;

UPDATE `m_office_calc_items`
SET `choices` = '{"items": ["あり", "なし"], "type": "radio", "selected": "なし", "readonly": false}'
WHERE `id` = 6;