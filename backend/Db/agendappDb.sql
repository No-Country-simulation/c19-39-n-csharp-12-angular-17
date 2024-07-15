CREATE TABLE [administradores] (
  [idAdministrador] int PRIMARY KEY IDENTITY(1, 1),
  [idUsuario] int
)
GO

CREATE TABLE [categoriasmedicas] (
  [idCategoria] int PRIMARY KEY IDENTITY(1, 1),
  [nombre] varchar(100)
)
GO

CREATE TABLE [citas] (
  [idCita] int PRIMARY KEY IDENTITY(1, 1),
  [fecha] date,
  [hora] time,
  [idPaciente] int,
  [idMedico] int,
  [motivoConsulta] text
)
GO

CREATE TABLE [consultas] (
  [idConsulta] int PRIMARY KEY IDENTITY(1, 1),
  [idCita] int,
  [diagnostico] text
)
GO

CREATE TABLE [horarios] (
  [idHorario] int PRIMARY KEY IDENTITY(1, 1),
  [rango] varchar(50)
)
GO

CREATE TABLE [medicos] (
  [idMedico] int PRIMARY KEY IDENTITY(1, 1),
  [idUsuario] int,
  [idCategoria] int,
  [idHorario] int
)
GO

CREATE TABLE [pacientes] (
  [idPaciente] int PRIMARY KEY IDENTITY(1, 1),
  [idUsuario] int
)
GO

CREATE TABLE [roles] (
  [idRol] int PRIMARY KEY IDENTITY(1, 1),
  [nombre] varchar(50)
)
GO

CREATE TABLE [usuarios] (
  [idUsuario] int PRIMARY KEY IDENTITY(1, 1),
  [dni] varchar(20) UNIQUE,
  [nombre] varchar(100),
  [apellido] varchar(100),
  [email] varchar(100) UNIQUE,
  [telefono] varchar(20),
  [contrasenia] varchar(100),
  [idRol] int
)
GO

ALTER TABLE [administradores] ADD FOREIGN KEY ([idUsuario]) REFERENCES [usuarios] ([idUsuario])
GO

ALTER TABLE [citas] ADD FOREIGN KEY ([idPaciente]) REFERENCES [pacientes] ([idPaciente])
GO

ALTER TABLE [citas] ADD FOREIGN KEY ([idMedico]) REFERENCES [medicos] ([idMedico])
GO

ALTER TABLE [consultas] ADD FOREIGN KEY ([idCita]) REFERENCES [citas] ([idCita])
GO

ALTER TABLE [medicos] ADD FOREIGN KEY ([idUsuario]) REFERENCES [usuarios] ([idUsuario])
GO

ALTER TABLE [medicos] ADD FOREIGN KEY ([idCategoria]) REFERENCES [categoriasmedicas] ([idCategoria])
GO

ALTER TABLE [medicos] ADD FOREIGN KEY ([idHorario]) REFERENCES [horarios] ([idHorario])
GO

ALTER TABLE [pacientes] ADD FOREIGN KEY ([idUsuario]) REFERENCES [usuarios] ([idUsuario])
GO

ALTER TABLE [usuarios] ADD FOREIGN KEY ([idRol]) REFERENCES [roles] ([idRol])
GO
