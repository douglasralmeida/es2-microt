## Módulo Linha do Tempo do microT

from flask import Flask
from flask import jsonify
from urllib.request import urlopen
import json

URL_MSG_BY_USER = 'https://mtmensagens.herokuapp.com/umsg/%s'
URL_SEGUIDOS = 'https://mtusuarios.herokuapp.com/usuario/seguidos/%s'
URL_USER_INFO = 'https://mtusuarios.herokuapp.com/usuario/info/%s'

app = Flask(__name__)

def addColuna(data, nomecol, nome):
  for x in data:
    x[nomecol] = nome

def getListaUsuariosSeguidos(uid):
  lista = []
  jsondata = urlopen(URL_SEGUIDOS % uid)
  data = json.load(jsondata)
  for x in data:
    lista.append(x['id_usuario'])
  return lista

def getUsuarioNome(uid):
  jsondata = urlopen(URL_USER_INFO % uid)
  data = json.load(jsondata)
  return data['nome']

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/')
def home():
  return 'microT Timeline Microservice'

@app.route("/lt/<id>")
def timelinetodos(id):
  jsondata = urlopen(URL_MSG_BY_USER % id)
  data = json.load(jsondata)
  addColuna(data, 'nome', '*')
  addColuna(data, 'userurl', '/u/'+id)
  userurl
  lista = getListaUsuariosSeguidos(id)
  for usuario in lista:
    jsonmsgs = urlopen(URL_MSG_BY_USER % usuario)
    nome = getUsuarioNome(usuario)
    msgs = json.load(jsonmsgs)
    for msg in msgs:
      addColuna(msg, 'nome', nome)
      addColuna(data, 'userurl', '/u/'+usuario)
      data.append(msg)
  return jsonify(data)

@app.route("/lt/usuario/<id>")
def timeline(id):
  jsondata = urlopen(URL_MSG_BY_USER % id)
  data = json.load(jsondata)
  return jsonify(data)

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)