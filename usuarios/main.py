from flask import Flask
import requests
TOKEN ='12345'


app = Flask(__name__)

def sendMessage()
	url = '/usuario/registrar{0}/sendMessage'.format(TOKEN)
	data = {'apelido', 'nome', 'bio', 'id_usuario'}
	response = requests.post(url, data = data)
	


if __name__ == '__main__':
  app.run(debug=True, use_reloader=True)