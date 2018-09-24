from flask import Flask
import requests
TOKEN ='12345'


app = Flask(__name__)

def registrar()
	url = '/usuario/registrar{0}/'.format(TOKEN)
	data = {'apelido', 'nome', 'bio', 'id_usuario'}
	response = requests.post(url, data = data)

def abandonar(id_usuario)
	url = '/usuario/abandonar/@id_usuario{0}/'.format(TOKEN)
	data = {id_usuario'}
	response = requests.delete(url, data = data)

def seguir(id_usuario)
	url = '/usuario/seguir{0}/@id_usuario'.format(TOKEN)
	data = {'id_usuario'}
	response = requests.get(url, data = data)

def deixar(id_usuario)
	url = '/usuario/deixar{0}/@id_usuario'.format(TOKEN)
	data = {'apelido', 'nome', 'bio', 'id_usuario'}
	response = requests.get(url, data = data)


if __name__ == '__main__':

	nome = input('Entre com o nome: ')
	apelido =  = input('Entre com o apelido: ')
	bio  = input('Entre com a bio: ')
	id_usuario  = input('Entre com a id_usuario: ')
	opcao  = input('Entre com a opcao: 1=registrar 2=abandonar 3 =seguir 4 =deixar')
	if(opcao ==1)	registrar()
	if(opcao ==2)abandonar(id_usuario)
	if(opcao ==3)seguir(id_usuario)
	if(opcao ==4)deixar(id_usuario)
