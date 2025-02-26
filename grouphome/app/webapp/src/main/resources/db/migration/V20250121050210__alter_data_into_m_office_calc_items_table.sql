-- Migration script: V20250121050210__alter_data_into_m_office_calc_items_table.sql

UPDATE `m_office_calc_items`
SET `choices` = '{"items": ["I", "II"], "type": "check", "readonly": false}'
WHERE `id` = 11;

UPDATE `m_office_calc_items`
SET `depends` = '[
    {"targets": [{"items": ["I", "II", "III"]}], "action": {"unvisible": {"selected": true, "items": ["IV"], "value": false}}},
    {"targets": [{"parent": "12", "items": ["なし"]}], "action": {"available": {"items": "V", "value": false}}},
    {"targets": [{"parent": "19", "items": ["なし"]}], "action": {"available": {"items": "V", "value": false}}},
    {"targets": [{"parent": "19", "items": ["なし"]}], "action": {"available": {"items": "VI", "value": false}}},
    {"targets": [{"items": ["I", "II", "III", "IV"]}], "action": {"available": {"items": "VI", "value": false}}},
    {"targets": [{"items": ["VII"]}], "action": {"required": {"notification": true}}}
]'
WHERE `id` = 31;