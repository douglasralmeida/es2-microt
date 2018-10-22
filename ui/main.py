## Módulo Interface do Usuário do microT

from flask import Flask, render_template, request, make_response, session, redirect, url_for, abort
from urllib.request import urlopen
import json
import os
import sys

URL_USERAPELIDO_BYID = 'http://mtusuarios.herokuapp.com/usuario/getid/%s'
URL_CHECAR = 'https://mtusuarios.herokuapp.com/usuario/verificar/%s'
CHAVE_SESSAO = os.environ['CHAVE_SESSOES']

app = Flask(__name__)
app.secret_key = CHAVE_SESSAO

def autenticarUsuario(apelido):
  jsondata = urlopen(URL_CHECAR % apelido)
  data = json.load(jsondata)
  if 'uid' in session:
    session.pop('uid', None)
  session['apelido'] = apelido
  res = data['quantidade'] > 0

  return res

def getUserIdByApelido(apelido):
  jsondata = urlopen(URL_USERAPELIDO_BYID % apelido)
  res = json.load(jsondata)
  uid = res['data']['id_usuario']

  return uid

@app.route('/')
def home():
  if 'apelido' in session:
    return redirect(url_for("feed"), code=302)
  else:
    return redirect(url_for("login"), code=302)

@app.route('/autenticar')
def autenticar():
  apelido = request.args.get('apelido')
  if apelido is None:
    return redirect(url_for("login"), code=302)
  if autenticarUsuario(apelido):
    return redirect(url_for("feed"), code=302)
  else:
    return abort(401)

@app.route('/login')
def login():
  return render_template('login.html')

@app.route('/feed')
def feed():
  if 'apelido' in session:
    apelido = session['apelido']
  else:
    return redirect(url_for("login"), code=302)
  if 'uid' in session:
    uid = session['uid']
  else:
    uid = getUserIdByApelido(apelido)
    session['uid'] = uid
  return make_response(render_template('feed.html', agregado='1'))

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)