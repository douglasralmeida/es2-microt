## Módulo Linha do Tempo do microT

from flask import Flask
from flask import jsonify
from urllib.request import urlopen
import json

URL_MSG_BY_USER = 'https://mtmensagens.herokuapp.com/umsg/%s'
URL_SEGUIDOS = 'https://mtusuarios.herokuapp.com/usuario/seguidos/%s'

app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/')
def home():
  return 'microT Timeline Microservice'

def getListaUsuarios(uid):
  lista = []
  jsondata = urlopen(URL_SEGUIDOS % uid)
  data = json.load(jsondata)
  for x in data:
    lista.append(x['id_usuario'])
  return lista

@app.route("/lt/<id>")
def timelinetodos(id):
  jsondata = urlopen(URL_MSG_BY_USER % id)
  data = json.load(jsondata)
  lista = getListaUsuarios(id)
  for i in lista:
    jsonmsgs = urlopen(URL_MSG_BY_USER % i)
    msgs = json.load(jsonmsgs)
    for j in msgs:
      data.append(j)
  return jsonify(data)

@app.route("/lt/usuario/<id>")
def timeline(id):
  jsondata = urlopen(URL_MSG_BY_USER % id)
  data = json.load(jsondata)
  return jsonify(data)

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)