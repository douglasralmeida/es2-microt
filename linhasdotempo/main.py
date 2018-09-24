## Módulo Linha do Tempo do microT

from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Timeline Microservice'

@app.route("/lt/<id>")
def registrar(id):
  return "Ação: LISTAR MSGS DO USUARIO ID E DAQUELES QUE ELE SEGUE VIA HTTP"

@app.route("/lt/usuario/<id>")
def registrar(id):
  return "Ação: LISTAR MSGS DO USUARIO ID VIA HTTP"

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)