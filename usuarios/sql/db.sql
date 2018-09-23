CREATE SCHEMA mtusuarios;

CREATE TABLE mtusuarios.usuarios (
  id_usuario SERIAL PRIMARY KEY,
  apelido VARCHAR(16) NOT NULL,
  nome  VARCHAR(64) NOT NULL,
  bio VARCHAR(128),
  UNIQUE(apelido)
);

CREATE TABLE mtusuarios.seguindo (
  idseguidor INTEGER REFERENCES mtusuarios.usuarios(id_usuario) ON DELETE CASCADE,
  idseguindo INTEGER REFERENCES mtusuarios.usuarios(id_usuario) ON DELETE CASCADE,
  PRIMARY KEY (idseguidor, idseguindo)
);

INSERT INTO mtusuarios.seguindo (apelido, nome)  VALUES 
  ('usuarioteste', 'Usuário Teste');