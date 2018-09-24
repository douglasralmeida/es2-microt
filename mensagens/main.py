## Módulo Mensagens do microT

from flask import Flask
import os
import psycopg2 as psql

DB_URL = os.environ['DATABASE_URL']
SQL_MSG_INSERIR = ''

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT Messages Microservice'

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)