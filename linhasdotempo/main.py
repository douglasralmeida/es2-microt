## Módulo Linha do Tempo do microT

from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Timeline Microservice'

@app.route("/lt/<uid>")
def registrar(uid):
  return "Ação: LISTAR MSGS DO USUARIO UID E DAQUELES QUE ELE SEGUE VIA HTTP"

@app.route("/lt/usuario/<uid>")
def registrar(uid):
  return "Ação: LISTAR MSGS DO USUARIO UID VIA HTTP"

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)