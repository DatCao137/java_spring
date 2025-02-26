-- Migration script: V20241129070700__create_index_idx_range_to_t_office_room_manage.sql

CREATE INDEX idx_range ON t_office_room_manage (movein_at, leaving_at);