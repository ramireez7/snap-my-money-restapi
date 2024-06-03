-- Active: 1701080853999@@127.0.0.1@3306@snap_my_money
CREATE DATABASE IF NOT EXISTS snap_my_money

USE snap_my_money;

/* TABLE user */

CREATE TABLE user (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    balance DECIMAL(10,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

INSERT INTO
    user (name, email, password, avatar, balance)
VALUES ('Daniel', 'daniel.ramirez.tomas@gmail.com', '$2a$10$4FfIY0G3Oj.4nuzmoV3YZeszW2dTli5cdd/Wd1QUbU5T1cp142QMm', NULL, NULL),
    ('Marcos', 'marcos@gmail.com', '$2a$10$9jJcSslPBfPWEXGG8Vw/7.vE9kZK/hStMokSmMNCzKId.bttGzFFS', NULL, NULL),
    ('Noah', 'noah@gmail.com', '$2a$10$pM2.GuQ/qfXNauXVHm6BFed5xe8.oyD8Tn3Ah01bHLwQTTFWdFmMq', NULL, NULL),
    ('Alejandro', 'alejandro@gmail.com', '$2a$10$qXeFCtfvo1tPsGIbULn52.eW6.gg16ABN.Uhviy7N4j46KbcNRgEW', NULL, NULL);
    

/* TABLE transaction_type */
CREATE TABLE transaction_type (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO
    transaction_type
VALUES (1, "Gasto"),
    (2, "Ingreso");

/* TABLE transaction_category */

CREATE TABLE transaction_category (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    user_id INT(11) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO
    transaction_category (name, user_id)
VALUES ('Comida y bebida', NULL),
    ('Transporte', NULL),
    ('Vivienda', NULL),
    ('Vehículos', NULL),
    (
        'Vida y entretenimiento',
        NULL
    ),
    ('Comunicaciones', NULL),
    ('PC', NULL),
    ('Inversiones', NULL),
    ('Compras', NULL);

/* TABLE transaction */

CREATE TABLE transaction (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT(11) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type_id INT(11) NOT NULL,
    transaction_category_id INT(11) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (transaction_type_id) REFERENCES transaction_type (id),
    FOREIGN KEY (transaction_category_id) REFERENCES transaction_category (id)
);

/* TABLE target_category */

CREATE TABLE target_category (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    user_id INT(11) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO
    target_category (name, user_id)
VALUES ('Viajes', NULL),
    ('Vehículos', NULL),
    ('Educación', NULL),
    ('Fondos de emergencia', NULL),
    ('Inmuebles', NULL),
    ('Otros', NULL);

  CREATE TABLE target (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT(11) NOT NULL,
    target_category_id INT(11) DEFAULT NULL,
    current_amount DECIMAL(10,2),
    target_amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (target_category_id) REFERENCES target_category (id)
  );