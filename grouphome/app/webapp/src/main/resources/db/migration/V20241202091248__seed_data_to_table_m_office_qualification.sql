INSERT INTO `m_office_qualification` (`id`, `type`, `name`, `limit`)
    VALUES (58, 'etc', 'その他', '{"period": false, "rangeYear": null}') AS new
ON DUPLICATE KEY UPDATE
                     `type` = new.`type`,
                     `name` = new.`name`,
                     `limit` = new.`limit`;