/* Authentication module */

function Credencial(apelido) {
    return {apelido: apelido};
}

function httpget(url) {
    return new Promise(function(res, rej) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function() {
            if (req.status == 200) {
                res(req.responseText)
            } else {
                rej(Error(req.statusText));
            };
        };
        req.onerror = function() {
            rej(Error('Erro de rede'));
        }
        req.send();
    });
};

function paramToGet(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key+"="+encodeURIComponent(params[key])
        }).join("&");
};

function checarApelido(apelido) {
    url = 'https://mtusuarios.herokuapp.com/usuario/verificar/' + apelido;

    return new Promise(function(res, rej) {
        httpget(url).then(function(resp) {
            var data = JSON.parse(resp);
            res(data.quantidade === 0);
        }), function(err) {
            rej(err);
        }
    });
};

function entrarSistema(token) {
    url = window.location.origin + '/autenticar' + paramToGet(token);

    //window.location.replace(url);
    return new Promise(function(res, rej) {
        httpget(url).then(function(resp) {
            console.log(resp);
        }), function(err) {
            rej(Error('Erro na autenticação.'));
        }
    });
};

function sairSistema(apelido) {
    url = window.location.origin + '/sair';

    return new Promise(function(res, rej) {
        httpget(url).then(function(resp) {
            res(resp);
        }), function(err) {
            rej(Error('Erro na saída.'));
        }
    });
};