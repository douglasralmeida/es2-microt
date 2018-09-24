-- host: ec2-54-235-94-36.compute-1.amazonaws.com
-- db:   d4e296v8gjgi52
-- user: toyztzsfxflovv

CREATE SCHEMA mtusuarios
  AUTHORIZATION toyztzsfxflovv;

GRANT ALL ON SCHEMA mtusuarios TO toyztzsfxflovv;

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

INSERT INTO mtusuarios.usuarios (apelido, nome)  VALUES 
  ('usuarioteste', 'Usuário Teste');