## Módulo Linha do Tempo do microT

from flask import Flask
from flask import jsonify
from urllib.request import urlopen
import json

URL_MSG_BY_USER = 'https://mtmensagens.herokuapp.com/umsg/%s'
URL_SEGUIDOS = 'https://mtusuarios.herokuapp.com/usuario/seguidos/%s'

app = Flask(__name__)

def addColunaUid(data, uid):
  for x in data:
    x['uid'] = uid


def getListaUsuariosSeguidos(uid):
  lista = []
  jsondata = urlopen(URL_SEGUIDOS % uid)
  data = json.load(jsondata)
  for x in data:
    lista.append(x['id_usuario'])
  return lista

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
  addColunaUid(data, id)
  lista = getListaUsuariosSeguidos(id)
  for usuario in lista:
    jsonmsgs = urlopen(URL_MSG_BY_USER % usuario)
    msgs = json.load(jsonmsgs)
    for msg in msgs:
      addColunaUid(msg, usuario)
      data.append(msg)
  return jsonify(data)

@app.route("/lt/usuario/<id>")
def timeline(id):
  jsondata = urlopen(URL_MSG_BY_USER % id)
  data = json.load(jsondata)
  return jsonify(data)

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)