## Módulo Interface do Usuário do microT

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
  return 'microT UI Microservice'

@app.route('/login')
def login():
  return render_template('login.html')

if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)