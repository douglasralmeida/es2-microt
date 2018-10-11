## Módulo Interface do Usuário do microT

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT UI Microservice'

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/feed')
def feed():
  apelido = request.cookies.get('apelido')
  if apelido is None:
    return login()

  return 'exibir feed de notícias de ' + apelido

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)