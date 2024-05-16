-- Active: 1701080853999@@127.0.0.1@3306@snap_my_money
CREATE DATABASE IF NOT EXISTS snap_my_money

USE snap_my_money;

/* TABLE user */

CREATE TABLE user (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    balance DECIMAL DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO
    user (name, balance)
VALUES ("Daniel", 1000),
    ("Marcos", 800),
    ("Alejandro", 2000),
    ("Noah", 3000);

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

/* TABLE transaction_subcategory */

CREATE TABLE transaction_subcategory (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    user_id INT(11) DEFAULT NULL,
    transaction_category_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (transaction_category_id) REFERENCES transaction_category (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO
    transaction_subcategory (
        name,
        user_id,
        transaction_category_id
    )
VALUES ('Bar, restaurante', NULL, 1),
    ('Comida rápida', NULL, 1),
    ('Supermercados', NULL, 1),
    ('Larga distancia', NULL, 2),
    ('Taxi', NULL, 2),
    ('Transporte público', NULL, 2),
    ('Alquiler', NULL, 3),
    ('Hipoteca', NULL, 3),
    (
        'Gastos generales de vivienda',
        NULL,
        3
    ),
    ('Compra', NULL, 4),
    ('Reparaciones', NULL, 4),
    ('Combustible', NULL, 4),
    ('Entretenimiento', NULL, 5),
    ('Salidas', NULL, 5),
    ('Cine', NULL, 5),
    ('Deportes', NULL, 5),
    ('Teléfono', NULL, 6),
    ('Internet', NULL, 6),
    ('Televisión', NULL, 6),
    ('Hardware', NULL, 7),
    ('Software', NULL, 7),
    ('Accesorios', NULL, 7),
    ('Acciones', NULL, 8),
    ('Fondos mutuos', NULL, 8),
    ('Criptomonedas', NULL, 8),
    ('Ropa', NULL, 9),
    ('Electrodomésticos', NULL, 9),
    ('Otros', NULL, 9);

/* TABLE transaction */

CREATE TABLE transaction (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    user_id INT(11) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type_id INT(11) NULL,
    transaction_category_id INT(11) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (transaction_type_id) REFERENCES transaction_type (id),
    FOREIGN KEY (transaction_category_id) REFERENCES transaction_category (id)
);

/* TABLE goal_category */

CREATE TABLE goal_category (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    user_id INT(11) DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
);

INSERT INTO
    goal_category (name, user_id)
VALUES ('Viajes', NULL),
    ('Vehículos', NULL),
    ('Educación', NULL),
    ('Fondos de emergencia', NULL),
    ('Inmuebles', NULL),
    ('Otros', NULL);

  CREATE TABLE goal (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    user_id INT(11) DEFAULT NULL,
    goal_category_id INT(11) DEFAULT NULL,
    current_amount DECIMAL(10,2),
    target_amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (goal_category_id) REFERENCES goal_category (id)
  );