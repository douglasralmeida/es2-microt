CREATE SCHEMA mtmensagens;

CREATE TABLE mtmensagens.mensagens (
  id_mensagem SERIAL PRIMARY KEY,
  usuario INTEGER NOT NULL,
  conteudo  VARCHAR(140) NOT NULL
);

INSERT INTO mtmensagens.mensagens (usuario, conteudo)  VALUES 
  (1, 'Mensagem de teste.');