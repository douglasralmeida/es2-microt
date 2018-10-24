/* Authentication module */

function Credencial(apelido) {
    return {apelido: apelido};
}

function checarApelido(apelido) {
    url = 'https://mtusuarios.herokuapp.com/usuario/verificar/' + apelido;

    return new Promise(function(res, rej) {
        httpGet(url).then(function(resp) {
            var data = JSON.parse(resp);G
            res(data.quantidade === 0);
        }), function(err) {
            rej(err);
        }
    });
};

function entrarSistema(token) {
    url = window.location.origin + '/autenticar' + paramToGet(token);
    window.location.replace(url);
};

function sairSistema() {
    url = window.location.origin + '/sair';

    return new Promise(function(res, rej) {
        httpGet(url).then(function(resp) {
            res(resp);
        }), function(err) {
            rej(Error('Erro na saída.'));
        }
    });
};