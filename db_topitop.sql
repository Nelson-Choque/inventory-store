create database topitop;

use topitop;

drop table almacen_producto;
drop table detalle_pedido;
drop table trabajador;
drop table pedido;
drop table cliente;
drop table usuario;
drop table persona;
drop table stock;
drop table almacen;
drop table producto;





create table producto(


  cod_producto char(5) primary key,
  nombre VARCHAR(50),
  descripcion VARCHAR(100),
  precio decimal(8,2)


);

create table persona(

	cod_persona char(5) primary key,
    nombre varchar(50),
    apellidos varchar(100),
    dni char(8) unique null,
	direccion varchar(100) null,
    telefono int null,
    email varchar(50) null,
	sexo varchar(50) null,
	fecha_de_nacimiento varchar(50)
);

create table usuario(

	cod_usuario char(5) primary key,
    username varchar(50) NOT NULL unique,
    password varchar(255) NOT NULL,
    role varchar(50) NOT NULL,
	cod_persona char(5),
    CONSTRAINT fk_usuario_persona FOREIGN KEY (cod_persona) REFERENCES persona(cod_persona)

);

create table almacen(

	cod_almacen char(5) primary key,
    nombre varchar(50),
    direccion varchar(100)
    

);

create table trabajador (
    cod_trabajador char(5) PRIMARY KEY,
    especialidad varchar(50),
    sueldo decimal(10, 2),
    cod_persona char(5),
	cod_almacen char(5),
        
    CONSTRAINT fk_trabajador_persona FOREIGN KEY (cod_persona) REFERENCES persona(cod_persona),
	CONSTRAINT fk_trabajador_almacen FOREIGN KEY (cod_almacen) REFERENCES almacen(cod_almacen)
);

create table cliente(

	cod_cliente char(5) primary key,
    cod_persona char(5),
    estado bit,
    constraint fk_cliente_persona foreign key(cod_persona) references persona(cod_persona)

);

create table pedido(

	cod_pedido char(5) primary key,
    fecha_pedido datetime,
	cod_cliente char(5),    
	constraint fk_pedido_cliente foreign key(cod_cliente) references cliente(cod_cliente)

);

create table detalle_pedido(

	cod_detalle_pedido char(5) primary key,
	cantidad int,
    precio_unitario decimal(10,2),
	cod_pedido char(5),
    cod_producto char(5),
    
	constraint fk_detalle_pedido_pedido foreign key(cod_pedido) references pedido(cod_pedido),
    constraint fk_detalle_pedido_producto foreign key(cod_producto) references producto(cod_producto)
);



create table almacen_producto(

	cod_almacen_producto char(5) primary key,
    stock int,
    cod_almacen char(5),
	cod_producto char(5),
	
    constraint fk_almacen_producto_producto foreign key(cod_producto) references producto(cod_producto),
    constraint fk_almacen_producto_almacen foreign key(cod_almacen) references almacen(cod_almacen)

);

create table stock(

	cod_stock char(5) primary key,
    cantidad_maxima int,
	cantidad_minima int,
    
    cod_almacen char(5),
    
    constraint fk_stock_almacen foreign key(cod_almacen) references almacen(cod_almacen)

);




DELIMITER //

CREATE FUNCTION generar_codigo(letter_code char(2),code_default char(5)) RETURNS CHAR(6) DETERMINISTIC
BEGIN
  DECLARE nuevo_codigo CHAR(6);
  
IF letter_code = 'P' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_producto, 2)) + 1, 4, '0')), code_default)
      FROM producto
    );
  ELSEIF letter_code = 'C' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_cliente, 2)) + 1, 4, '0')), code_default)
      FROM cliente
    );
  ELSEIF letter_code = 'U' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_usuario, 2)) + 1, 4, '0')), code_default)
      FROM usuario
    );    
  ELSEIF letter_code = 'A' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_almacen, 2)) + 1, 4, '0')), code_default)
      FROM almacen
    );        
  ELSEIF letter_code = 'AP' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_almacen_producto, 3)) + 1, 3, '0')), code_default)
      FROM almacen_producto
    );        
 ELSEIF letter_code = 'DP' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_detalle_pedido, 3)) + 1, 3, '0')), code_default)
      FROM detalle_pedido
    );            
    
 ELSEIF letter_code = 'PE' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_pedido, 3)) + 1, 3, '0')), code_default)
      FROM pedido
    );      
    
 ELSEIF letter_code = 'PS' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_persona, 3)) + 1, 3, '0')), code_default)
      FROM persona
    );         
    
 ELSEIF letter_code = 'S' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_stock, 2)) + 1, 4, '0')), code_default)
      FROM stock
    );         
    
 ELSEIF letter_code = 'T' THEN
    SET nuevo_codigo = (
      SELECT COALESCE(CONCAT(letter_code, LPAD(MAX(SUBSTRING(cod_trabajador, 2)) + 1, 4, '0')), code_default)
      FROM trabajador
    );       
  -- Agregar más condiciones para otras tablas si es necesario

    -- Código para manejar algún caso no contemplado
    
  END IF;
  RETURN nuevo_codigo;
END//

DELIMITER ;


DELIMITER //
CREATE TRIGGER tr_autoincrement_codigo_usuario
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
  SET NEW.cod_usuario = generar_codigo('U','U0001');
END//
DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_producto
BEFORE INSERT ON producto
FOR EACH ROW
BEGIN
  SET NEW.cod_producto = generar_codigo('P','P0001');
END//


DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_almacen
BEFORE INSERT ON almacen
FOR EACH ROW
BEGIN
  SET NEW.cod_almacen = generar_codigo('A','A0001');
END//


DELIMITER ;


DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_almacen_producto
BEFORE INSERT ON almacen_producto
FOR EACH ROW
BEGIN
  SET NEW.cod_almacen_producto = generar_codigo('AP','AP001');
END//


DELIMITER ;


DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_detalle_pedido
BEFORE INSERT ON detalle_pedido
FOR EACH ROW
BEGIN
  SET NEW.cod_detalle_pedido= generar_codigo('DP','DP001');
END//


DELIMITER ;



DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_pedido
BEFORE INSERT ON pedido
FOR EACH ROW
BEGIN
  SET NEW.cod_pedido= generar_codigo('PE','PE001');
END//


DELIMITER ;


DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_persona
BEFORE INSERT ON persona
FOR EACH ROW
BEGIN
  SET NEW.cod_persona= generar_codigo('PS','PS001');
END//


DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_stock
BEFORE INSERT ON stock
FOR EACH ROW
BEGIN
  SET NEW.cod_stock= generar_codigo('S','S0001');
END//


DELIMITER ;

DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_trabajador
BEFORE INSERT ON trabajador
FOR EACH ROW
BEGIN
  SET NEW.cod_trabajador= generar_codigo('T','T0001');
END//

DELIMITER //

CREATE TRIGGER tr_autoincrement_codigo_cliente
BEFORE INSERT ON cliente
FOR EACH ROW
BEGIN
  SET NEW.cod_cliente= generar_codigo('C','C0001');
END//



DELIMITER ;

insert into usuario(username,password,role) values('yaki kchera','123','ADMIN');

insert into almacen values('a','almacen SMP','smp av faucett 123');
insert into almacen values('a','almacen SMP','smp av faucett 123');

insert into almacen(nombre,direccion) values('almacen SMP','smp av faucett 123');

INSERT INTO persona (nombre, apellidos, dni, direccion, telefono, email, sexo, fecha_de_nacimiento)
VALUES ('Juan', 'Perez', '12345678', 'Calle 123', 12345611, 'juan@example.com', 'Masculino', '1990-01-01');

INSERT INTO persona (nombre, apellidos, dni, direccion, telefono, email, sexo, fecha_de_nacimiento)
VALUES ('Juan', 'Perez', '12345678', 'Calle 123', 12345678, 'juan@example.com', 'Masculino', '1990-01-01');

INSERT INTO persona (nombre, apellidos, dni, direccion, telefono, email, sexo, fecha_de_nacimiento)
VALUES ('Juan', 'Perez', '12345622', 'Calle 123', 12345622, 'juan@example.com', 'Masculino', '1990-01-01');
delete from PERSONA where cod_persona = 'PS001';
select * from almacen;
select * from persona;
select * from cliente;


INSERT INTO trabajador (cod_trabajador, especialidad, sueldo, cod_persona, cod_usuario, cod_almacen)
VALUES ('T0001', 'Ventas', 2000.00, 'PS001', 'U0002', 'A0001');

select * from trabajador;

select * from producto;

insert into producto(nombre,descripcion) values( 'producto1', 'producto 12' );

insert into producto(nombre,descripcion) values( 'producto1', 'producto 122' );
