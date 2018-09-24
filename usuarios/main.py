## Módulo Usuários do microT

from flask import Flask
import os
import psycopg2 as psql

DB_URL = os.environ['DATABASE_URL']
SQL_USUA_INSERIR = 'INSERT INTO mtusuarios.usuarios (apelido, nome, bio) VALUES (%s, %s, %s);'
SQL_USUA_EXCLUIR = 'DELETE FROM mtusuarios.usuarios WHERE id_usuario = %d;'
SQL_USUA_SEGUIR = 'INSERT INTO mtusuarios.seguindo (idseguidor, idseguindo) VALUES (%d, %d);'
SQL_USUA_DEIXAR = 'DELETE FROM mtusuarios.seguindo WHERE seguindo.idseguidor = %d AND seguindo.idseguindo = %d;'
SQL_USUA_EXIBIR_SEGUIDORES = 'SELECT id_usuario, apelido, nome FROM mtusuarios.usuarios LEFT JOIN mtusuarios.seguindo ON usuarios.id_usuario = seguindo.idseguindo ORDER BY apelido;'
SQL_USUA_EXIBIR_SEGUIDOS = 'SELECT id_usuario, apelido, nome FROM mtusuarios.usuarios LEFT JOIN mtusuarios.seguindo ON usuarios.id_usuario = seguindo.idseguidor ORDER BY apelido;'

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