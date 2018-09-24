## Módulo Linha do Tempo do microT

from flask import Flask
from urllib.request import urlopen
import os

URL_MSG_BY_USER = 'https://mtmensagens.herokuapp.com/umsg/%s'

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Timeline Microservice'

def downloadData(url):
  response = urlopen(url)
  return response.read()

@app.route("/lt/<id>")
def timelinetodos(id):
  return "Ação: LISTAR MSGS DO USUARIO ID E DAQUELES QUE ELE SEGUE VIA HTTP"

@app.route("/lt/usuario/<id>")
def timeline(id):
  return downloadData(URL_MSG_BY_USER % id)

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)