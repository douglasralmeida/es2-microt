-- host: ec2-54-235-94-36.compute-1.amazonaws.com
-- db:   d37hqf7fkpac28
-- user: qgasolxcrcraqz

CREATE SCHEMA mtmensagens
  AUTHORIZATION qgasolxcrcraqz;

GRANT ALL ON SCHEMA mtmensagens TO qgasolxcrcraqz;

CREATE TABLE mtmensagens.mensagens (
  id_mensagem SERIAL PRIMARY KEY,
  usuario INTEGER NOT NULL,
  tempopostagem TIMESTAMP NOT NULL SET DEFAULT now(),
  conteudo  VARCHAR(140) NOT NULL
);

INSERT INTO mtmensagens.mensagens (usuario, conteudo)  VALUES 
  (1, 'Mensagem de teste.');