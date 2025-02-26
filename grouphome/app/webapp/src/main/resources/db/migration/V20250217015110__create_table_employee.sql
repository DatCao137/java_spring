CREATE TABLE IF NOT EXISTS `e_employee` (
    `id` INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT,
    `name` VARCHAR(255) COMMENT "ten",
    `birth_day` DATETIME COMMENT "ngay sinh",
    `address` VARCHAR(500) COMMENT "dia chi",
    `message` TEXT COMMENT "ghi chu",
     `unit_id` INT UNSIGNED COMMENT "xuong san xuat",
    `created_at` DATETIME NOT NULL COMMENT "作成日",
    `updated_at` DATETIME NOT NULL COMMENT "更新日",
    `deleted_at` DATETIME DEFAULT NULL COMMENT "削除日",
    PRIMARY KEY (`id`)
)

ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci
COMMENT = 'quan ly nguoi lam';