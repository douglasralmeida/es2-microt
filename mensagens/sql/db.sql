CREATE SCHEMA mtmensagens
  AUTHORIZATION ikjaragppwqzhb;

GRANT ALL ON SCHEMA mtmensagens TO ikjaragppwqzhb;

CREATE TABLE mtmensagens.mensagens (
  id_mensagem SERIAL PRIMARY KEY,
  usuario INTEGER NOT NULL,
  conteudo  VARCHAR(140) NOT NULL
);

INSERT INTO mtmensagens.mensagens (usuario, conteudo)  VALUES 
  (1, 'Mensagem de teste.');