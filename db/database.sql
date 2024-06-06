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
        balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
        PRIMARY KEY (id)
    );

    INSERT INTO
        user (name, email, password, avatar)
    VALUES (
            'Daniel',
            'daniel.ramirez.tomas@gmail.com',
            '$2a$10$4FfIY0G3Oj.4nuzmoV3YZeszW2dTli5cdd/Wd1QUbU5T1cp142QMm',
            NULL
        ),
        (
            'Marcos',
            'marcos@gmail.com',
            '$2a$10$9jJcSslPBfPWEXGG8Vw/7.vE9kZK/hStMokSmMNCzKId.bttGzFFS',
            NULL
        ),
        (
            'Noah',
            'noah@gmail.com',
            '$2a$10$pM2.GuQ/qfXNauXVHm6BFed5xe8.oyD8Tn3Ah01bHLwQTTFWdFmMq',
            NULL
        ),
        (
            'Alejandro',
            'alejandro@gmail.com',
            '$2a$10$qXeFCtfvo1tPsGIbULn52.eW6.gg16ABN.Uhviy7N4j46KbcNRgEW',
            NULL
        );
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
        ('Vida y entretenimiento',NULL),
        ('Comunicaciones', NULL),
        ('PC', NULL),
        ('Inversiones', NULL),
        ('Compras', NULL),
        ('Salario', NULL),
        ('Alquiler', NULL),
        ('Alimentación', NULL),
        ('Transporte', NULL),
        ('Entretenimiento', NULL),
        ('Educación', NULL),
        ('Salud', NULL),
        ('Impuestos', NULL),
        ('Seguros', NULL),
        ('Ahorros', NULL),
        ('Inversiones', NULL),
        ('Regalos', NULL),
        ('Ropa', NULL),
        ('Hogar', NULL),
        ('Tecnología', NULL),
        ('Viajes', NULL),
        ('Comunicaciones', NULL),
        ('Servicios públicos', NULL),
        ('Mascotas', NULL),
        ('Cuidado personal', NULL);

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

    -- Insertar más transacciones para el usuario Daniel
    INSERT INTO transaction (name, user_id, amount, transaction_type_id, transaction_category_id)
    VALUES ('Compra en el supermercado', 1, 50.00, 1, 1),
        ('Ingreso salario', 1, 2000.00, 2, NULL),
        ('Cena en restaurante', 1, 80.00, 1, 5),
        ('Compra de libros', 1, 30.00, 1, 16);

    -- Insertar más transacciones para el usuario Marcos
    INSERT INTO transaction (name, user_id, amount, transaction_type_id, transaction_category_id)
    VALUES ('Compra de gasolina', 2, 40.00, 1, 2),
        ('Pago del alquiler', 2, 1200.00, 1, 9),
        ('Venta de libros usados', 2, 50.00, 2, NULL),
        ('Cena con amigos', 2, 100.00, 1, 5);

    -- Insertar más transacciones para el usuario Noah
    INSERT INTO transaction (name, user_id, amount, transaction_type_id, transaction_category_id)
    VALUES ('Pago de transporte público', 3, 20.00, 1, 2),
        ('Ingreso por freelance', 3, 500.00, 2, NULL),
        ('Compra de medicamentos', 3, 40.00, 1, 7),
        ('Pago de seguro de salud', 3, 150.00, 1, 19);

    -- Insertar más transacciones para el usuario Alejandro
    INSERT INTO transaction (name, user_id, amount, transaction_type_id, transaction_category_id)
    VALUES ('Compra de muebles', 4, 300.00, 1, 11),
        ('Ingreso por venta de artículo', 4, 100.00, 2, NULL),
        ('Pago del servicio de internet', 4, 50.00, 1, 21),
        ('Compra de ropa', 4, 80.00, 1, 17);

    -- Actualizar el balance en la tabla user para cada usuario
    UPDATE user AS u
    SET balance = (
        SELECT COALESCE(SUM(CASE WHEN t.transaction_type_id = 2 THEN t.amount ELSE -t.amount END), 0)
        FROM transaction AS t
        WHERE t.user_id = u.id
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
        ('Ahorro para la jubilación', NULL),
        ('Hogar y decoración', NULL),
        ('Tecnología', NULL),
        ('Salud y bienestar', NULL),
        ('Entretenimiento', NULL),
        ('Eventos y celebraciones', NULL),
        ('Ropa y accesorios', NULL),
        ('Mascotas', NULL),
        ('Deportes y actividades recreativas', NULL),
        ('Vacaciones y escapadas', NULL),
        ('Otros', NULL);

    CREATE TABLE target (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        user_id INT(11) NOT NULL,
        target_category_id INT(11) DEFAULT NULL,
        current_amount DECIMAL(10, 2) DEFAULT 0,
        target_amount DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (target_category_id) REFERENCES target_category (id)
    );

-- Insertar más objetivos para el usuario Daniel
INSERT INTO target (name, user_id, target_category_id, current_amount, target_amount)
VALUES 
    ('Nuevo ordenador portátil', 1, 8, 200.00, 1200.00),
    ('Curso de cocina', 1, 3, 0.00, 500.00),
    ('Fondo para emergencias médicas', 1, 4, 500.00, 3000.00);

-- Insertar más objetivos para el usuario Marcos
INSERT INTO target (name, user_id, target_category_id, current_amount, target_amount)
VALUES 
    ('Muebles para el nuevo apartamento', 2, 7, 300.00, 2000.00),
    ('Viaje a París', 2, 15, 0.00, 1500.00),
    ('Inversión en acciones', 2, 10, 1000.00, 5000.00);

-- Insertar más objetivos para el usuario Noah
INSERT INTO target (name, user_id, target_category_id, current_amount, target_amount)
VALUES 
    ('Curso de idiomas', 3, 3, 200.00, 600.00),
    ('Ahorro para el primer coche', 3, 2, 3000.00, 8000.00),
    ('Fondo para viaje alrededor del mundo', 3, 1, 0.00, 10000.00);

-- Insertar más objetivos para el usuario Alejandro
INSERT INTO target (name, user_id, target_category_id, current_amount, target_amount)
VALUES 
    ('Electrodomésticos para la cocina', 4, 7, 100.00, 800.00),
    ('Inversión en criptomonedas', 4, 10, 500.00, 2000.00),
    ('Curso de fotografía', 4, 3, 0.00, 400.00);