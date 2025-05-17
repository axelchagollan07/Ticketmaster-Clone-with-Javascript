CREATE DATABASE IF NOT EXISTS ticketmaster;

USE ticketmaster;

-- Eliminar tablas si ya existen (orden importa por las relaciones)
DROP TABLE IF EXISTS boletos;
DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS usuarios;

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Tabla de compras
CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    evento VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    metodo_pago VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de boletos asociados a una compra
CREATE TABLE boletos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT NOT NULL,
    codigo VARCHAR(50) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE
);
