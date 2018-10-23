## Módulo Interface do Usuário do microT

from flask import Flask, render_template, request, make_response, session, redirect, url_for, abort, jsonify
from urllib.request import urlopen
import json
import os
import sys

URL_USERAPELIDO_BYID = 'http://mtusuarios.herokuapp.com/usuario/getid/%s'
URL_CHECAR = 'https://mtusuarios.herokuapp.com/usuario/verificar/%s'
URL_USER_SEGUIDOS = 'https://mtusuarios.herokuapp.com/usuario/seguidos/%s'
URL_ABANDONAR = 'https://mtusuarios.herokuapp.com/usuario/abandonar/%s'
CHAVE_SESSAO = os.environ['CHAVE_SESSOES']

app = Flask(__name__)
app.secret_key = CHAVE_SESSAO

def autenticarUsuario(apelido):
  jsondata = urlopen(URL_CHECAR % apelido)
  data = json.load(jsondata)
  if 'uid' in session:
    session.pop('uid', None)
  res = data['quantidade'] > 0

  return res

def getUserIdByApelido(apelido):
  jsondata = urlopen(URL_USERAPELIDO_BYID % apelido)
  res = json.load(jsondata)
  uid = res['data']['id_usuario']

  return uid

def isUserSeguindo(seguidor, seguindo):
  jsondata = urlopen(URL_USER_SEGUIDOS % seguidor)
  data = json.load(jsondata)
  for usuario in data:
    if usuario['id_usuario'] == seguindo:
        return True
  
  return False

@app.route('/')
def home():
  if 'apelido' in session:
    return redirect(url_for("feed"), code=302)
  else:
    return redirect(url_for("login"), code=302)

@app.route('/cadastrar/<apelido>')
def cadastrar(apelido):
  session['apelido'] = apelido

  return redirect(url_for("feed"), code=302)

@app.route('/autenticar')
def autenticar():
  apelido = request.args.get('apelido')
  print(apelido)
  if apelido is None:
    return redirect(url_for("login"), code=302)
  if autenticarUsuario(apelido):
    session['apelido'] = apelido
    session['uid'] = getUserIdByApelido(apelido)
    return redirect(url_for("feed"), code=302)
  else:
    return abort(401)

@app.route('/abandonar')
def abandonar():
  apelido = session['apelido']
  if 'uid' in session:
    uid = session['uid']
  else:
    uid = getUserIdByApelido(apelido)
  urlopen(URL_ABANDONAR % uid)
  session.pop('uid', None)
  session.pop('apelido', None)
  return redirect(url_for("login"), code=302)

@app.route('/sair')
def sair():
  session.pop('uid', None)
  session.pop('apelido', None)
  return redirect(url_for("login"), code=302)


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
  session['feeduid'] = uid
  return make_response(render_template('feed.html', agregado='1', feeduid=uid))

@app.route('/u/<uid>')
def usuariofeed(uid):
  return make_response(render_template('feed.html', agregado='', feeduid=uid))

@app.route('/quemsoueu')
def quemsoueu():
  resultado = dict()
  resultado['apelido'] = session['apelido']
  resultado['uid'] = session['uid']

  return jsonify(resultado)

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)