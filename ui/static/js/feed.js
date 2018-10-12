/* Feed Page View-model */

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

ko.validation.init({
    insertMessages: false,
    decorateInputElement: true,
    writeInputAttributes: true,
    errorElementClass: "erro",
    messagesOnModified: true
});

function obterFeedGeral(uid) {
    var url = 'https://mtlt.herokuapp.com/lt/' + uid;

    return new Promise(function(res, rej) {
        httpget(url).then(function() {
            res();
        }), function(err) {
            console.error("Falha na obteção da linha do tempo.", err);
            rej();
        }
    });
}

function AppViewModel() {
    var self = this;

    //inicializar objetos observáveis
    //this.TodosPosts = ko.observableArray();
    this.todosPosts = ko.observableArray([{"conteudo":"Uma mensagem qualquer1","usuario":4}]);

};

// Ativar knockout.js
ko.applyBindings(new AppViewModel());