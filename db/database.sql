-- Active: 1701080853999@@127.0.0.1@3306@snap_my_money
CREATE DATABASE IF NOT EXISTS snap_my_money

USE snap_my_money;

CREATE TABLE user(
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) DEFAULT NULL,
  balance DECIMAL DEFAULT NULL,
  PRIMARY KEY (id)
);

INSERT INTO user VALUES
(1, "Daniel", 1000),
(2, "Marcos", 800),
(3, "Alejandro", 2000),
(4, "Noah", 3000);