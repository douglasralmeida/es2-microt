## Módulo Interface do Usuário do microT

from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT UI Microservice'

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)