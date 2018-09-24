## Módulo Mensagens do microT

from flask import Flask
import os
import psycopg2 as psql

DB_URL = os.environ['DATABASE_URL']
SQL_MSG_INSERIR = 'INSERT INTO mtmensagens.mensagens (usuario, conteudo) VALUES (%d, %s);'
SQL_MSG_RECUPERAR = 'SELECT usuario, conteudo FROM mtmensagens.mensagens WHERE id_mensagem = %d;'
SQL_MSG_USUARIO = 'SELECT usuario, conteudo FROM mtmensagens.mensagens WHERE usuario = %d ORDER BY tempopostagem;'

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Messages Microservice'

@app.route("/msg/postar")
def postar():
  usuario = request.args.get('uid')
  conteudo = request.args.get('conteudo')

  return "Ação: INSERIR MSG NO BD"

@app.route("/msg/<id>")
def recuperar(id):
  return "Ação: RECUPERAR MSG ID NO BD"

@app.route("/umsg/<uid>")
def listar(uid):
  return "Ação: LISTAR MSGS DO USUARIO UID NO BD"

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)