CREATE TABLE IF NOT EXISTS `sessions` (
    `primary_id` CHAR(36) NOT NULL COMMENT 'ID',
    `session_id` CHAR(36) NOT NULL COMMENT 'セッションID',
    `creation_time` BIGINT NOT NULL COMMENT '作成日時',
    `last_access_time` BIGINT NOT NULL COMMENT '最新アクセス日時',
    `max_inactive_interval` INT NOT NULL COMMENT '非アクティブ時間',
    `expiry_time` BIGINT NOT NULL COMMENT 'セッション有効期限',
    `principal_name` VARCHAR(100) NULL DEFAULT NULL,
    PRIMARY KEY (`primary_id`),
    UNIQUE INDEX `SPRING_SESSION_IX1` (`session_id` ASC) VISIBLE,
    UNIQUE INDEX `SPRING_SESSION_IX2` (`primary_id` ASC) VISIBLE,
    INDEX `SPRING_SESSION_IX3` (`expiry_time` ASC) VISIBLE,
    INDEX `SPRING_SESSION_IX4` (`principal_name` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `session_attributes` (
    `session_primary_id` CHAR(36) NOT NULL COMMENT 'セッションPK',
    `attribute_name` VARCHAR(200) NOT NULL COMMENT '属性名',
    `attribute_bytes` LONGBLOB NOT NULL COMMENT '属性値',
    PRIMARY KEY (`attribute_name`, `session_primary_id`),
    INDEX `SPRING_SESSION_IX` (`session_primary_id` ASC) VISIBLE
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;




