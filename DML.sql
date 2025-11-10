INSERT INTO roles (id, nombre)
VALUES
    (1, 'ROLE_ADMIN'),
    (2, 'ROLE_ESTUDIANTE');

-- Insertar roles

-- Insertar facultades
INSERT INTO facultades (id, nombre_facultad)
VALUES
    (1, 'Ingenieria'),
    (2, 'Licenciatura');

-- Insertar unidades de investigación
INSERT INTO unidad_investigacion (id, nombre_unidad_investigacion, id_facultad)
VALUES
    (1, 'test', 1);

-- Insertar carreras
INSERT INTO carreras (id, nombre_carrera, id_facultad)
VALUES
    (1, 'Ingeniería de Sistemas', 1),
    (2, 'Administración de Empresas', 1),
    (3, 'Contabilidad', 1),
    (4, 'Ingeniería Civil', 1),
    (5, 'Arquitectura', 1),
    (6, 'Derecho', 1),
    (7, 'Medicina', 1),
    (8, 'Enfermería', 1);

-- Insertar líneas de investigación para cada carrera

-- Ingeniería de Sistemas
INSERT INTO linea_investigacion (nombre_linea_investigacion, id_carrera) VALUES
                                                                             ('Ingeniería informática, industria y sociedad', 1),
                                                                             ('Ingeniería de software e innovación tecnológica', 1);

-- Administración de Empresas
INSERT INTO linea_investigacion (nombre_linea_investigacion, id_carrera) VALUES
                                                                             ('Gestión empresarial', 2),
                                                                             ('Gestión pública', 2);

-- Contabilidad
INSERT INTO linea_investigacion (nombre_linea_investigacion, id_carrera) VALUES
    ('Auditoría y control financiero', 3);

-- Ingeniería Civil
INSERT INTO linea_investigacion (nombre_linea_investigacion, id_carrera) VALUES
                                                                             ('Ingeniería de la construcción', 4),
                                                                             ('Ingeniería de materiales', 4);

-- Arquitectura
INSERT INTO linea_investigacion (nombre_linea_investigacion, id_carrera) VALUES
                                                                             ('Diseño urbano y rural', 5),
                                                                             ('Patrimonio arquitectónico y conservación', 5);

-- Medicina
INSERT INTO linea_investigacion (nombre_linea_investigacion, id_carrera) VALUES
                                                                             ('Salud pública y epidemiología', 7),
                                                                             ('Tecnología médica y salud', 7);

-- Insertar usuario admin
INSERT INTO usuarios (
    id_user, correo_usuario, primer_login, nombre_usuario, apellido_usuario,
    contrasena_usuario, estado, username, id_unidad_investigacion, id_rol
)
VALUES
    (1, 'admin@admin.admin', 1, 'admin', 'admin', '$2a$12$NTbtNXDXvYGE/BQCDmWqIOSQLoobZQ5HBYE/E.WZEwx.tMWqJlmsG', 1, 'admin', 1, 1);

-- Insertar alumnos
INSERT INTO alumnos (
    id, direccion, fecha_nacimiento, dni, correo, nombres, sexo, apellido_paterno, apellido_materno, telefono, codigo_alumno, id_carrera
)
VALUES
    (1, 'Av. Siempre Viva 123', '1995-05-12', '12345678', 'carlos.perez@fakemail.com', 'Carlos', TRUE, 'Pérez', 'González', '987654321', '100001', 1),
    (2, 'Calle Falsa 456', '1996-07-23', '23456789', 'laura.gomez@fakemail.com', 'Laura', FALSE, 'Gómez', 'Sánchez', '987654322', '100002', 2),
    (3, 'Av. Los Olivos 789', '1994-09-15', '34567890', 'juan.martinez@fakemail.com', 'Juan', TRUE, 'Martínez', 'López', '987654323', '100003', 3),
    (4, 'Jr. Las Flores 321', '1997-03-10', '45678901', 'ana.rodriguez@fakemail.com', 'Ana', FALSE, 'Rodríguez', 'Salazar', '987654324', '100004', 4),
    (5, 'Calle Primavera 987', '1993-11-28', '56789012', 'maria.fernandez@fakemail.com', 'María', FALSE, 'Fernández', 'Ramírez', '987654325', '100005', 5),
    (6, 'Av. Los Cedros 654', '1998-01-19', '67890123', 'jose.lopez@fakemail.com', 'José', TRUE, 'López', 'Cruz', '987654326', '100006', 6),
    (7, 'Jr. San Martín 432', '1999-04-30', '78901234', 'pedro.diaz@fakemail.com', 'Pedro', TRUE, 'Díaz', 'Rojas', '987654327', '100007', 7),
    (8, 'Av. Independencia 852', '1995-08-11', '89012345', 'jorge.garcia@fakemail.com', 'Jorge', TRUE, 'García', 'Pérez', '987654328', '100008', 1),
    (9, 'Calle Libertad 159', '1996-02-05', '90123456', 'luis.sanchez@fakemail.com', 'Luis', TRUE, 'Sánchez', 'García', '987654329', '100009', 2),
    (10, 'Jr. Los Ángeles 357', '1994-12-22', '01234567', 'beatriz.morales@fakemail.com', 'Beatriz', FALSE, 'Morales', 'Torres', '987654330', '100010', 3),
    (11, 'Av. Los Héroes 951', '1995-09-13', '12345679', 'lucia.romero@fakemail.com', 'Lucía', FALSE, 'Romero', 'Vargas', '987654331', '100011', 4),
    (12, 'Calle Las Palmeras 357', '1997-10-09', '23456780', 'carmen.vargas@fakemail.com', 'Carmen', FALSE, 'Vargas', 'Ortega', '987654332', '100012', 5),
    (13, 'Jr. Belgrano 753', '1996-06-17', '34567891', 'raul.ortega@fakemail.com', 'Raúl', TRUE, 'Ortega', 'Suárez', '987654333', '100013', 6),
    (14, 'Av. San José 468', '1994-03-01', '45678902', 'diana.suarez@fakemail.com', 'Diana', FALSE, 'Suárez', 'Mendoza', '987654334', '100014', 7),
    (15, 'Calle Las Lomas 963', '1998-07-25', '56789013', 'alberto.rivas@fakemail.com', 'Alberto', TRUE, 'Rivas', 'Navarro', '987654335', '100015', 1),
    (16, 'Jr. Los Olmos 654', '1999-05-15', '67890124', 'andrea.castro@fakemail.com', 'Andrea', FALSE, 'Castro', 'Paredes', '987654336', '100016', 2),
    (17, 'Av. Las Américas 123', '1995-02-27', '78901235', 'gabriela.paredes@fakemail.com', 'Gabriela', FALSE, 'Paredes', 'Soto', '987654337', '100017', 3),
    (18, 'Calle Los Ángeles 456', '1997-11-30', '89012346', 'francisco.navarro@fakemail.com', 'Francisco', TRUE, 'Navarro', 'Ruiz', '987654338', '100018', 4),
    (19, 'Jr. Las Magnolias 753', '1994-04-10', '90123457', 'carla.mendoza@fakemail.com', 'Carla', FALSE, 'Mendoza', 'Gutiérrez', '987654339', '100019', 5),
    (20, 'Av. Los Pinos 852', '1996-08-22', '01234568', 'sergio.hernandez@fakemail.com', 'Sergio', TRUE, 'Hernández', 'Carrillo', '987654340', '100020', 6),
    (21, 'Calle Los Rosales 159', '1999-09-17', '12345670', 'valentina.salinas@fakemail.com', 'Valentina', FALSE, 'Salinas', 'Zambrano', '987654341', '100021', 7);

-- Insertar docentes
INSERT INTO docentes (
    id_docente, direccion, fecha_nacimiento, dni, nombres, correo_institucional, apellido_paterno, apellido_materno, telefono, id_carrera
)
VALUES
    (1, 'Av. Siempre Viva 123', '1995-05-12', '12345678', 'Carlos', 'carlos.perez@fakemail.com', 'Pérez', 'González', '987654321', 1),
    (2, 'Calle Falsa 456', '1996-07-23', '23456789', 'Laura', 'laura.gomez@fakemail.com', 'Gómez', 'Sánchez', '987654322', 2),
    (3, 'Av. Los Olivos 789', '1994-09-15', '34567890', 'Juan', 'juan.martinez@fakemail.com', 'Martínez', 'López', '987654323', 3),
    (4, 'Jr. Las Flores 321', '1997-03-10', '45678901', 'Ana', 'ana.rodriguez@fakemail.com', 'Rodríguez', 'Salazar', '987654324', 4),
    (5, 'Calle Primavera 987', '1993-11-28', '56789012', 'María', 'maria.fernandez@fakemail.com', 'Fernández', 'Ramírez', '987654325', 5),
    (6, 'Av. Los Cedros 654', '1998-01-19', '67890123', 'José', 'jose.lopez@fakemail.com', 'López', 'Cruz', '987654326', 6),
    (7, 'Jr. San Martín 432', '1999-04-30', '78901234', 'Pedro', 'pedro.diaz@fakemail.com', 'Díaz', 'Rojas', '987654327', 7),
    (8, 'Av. Independencia 852', '1995-08-11', '89012345', 'Jorge', 'jorge.garcia@fakemail.com', 'García', 'Pérez', '987654328', 1),
    (9, 'Calle Libertad 159', '1996-02-05', '90123456', 'Luis', 'luis.sanchez@fakemail.com', 'Sánchez', 'García', '987654329', 2),
    (10, 'Jr. Los Ángeles 357', '1994-12-22', '01234567', 'Beatriz', 'beatriz.morales@fakemail.com', 'Morales', 'Torres', '987654330', 3),
    (11, 'Av. Los Héroes 951', '1995-09-13', '12345679', 'Lucía', 'lucia.romero@fakemail.com', 'Romero', 'Vargas', '987654331', 4),
    (12, 'Calle Las Palmeras 357', '1997-10-09', '23456780', 'Carmen', 'carmen.vargas@fakemail.com', 'Vargas', 'Ortega', '987654332', 5),
    (13, 'Jr. Belgrano 753', '1996-06-17', '34567891', 'Raúl', 'raul.ortega@fakemail.com', 'Ortega', 'Suárez', '987654333', 6),
    (14, 'Av. San José 468', '1994-03-01', '45678902', 'Diana', 'diana.suarez@fakemail.com', 'Suárez', 'Mendoza', '987654334', 7),
    (15, 'Calle Las Lomas 963', '1998-07-25', '56789013', 'Alberto', 'alberto.rivas@fakemail.com', 'Rivas', 'Navarro', '987654335', 1),
    (16, 'Jr. Los Olmos 654', '1999-05-15', '67890124', 'Andrea', 'andrea.castro@fakemail.com', 'Castro', 'Paredes', '987654336', 2),
    (17, 'Av. Las Américas 123', '1995-02-27', '78901235', 'Gabriela', 'gabriela.paredes@fakemail.com', 'Paredes', 'Soto', '987654337', 3),
    (18, 'Calle Los Ángeles 456', '1997-11-30', '89012346', 'Francisco', 'francisco.navarro@fakemail.com', 'Navarro', 'Ruiz', '987654338', 4),
    (19, 'Jr. Las Magnolias 753', '1994-04-10', '90123457', 'Carla', 'carla.mendoza@fakemail.com', 'Mendoza', 'Gutiérrez', '987654339', 5),
    (20, 'Av. Los Pinos 852', '1996-08-22', '01234568', 'Sergio', 'sergio.hernandez@fakemail.com', 'Hernández', 'Carrillo', '987654340', 6),
    (22, 'Jr. El Roble 123', '1996-01-20', '23456781', 'Ricardo', 'ricardo.jimenez@fakemail.com', 'Jiménez', 'Bravo', '987654342', 1),
    (23, 'Calle El Bosque 456', '1997-05-12', '34567892', 'Elena', 'elena.bravo@fakemail.com', 'Bravo', 'Correa', '987654343', 2),
    (24, 'Av. Los Laureles 789', '1993-03-18', '45678903', 'Miguel', 'miguel.correa@fakemail.com', 'Correa', 'Espinoza', '987654344', 3),
    (25, 'Jr. Las Acacias 321', '1998-07-22', '56789014', 'Cecilia', 'cecilia.espinoza@fakemail.com', 'Espinoza', 'Figueroa', '987654345', 4),
    (26, 'Calle El Ciprés 987', '1995-11-11', '67890125', 'Tomás', 'tomas.figueroa@fakemail.com', 'Figueroa', 'Prieto', '987654346', 5),
    (27, 'Av. Los Castaños 654', '1999-02-28', '78901236', 'Fernanda', 'fernanda.prieto@fakemail.com', 'Prieto', 'Montoya', '987654347', 6),
    (28, 'Jr. Los Eucaliptos 432', '1996-08-14', '89012347', 'Gloria', 'gloria.montoya@fakemail.com', 'Montoya', 'Vidal', '987654348', 7),
    (29, 'Av. Los Nogales 852', '1994-12-05', '90123458', 'Rodrigo', 'rodrigo.vidal@fakemail.com', 'Vidal', 'Vega', '987654349', 1),
    (30, 'Calle Los Robles 159', '1998-10-17', '01234569', 'Sofía', 'sofia.vega@fakemail.com', 'Vega', 'Bernal', '987654350', 2),
    (31, 'Jr. Las Palmeras 357', '1997-04-23', '12345671', 'Ernesto', 'ernesto.bernal@fakemail.com', 'Bernal', 'Delgado', '987654351', 3),
    (32, 'Av. Los Almendros 951', '1994-06-19', '23456782', 'Alicia', 'alicia.delgado@fakemail.com', 'Delgado', 'Cortés', '987654352', 4),
    (33, 'Calle Las Casuarinas 357', '1998-09-01', '34567893', 'Horacio', 'horacio.cortes@fakemail.com', 'Cortés', 'Peña', '987654353', 5),
    (34, 'Jr. Los Fresnos 753', '1996-01-16', '45678904', 'Susana', 'susana.pena@fakemail.com', 'Peña', 'Soto', '987654354', 6),
    (35, 'Av. Los Robles 468', '1995-03-20', '56789015', 'Rafael', 'rafael.soto@fakemail.com', 'Soto', 'Molina', '987654355', 7),
    (36, 'Calle Las Magnolias 963', '1997-08-28', '67890126', 'Marta', 'marta.molina@fakemail.com', 'Molina', 'Rubio', '987654356', 1),
    (37, 'Jr. Los Pinos 654', '1999-12-14', '78901237', 'Gonzalo', 'gonzalo.rubio@fakemail.com', 'Rubio', 'Méndez', '987654357', 2),
    (38, 'Av. Las Arboledas 123', '1996-05-09', '89012348', 'Claudia', 'claudia.mendez@fakemail.com', 'Méndez', 'Reyes', '987654358', 3),
    (39, 'Calle Los Sauces 456', '1998-02-06', '90123459', 'Julián', 'julian.reyes@fakemail.com', 'Reyes', 'Romero', '987654359', 4),
    (40, 'Jr. Los Arrayanes 753', '1994-10-13', '01234570', 'Lorena', 'lorena.romero@fakemail.com', 'Romero', 'Núñez', '987654360', 5),
    (41, 'Av. Las Violetas 852', '1995-07-21', '12345672', 'Hugo', 'hugo.nunez@fakemail.com', 'Núñez', 'Pizarro', '987654361', 6),
    (42, 'Calle Los Tulipanes 159', '1996-09-15', '23456783', 'Liliana', 'liliana.pizarro@fakemail.com', 'Pizarro', 'Gutiérrez', '987654362', 7),
    (43, 'Jr. Los Manzanos 357', '1997-11-10', '34567894', 'Natalia', 'natalia.gutierrez@fakemail.com', 'Gutiérrez', 'Gómez', '987654363', 1),
    (44, 'Av. Los Cerezos 951', '1998-04-18', '45678905', 'Héctor', 'hector.gomez@fakemail.com', 'Gómez', 'Castillo', '987654364', 2),
    (45, 'Calle Las Camelias 357', '1995-08-25', '56789016', 'Verónica', 'veronica.castillo@fakemail.com', 'Castillo', 'Aguilar', '987654365', 3),
    (46, 'Jr. Las Orquídeas 753', '1999-01-30', '67890127', 'Fabián', 'fabian.aguilar@fakemail.com', 'Aguilar', 'Santana', '987654366', 4),
    (47, 'Av. Los Ciruelos 468', '1996-03-15', '78901238', 'Irene', 'irene.santana@fakemail.com', 'Santana', 'Fuentes', '987654367', 5),
    (48, 'Calle Los Perales 963', '1994-05-20', '89012349', 'Esteban', 'esteban.fuentes@fakemail.com', 'Fuentes', 'Salazar', '987654368', 6),
    (49, 'Jr. Los Manzanos 654', '1998-12-22', '90123450', 'Silvia', 'silvia.salazar@fakemail.com', 'Salazar', 'Ortiz', '987654369', 7),
    (50, 'Av. Los Duraznos 123', '1996-10-24', '01234571', 'Mario', 'mario.ortiz@fakemail.com', 'Ortiz', 'Mora', '987654370', 1);