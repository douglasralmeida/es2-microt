## Módulo Usuários do microT

from flask import Flask
from flask import request
import db

SQL_USUA_INSERIR = 'INSERT INTO mtusuarios.usuarios (apelido, nome, bio) VALUES (%s, %s, %s);'
SQL_USUA_EXCLUIR = 'DELETE FROM mtusuarios.usuarios WHERE id_usuario = %d;'
SQL_USUA_SEGUIR = 'INSERT INTO mtusuarios.seguindo (idseguidor, idseguindo) VALUES (%d, %d);'
SQL_USUA_DEIXAR = 'DELETE FROM mtusuarios.seguindo WHERE seguindo.idseguidor = %d AND seguindo.idseguindo = %d;'
SQL_USUA_EXIBIR_SEGUIDORES = 'SELECT id_usuario, apelido, nome FROM mtusuarios.usuarios LEFT JOIN mtusuarios.seguindo ON usuarios.id_usuario = seguindo.idseguindo ORDER BY apelido;'
SQL_USUA_EXIBIR_SEGUIDOS = 'SELECT id_usuario, apelido, nome FROM mtusuarios.usuarios LEFT JOIN mtusuarios.seguindo ON usuarios.id_usuario = seguindo.idseguidor ORDER BY apelido;'

app = Flask(__name__)
conn = db.conectar()

@app.route('/')
def home():
  return 'microT Users Microservice'

@app.route("/usuario/registrar")
def registrar():
  apelido = request.args.get('apelido')
  nome = request.args.get('nome')
  bio = request.args.get('bio')
  if bio is None:
    bio = 'NULL'
  db.executarUm(conn, SQL_USUA_INSERIR, [apelido, nome, bio])

  return 'Usuário inserido com sucesso.'

@app.route("/usuario/abandonar/<uid>")
def abandonar(uid):
  return "Ação: DELETAR UID DO BD"

@app.route("/usuario/seguir/<id>")
def seguir(id):
  usuario = request.args.get('uid')

  return "Ação: SEGUIR ID"

@app.route("/usuario/deixar/<id>")
def deixar(id):
  usuario = request.args.get('uid')

  return "Ação: DEIXAR DE SEGUIR ID"

@app.route("/usuario/seguidos/<id>")
def seguidos(id):
  return "Ação: EXIBIR SEGUIDOS DE ID"

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)