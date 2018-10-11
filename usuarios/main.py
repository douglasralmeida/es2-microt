## Módulo Usuários do microT

from flask import Flask
from flask import request
from flask import jsonify
import db

SQL_USUA_CHECAR = 'SELECT COUNT(id_usuario) FROM mtusuarios.usuarios WHERE apelido = %s;'
SQL_USUA_LISTAR = 'SELECT id_usuario, apelido FROM mtusuarios.usuarios;'
SQL_USUA_INSERIR = 'INSERT INTO mtusuarios.usuarios (apelido, nome, bio) VALUES (%s, %s, %s);'
SQL_USUA_EXCLUIR = 'DELETE FROM mtusuarios.usuarios WHERE id_usuario = %s;'
SQL_USUA_SEGUIR = 'INSERT INTO mtusuarios.seguindo (idseguidor, idseguindo) VALUES (%s, %s);'
SQL_USUA_DEIXAR = 'DELETE FROM mtusuarios.seguindo WHERE mtusuarios.seguindo.idseguidor = %s AND mtusuarios.seguindo.idseguindo = %s;'
SQL_USUA_EXIBIR_SEGUIDOS = 'SELECT id_usuario, apelido, nome FROM mtusuarios.usuarios LEFT JOIN mtusuarios.seguindo ON id_usuario = idseguindo WHERE idseguidor = %s ORDER BY apelido;'
SQL_USUA_EXIBIR_SEGUIDORES = 'SELECT id_usuario, apelido, nome FROM mtusuarios.usuarios LEFT JOIN mtusuarios.seguindo ON id_usuario = idseguidor WHERE idseguindo = %s ORDER BY apelido;'

app = Flask(__name__)
conn = db.conectar()

@app.route('/')
def home():
  return 'microT Users Microservice'

@app.route("/usuario/listar")
def listar():
  resultado = db.retornar(conn, SQL_USUA_LISTAR, [])
  
  return jsonify(resultado)

@app.route("/usuario/registrar")
def registrar():
  apelido = request.args.get('apelido')
  nome = request.args.get('nome')
  bio = request.args.get('bio')
  if bio is None:
    bio = 'NULL'
  db.executar(conn, SQL_USUA_INSERIR, [apelido, nome, bio])

  return 'Usuário inserido com sucesso.'

@app.route("/usuario/abandonar/<id>")
def abandonar(id):
  db.executar(conn, SQL_USUA_EXCLUIR, [id])

  return 'Usuário excluído com sucesso.'

@app.route("/usuario/seguir/<id>")
def seguir(id):
  usuario = request.args.get('uid')
  db.executar(conn, SQL_USUA_SEGUIR, [usuario, id])

  return 'Registro para seguir salvo com sucesso.'

@app.route("/usuario/deixar/<id>")
def deixar(id):
  usuario = request.args.get('uid')
  db.executar(conn, SQL_USUA_DEIXAR, [usuario, id])

  return 'Registro para deixar de seguir salvo com sucesso.'

@app.route("/usuario/seguidores/<id>")
def seguidores(id):
  resultado = db.retornar(conn, SQL_USUA_EXIBIR_SEGUIDORES, [id])
  
  return jsonify(resultado)

@app.route("/usuario/seguidos/<id>")
def seguidos(id):
  resultado = db.retornar(conn, SQL_USUA_EXIBIR_SEGUIDOS, [id])
  
  return jsonify(resultado)

@app.route("/usuario/verificar/<apelido>")
def verificar(apelido):
  quantidade = db.contar(conn, SQL_USUA_CHECAR, [apelido])
  resultado = {'quantidade': quantidade}

  return jsonify(resultado)


if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)