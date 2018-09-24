## Módulo Linha do Tempo do microT

from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Timeline Microservice'

@app.route('/a')
def a():
  return 'teste'

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)