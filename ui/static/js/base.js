/* Funções Básicas */

/* Lê um cookie do usuário */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* Executa o método HTTP-GET assíncrono */
function httpGet(url) {
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

/* Baixa um dado JSON assincronizadamente */
function jsonGet(url) {
    return new Promise(function(res, rej) {
        httpGet(url).then(function(resp) {
            var jsondata = JSON.parse(resp);
            res(jsondata);
        }), function() {
            rej();
        }
    });
}

/* Converte um objeto JSON numa lista de parametros para o método HTTP-Get */
function paramToGet(params) {
    return "?" + Object
        .keys(params)
        .map(function(key) {
            return key+"="+encodeURIComponent(params[key])
        }).join("&");
};