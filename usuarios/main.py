## Módulo Usuários do microT

from flask import Flask
import os
import psycopg2 as psql

DB_URL = os.environ['DATABASE_URL']
SQL_USUA_INSERIR = 'SELECT nome FROM oscar.filmes WHERE ano = %s;'
SQL_USUA_EXCLUIR = 'SELECT nome FROM oscar.filmes WHERE ano = %s;'
SQL_USUA_SEGUIR = ''
SQL_USUA_DEIXAR = ''
SQL_USUA_EXIBIR_SEGUIDOS = ''

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Users Microservice'

@app.route("/usuario/registrar")
def registrar():
  return "Ação: INSERIR NO BD"

@app.route("/usuario/abandonar/<uid>")
def abandonar(uid):
  return "Ação: DELETAR UID DO BD"

@app.route("/usuario/seguir/<uid>")
def seguir(uid):
  return "Ação: SEGUIR UID"

@app.route("/usuario/deixar/<uid>")
def deixar(uid):
  return "Ação: DEIXAR DE SEGUIR UID"

@app.route("/usuario/seguidos/<uid>")
def seguidos(uid):
  return "Ação: EXIBIR SEGUIDOS DE UID"

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)