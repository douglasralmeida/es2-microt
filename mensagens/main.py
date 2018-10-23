## Módulo Mensagens do microT

from flask import Flask
from flask import request
from flask import jsonify
import db

SQL_MSG_INSERIR = 'INSERT INTO mtmensagens.mensagens (usuario, conteudo) VALUES (%s, %s);'
SQL_MSG_RECUPERAR = 'SELECT usuario, conteudo FROM mtmensagens.mensagens WHERE id_mensagem = %s;'
SQL_MSG_USUARIO = 'SELECT usuario, conteudo FROM mtmensagens.mensagens WHERE usuario = %s ORDER BY tempopostagem;'

app = Flask(__name__)
conn = db.conectar()

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/')
def home():
  return 'microT Messages Microservice'

@app.route("/msg/postar")
def postar():
  usuario = request.args.get('uid')
  conteudo = request.args.get('conteudo')

  db.executar(conn, SQL_MSG_INSERIR, [usuario, conteudo])

  return "Mensagem inserida com sucesso."

@app.route("/msg/<id>")
def recuperar(id):
  resultado = db.retornar(conn, SQL_MSG_RECUPERAR, [id])
  
  return jsonify(resultado)

@app.route("/umsg/<uid>")
def listar(uid):
  resultado = db.retornar(conn, SQL_MSG_USUARIO, [uid])
  
  return jsonify(resultado)

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)