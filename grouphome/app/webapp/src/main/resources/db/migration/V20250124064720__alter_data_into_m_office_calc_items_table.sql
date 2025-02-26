-- Migration script: V20250124064720__alter_data_into_m_office_calc_items_table.sql

UPDATE `m_office_calc_items`
SET `depends` = null
WHERE `id` in (20, 21);

UPDATE `m_office_calc_items`
SET `depends` = '[
  {"targets": [{"parent": "27", "items": [ "あり" ]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}},
  {"targets": [{"items": [ "あり" ]}], "action": {"required": {"notification" : true}}}
]'
WHERE `id` = 28;

UPDATE `m_office_calc_items`
SET `depends` = '[
  {"targets": [{"parent": "18", "items": [ "I", "II" ]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}},
  {"targets": [{"items": [ "あり" ]}], "action": {"required": {"notification" : true}}}
]'
WHERE `id` = 29;

UPDATE `m_office_calc_items`
SET `depends` = '[
  {"targets": [{"parent": "18", "items": [ "I", "II" ]}], "action": {"unvisible": {"selected": true, "items": "this", "value": "なし"}}},
  {"targets": [{"items": [ "あり" ]}], "action": {"required": {"notification" : true}}}
]'
WHERE `id` = 30;