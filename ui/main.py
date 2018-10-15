## Módulo Interface do Usuário do microT

from flask import Flask, render_template, request, make_response
from urllib.request import urlopen
import json

URL_USERAPELIDO_BYID = 'http://mtusuarios.herokuapp.com/usuario/getid/%s'

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT UI Microservice'

def getUserIdByApelido(apelido):
  jsondata = urlopen(URL_USERAPELIDO_BYID % apelido)
  res = json.load(jsondata)
  uid = res['data']['id_usuario']

  return uid

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/feed')
def feed():
  apelido = request.cookies.get('apelido')
  if apelido is None:
    return login()
  uid = getUserIdByApelido(apelido)
  resp = make_response(render_template('feed.html'))
  resp.set_cookie('uid', str(uid))

  return resp

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)