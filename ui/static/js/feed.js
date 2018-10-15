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

function baixarPosts(id) {
    return new Promise(function(res, rej) {
        var url = '';
        var data = [{"conteudo":"Uma mensagem qualquer1","usuario":4},
                    {"conteudo":"Uma mensagem qualquer2","usuario":5}];
        res(data);
    });
}

ko.validation.init({
    insertMessages: false,
    decorateInputElement: true,
    writeInputAttributes: true,
    errorElementClass: "erro",
    messagesOnModified: true
});

function AppViewModel() {
    var self = this;

    //inicializar objetos observáveis
    self.todosPosts = ko.observableArray([]);
    self.usuarioNome = ko.observable('Nome Usuario');

    self.atualizarPosts = function() {
        self.todosPosts([]);
        baixarPosts(0).then(function(data) {
            self.todosPosts(data);
        });
    }

    self.atualizarPosts();
};

// Ativar knockout.js
ko.applyBindings(new AppViewModel());