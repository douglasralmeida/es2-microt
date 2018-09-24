## Módulo Linha do Tempo do microT

from flask import Flask
from flask import jsonify
from urllib.request import urlopen
import os
import json

URL_MSG_BY_USER = 'https://mtmensagens.herokuapp.com/umsg/%s'
URL_SEGUIDOS = 'https://mtusuarios.herokuapp.com/usuario/seguidos/%s'

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Timeline Microservice'

def downloadData(url):
  response = urlopen(url)
  return response.read()

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
    data.append = downloadData(URL_MSG_BY_USER % i)
  return jsonify(lista)

@app.route("/lt/usuario/<id>")
def timeline(id):
  return downloadData(URL_MSG_BY_USER % id)

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)