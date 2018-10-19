-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-09-2018 a las 17:35:28
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `minibool`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE PROCEDURE `sp_actualizar_notificacion` (`usr` varchar(75), `pass` varchar(75), `notif` TEXT, `tip` varchar(75), `id_notificacion` INT)  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        UPDATE notificaciones SET notificacion = notif, tipo=tip, fecha = CURRENT_TIMESTAMP WHERE id=id_notificacion; 
        SELECT 1 AS Actualizada;
        ELSE
        SELECT 0 AS Actualizada;
        END IF;
    ELSE
        SELECT 0 AS Actualizada;
    END IF;
    END$$

CREATE PROCEDURE `sp_actualizar_ponderaciones` (IN `usr` varchar(75), IN `pass` varchar(75), IN `al_3` INT, IN `al_4` INT, IN `al_5` INT, IN `det_3` INT, IN `det_4` INT, IN `det_5` INT)  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        UPDATE ejercicios SET puntos = al_3 WHERE id_ejercicio=1;
        UPDATE ejercicios SET puntos = al_4 WHERE id_ejercicio=2;
        UPDATE ejercicios SET puntos = al_5 WHERE id_ejercicio=3;
        UPDATE ejercicios SET puntos = det_3 WHERE id_ejercicio=4;
        UPDATE ejercicios SET puntos = det_4 WHERE id_ejercicio=5;
        UPDATE ejercicios SET puntos = det_5 WHERE id_ejercicio=6;
        SELECT 1 AS Actualizado;
        ELSE
        SELECT 0 AS Actualizado;
        END IF;
    ELSE
        SELECT 0 AS Actualizado;
    END IF;
    END$$

CREATE PROCEDURE `sp_actualizar_usuario` (IN `usr` varchar(75), IN `pass` varchar(75), IN `idUsuario` INT, IN `n_usuario` varchar(75), IN `n_nombre` varchar(75), IN `ap_p` varchar(75), IN `ap_m` varchar(75), IN `n_correo` varchar(75), IN `n_contrasena` varchar(75), IN `n_pais` varchar(75), IN `is_adm` INT, IN `is_estudiate` INT, IN `n_escuela` varchar(75), IN `n_carrera` varchar(75), IN `n_semestre` varchar(75))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        	IF idUsuario = (SELECT id_usuario from usuarios WHERE usuario=usr) THEN
            UPDATE usuarios SET usuario=n_usuario, nombre=n_nombre, apellido_paterno=ap_p, apellido_materno=ap_m, correo=n_correo, contrasenia=AES_ENCRYPT(n_contrasena,'%your_password%'), pais=n_pais, estudiante=is_estudiate, escuela=n_escuela, carrera=n_carrera, semestre=n_semestre WHERE id_usuario=idUsuario;
            ELSE
            UPDATE usuarios SET usuario=n_usuario, nombre=n_nombre, apellido_paterno=ap_p, apellido_materno=ap_m, correo=n_correo, contrasenia=AES_ENCRYPT(n_contrasena,'%your_password%'), pais=n_pais, administrador=is_adm, estudiante=is_estudiate, escuela=n_escuela, carrera=n_carrera, semestre=n_semestre WHERE id_usuario=idUsuario;
            END IF;
            SELECT 1 AS Actualizado;
        ELSE
        SELECT 0 AS Actualizado;
        END IF;
    ELSE
        SELECT 0 AS Actualizado;
    END IF;
    END$$

CREATE PROCEDURE `sp_consultar_usuario` (IN `usr` varchar(75), IN `pass` varchar(75), IN `idUsuario` INT)  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        	SELECT usuario, nombre, apellido_paterno,  apellido_materno, correo, AES_DECRYPT(contrasenia,'%your_password%') AS contrasena, pais, administrador, estudiante, escuela, carrera, semestre from usuarios WHERE id_usuario=idUsuario; 
        ELSE
        SELECT 0 AS Consulta;
        END IF;
    ELSE
        SELECT 0 AS Consulta;
    END IF;
    END$$

CREATE PROCEDURE `sp_crear_notificacion` (`usr` varchar(75), `pass` varchar(75), `notif` TEXT, `tipo` varchar(75))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        INSERT INTO notificaciones (fecha, notificacion, tipo) VALUES (CURRENT_TIMESTAMP, notif, tipo);
        SELECT 1 AS Creado;
        ELSE
        SELECT 0 AS Creado;
        END IF;
    ELSE
        SELECT 0 AS Creado;
    END IF;
    END$$

CREATE PROCEDURE `sp_crear_usuario` (IN `usr` varchar(75), IN `nom` varchar(75), IN `ap_pat` varchar(75), IN `ap_mat` varchar(75), IN `corr` varchar(75), IN `pais_origen` varchar(75), IN `pass` varchar(75), IN `estud` INT, IN `escu` varchar(75), IN `carr` varchar(75), IN `sem` varchar(75), IN `adm` INT)  BEGIN
    IF EXISTS (SELECT * FROM usuarios WHERE usuario = usr) THEN
        SELECT 2 AS Creado;
    ELSE
    	IF estud = 1 THEN
        	INSERT INTO usuarios (usuario, nombre, apellido_paterno, apellido_materno, correo, pais, contrasenia, estudiante, escuela, carrera, semestre, administrador) VALUES(usr, nom, ap_pat, ap_mat, corr, pais_origen, AES_ENCRYPT(pass, '%your_password%'), estud, escu, carr, sem, adm);
        ELSE
        	INSERT INTO usuarios (usuario, nombre, apellido_paterno, apellido_materno, correo, pais, contrasenia, estudiante, administrador) VALUES(usr, nom, ap_pat, ap_mat, corr, pais_origen, AES_ENCRYPT(pass, '%your_password%'), estud, adm);
        END IF;
    	IF EXISTS (SELECT * FROM usuarios WHERE usuario = usr) THEN
    		SELECT 1 AS Creado;
    	ELSE
        	SELECT 0 AS Creado;
    	END IF;
	END IF;
END$$

CREATE PROCEDURE `sp_detalles_usuario` (IN `usr` varchar(75), IN `pass` varchar(75), IN `indice` INT(5))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE id Integer;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in THEN
        	SET id:= (SELECT id_usuario FROM usuarios WHERE usuario=usr);
        	IF indice = 1 THEN
            SELECT ultimo_ingreso FROM usuarios where usuario=usr;
            END IF;
            IF indice = 2 THEN
            SELECT count(*) as numero, E.variables, SUM(E.puntos) as total FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Deterministico" AND EU.correcto=1 AND EU.id_usuario=id GROUP BY E.variables;
            END IF;
            IF indice = 3 THEN
            SELECT count(*) as numero, E.variables FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Deterministico" AND EU.correcto=0 AND EU.id_usuario=id GROUP BY E.variables;
            END IF;
            IF indice = 4 THEN
            SELECT count(*) as numero, E.variables, SUM(E.puntos) as total FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Aleatorio" AND EU.correcto=1 AND EU.id_usuario=id GROUP BY E.variables;
            END IF;
            IF indice = 5 THEN
            SELECT count(*) as numero, E.variables FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Aleatorio" AND EU.correcto=0 AND EU.id_usuario=id GROUP BY E.variables;
            END IF;
        ELSE
        SELECT 0 AS Consulta;
        END IF;
    ELSE
        SELECT 0 AS Consulta;
    END IF;
    END$$

CREATE PROCEDURE `sp_detalles_usuario_adm` (IN `usr` varchar(75), IN `pass` varchar(75), IN `idUsr` INT(11), IN `indice` INT(5))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        	IF indice = 1 THEN
            SELECT ultimo_ingreso FROM usuarios where id_usuario=idUsr;
            END IF;
            IF indice = 2 THEN
            SELECT count(*) as numero, E.variables, SUM(E.puntos) as total FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Deterministico" AND EU.correcto=1 AND EU.id_usuario=idUsr GROUP BY E.variables;
            END IF;
            IF indice = 3 THEN
            SELECT count(*) as numero, E.variables FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Deterministico" AND EU.correcto=0 AND EU.id_usuario=idUsr GROUP BY E.variables;
            END IF;
            IF indice = 4 THEN
            SELECT count(*) as numero, E.variables, SUM(E.puntos) as total FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Aleatorio" AND EU.correcto=1 AND EU.id_usuario=idUsr GROUP BY E.variables;
            END IF;
            IF indice = 5 THEN
            SELECT count(*) as numero, E.variables FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Aleatorio" AND EU.correcto=0 AND EU.id_usuario=idUsr GROUP BY E.variables;
            END IF;
        ELSE
        SELECT 0 AS Consulta;
        END IF;
    ELSE
        SELECT 0 AS Consulta;
    END IF;
    END$$

CREATE PROCEDURE `sp_elimiar_notificacion` (`usr` varchar(75), `pass` varchar(75), `id_notificacion` INT)  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        DELETE from notificaciones WHERE id = id_notificacion;
        SELECT 1 AS Elimiada;
        ELSE
        SELECT 0 AS Elimiada;
        END IF;
    ELSE
        SELECT 0 AS Elimiada;
    END IF;
    END$$

CREATE PROCEDURE `sp_eliminar_todo` (IN `usr` varchar(75), IN `pass` varchar(75))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        	DELETE FROM ejercicio_usuario;
            DELETE FROM notificaciones;
            DELETE FROM usuarios WHERE usuario!=usr;
            SELECT 1 AS Eliminado;
        ELSE
        SELECT 0 AS Eliminado;
        END IF;
    ELSE
        SELECT 0 AS Eliminado;
    END IF;
    END$$

CREATE PROCEDURE `sp_eliminar_usuario` (IN `usr` varchar(75), IN `pass` varchar(75), IN `id_us` INT)  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    DECLARE id_admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        SET id_admin := (SELECT id_usuario FROM usuarios WHERE usuario=usr);
        IF pass_aux = pass_in AND admin=1 AND id_us!= id_admin THEN
        DELETE from usuarios WHERE id_usuario=id_us;
        SELECT 1 AS Eliminado;
        ELSE
        SELECT 0 AS Eliminado;
        END IF;
    ELSE
        SELECT 0 AS Eliminado;
    END IF;
    END$$

CREATE PROCEDURE `sp_estadisticas` (IN `usr` varchar(75), IN `pass` varchar(75), IN `ej_tipo` varchar(75), IN `ej_correcto` INT(1))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in THEN
            SELECT count(*), E.variables FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo=ej_tipo AND EU.correcto=ej_correcto GROUP BY E.variables; 
        ELSE
        SELECT 0 AS Error;
        END IF;
    ELSE
        SELECT 0 AS Error;
    END IF;
    END$$

CREATE PROCEDURE `sp_gestionar_usuario` (IN `usr` varchar(75), IN `pass` varchar(75))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in THEN
        	SELECT usuario, nombre, apellido_paterno,  apellido_materno, correo, AES_DECRYPT(contrasenia,'%your_password%') AS contrasena, pais, estudiante, escuela, carrera, semestre from usuarios WHERE usuario=usr; 
        ELSE
        SELECT 0 AS Consulta;
        END IF;
    ELSE
        SELECT 0 AS Consulta;
    END IF;
    END$$

CREATE PROCEDURE `sp_guardar_usuario` (IN `usr` varchar(75), IN `pass` varchar(75), IN `n_usuario` varchar(75), IN `n_nombre` varchar(75), IN `ap_p` varchar(75), IN `ap_m` varchar(75), IN `n_correo` varchar(75), IN `n_contrasena` varchar(75), IN `n_pais` varchar(75), IN `is_estudiate` INT(11), IN `n_escuela` varchar(75), IN `n_carrera` varchar(75), IN `n_semestre` varchar(75))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in THEN
            UPDATE usuarios SET usuario=n_usuario, nombre=n_nombre, apellido_paterno=ap_p, apellido_materno=ap_m, correo=n_correo, contrasenia=AES_ENCRYPT(n_contrasena,'%your_password%'), pais=n_pais, estudiante=is_estudiate, escuela=n_escuela, carrera=n_carrera, semestre=n_semestre WHERE usuario=usr;
            SELECT 1 AS Actualizado;
        ELSE
        SELECT 0 AS Actualizado;
        END IF;
    ELSE
        SELECT 0 AS Actualizado;
    END IF;
    END$$

CREATE PROCEDURE `sp_registrar_ejercicio` (IN `usr` varchar(75), IN `pass` varchar(75), IN `corr` INT(11), IN `ejer` INT(11))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in THEN
        SET aux:= (SELECT id_usuario FROM usuarios WHERE usuario=usr);
        INSERT INTO ejercicio_usuario (correcto, fecha, id_ejercicio, id_usuario) values (corr, CURRENT_TIMESTAMP, ejer, aux);
        SELECT 1 AS Registro;
        ELSE
        SELECT 0 AS Registro;
        END IF;
    ELSE
        SELECT 0 AS Registro;
    END IF;
END$$

CREATE PROCEDURE `sp_respaldo` (IN `usr` varchar(75), IN `pass` varchar(75))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    DECLARE admin int;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
    	SET admin:= (SELECT administrador FROM usuarios WHERE usuario=usr);
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in AND admin=1 THEN
        	SELECT usuario, nombre, apellido_paterno, apellido_materno, correo, pais, estudiante, escuela, carrera, semestre, administrador, ultimo_ingreso, (SELECT count(*) FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'ejercicios_correctos', (SELECT SUM(puntos) FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'total_puntos_ejercicios', (SELECT count(*) FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Deterministico" AND EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'ejercicios_deterministicos_correctos', (SELECT SUM(puntos) FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Deterministico" AND EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'total_puntos_deterministicos', (SELECT count(*) FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Aleatorio" AND EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'ejercicios_aleatorios_correctos', (SELECT SUM(puntos) FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.tipo="Aleatorio" AND EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'total_puntos_aleatorios', (SELECT count(*) as total FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.variables="Tres" AND EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'tres_variables', (SELECT count(*) as total FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.variables="Cuatro" AND EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'cuatro_variables', (SELECT count(*) as total FROM ejercicio_usuario AS EU INNER JOIN ejercicios AS E ON EU.id_ejercicio = E.id_ejercicio WHERE E.variables="Cinco" AND EU.correcto=1 AND EU.id_usuario=U.id_usuario) as 'cinco_variables' FROM usuarios as U;
        ELSE
        SELECT 0 AS Consulta;
        END IF;
    ELSE
        SELECT 0 AS Consulta;
    END IF;
    END$$

CREATE PROCEDURE `sp_validar_usuario` (IN `usr` varchar(75), IN `pass` varchar(75))  BEGIN
    DECLARE aux Integer;
    DECLARE pass_aux BLOB;
    DECLARE pass_in BLOB;
    SET aux:= (SELECT COUNT(*) FROM usuarios WHERE usuario=usr);
    IF aux = 1 THEN
        SET pass_aux := (SELECT contrasenia FROM usuarios WHERE usuario=usr);
        SET pass_in := (SELECT AES_ENCRYPT(pass,'%your_password%'));
        IF pass_aux = pass_in THEN
        UPDATE usuarios SET ultimo_ingreso=CURRENT_TIMESTAMP WHERE usuario=usr;
        SELECT 1 AS Login;
        ELSE
        SELECT 0 AS Login;
        END IF;
    ELSE
        SELECT 0 AS Login;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id_ejercicio` int(11) NOT NULL,
  `tipo` enum('Aleatorio','Deterministico') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `variables` enum('Tres','Cuatro','Cinco') COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `puntos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id_ejercicio`, `tipo`, `variables`, `puntos`) VALUES
(1, 'Aleatorio', 'Tres', 60),
(2, 'Aleatorio', 'Cuatro', 40),
(3, 'Aleatorio', 'Cinco', 150),
(4, 'Deterministico', 'Tres', 30),
(5, 'Deterministico', 'Cuatro', 60),
(6, 'Deterministico', 'Cinco', 90);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicio_usuario`
--

CREATE TABLE `ejercicio_usuario` (
  `id_registro` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `correcto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `notificacion` text,
  `fecha` date DEFAULT NULL,
  `tipo` set('primary','secondary','success','danger','warning','info') NOT NULL DEFAULT 'info'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(75) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(75) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellido_paterno` varchar(75) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellido_materno` varchar(75) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(75) COLLATE utf8mb4_spanish_ci NOT NULL,
  `pais` varchar(75) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasenia` blob NOT NULL,
  `estudiante` int(1) NOT NULL,
  `escuela` varchar(75) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `carrera` varchar(75) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `semestre` varchar(75) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `administrador` int(1) NOT NULL,
  `ultimo_ingreso` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `nombre`, `apellido_paterno`, `apellido_materno`, `correo`, `pais`, `contrasenia`, `estudiante`, `escuela`, `carrera`, `semestre`, `administrador`, `ultimo_ingreso`) VALUES
(7, 'admin', 'Administrador', 'General', 'NA', 'example@example.com', 'MX', 0x156702637fd1492beb73f1de1a2af52c, 0, '', '', '', 1, '2018-09-13 10:28:11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id_ejercicio`);

--
-- Indices de la tabla `ejercicio_usuario`
--
ALTER TABLE `ejercicio_usuario`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_ejercicio` (`id_ejercicio`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `ejercicio_usuario`
--
ALTER TABLE `ejercicio_usuario`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ejercicio_usuario`
--
ALTER TABLE `ejercicio_usuario`
  ADD CONSTRAINT `ejercicio_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ejercicio_usuario_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicios` (`id_ejercicio`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
