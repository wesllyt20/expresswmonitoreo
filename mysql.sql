create database wmonitoreo;
use wmonitoreo;
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO usuarios (username, password, nombre, email) VALUES
('usuario1', 'password1', 'Usuario 1', 'usuario1@example.com'),
('usuario2', 'password2', 'Usuario 2', 'usuario2@example.com'),
('usuario3', 'password3', 'Usuario 3', 'usuario3@example.com'),
('usuario4', 'password4', 'Usuario 4', 'usuario4@example.com'),
('usuario5', 'password5', 'Usuario 5', 'usuario5@example.com');
select * from usuarios;
