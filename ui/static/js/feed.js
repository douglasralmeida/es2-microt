/* Feed Page View-model */

function adicionarNome(data) {
    var len = data.length;
    for (i = 0; i < len; i++) {
        if (data[i].nome == "*")
            data[i].nome = "Você";
    }
}

function getUsuario(uid) {
    var url = 'https://mtusuarios.herokuapp.com/usuario/info/' + uid;

    return new Promise(function(res, rej) {
        jsonGet(url).then(function(data) {
            res(data);
        }), function(err) {
            console.error("Falha na obteção dos dados do usuário.", err);
            rej();
        }
    });
}

function getUsuarioSeguindos(uid) {
    var url = 'https://mtusuarios.herokuapp.com/usuario/seguidos/' + uid;

    return new Promise(function(res, rej) {
        jsonGet(url).then(function(data) {
            res(data);
        }), function(err) {
            console.error("Falha na obteção dos seguidos do usuário.", err);
            rej();
        }
    });    
}

function getPostsAgregado(uid) {
    var url = 'https://mtlt.herokuapp.com/lt/' + uid;

    return new Promise(function(res, rej) {
        jsonGet(url).then(function(data) {
            res(data);
        }), function(err) {
            console.error("Falha na obteção da timeline.", err);
            rej();
        }
    });
}

function getPostsIndividual(uid) {
    var url = 'https://mtlt.herokuapp.com/lt/usuario/' + uid;

    return new Promise(function(res, rej) {
        jsonGet(url).then(function(data) {
            res(data);
        }), function(err) {
            console.error("Falha na obteção da timeline individual.", err);
            rej();
        };
    });
}

function isUsuarioSeguindo(uidSeguidor, uidSeguindo) {
    return new Promise(function(res, rej) {
        getUsuarioSeguindos(uidSeguidor).then(function(data) {
            var len = data.length;
            for (i = 0; i < len; i++) {
                if (data[i].id_usuario == uidSeguindo)
                    res(true);
            }
            res(false);
        }), function() {
            rej()
        };
    });
}

function quemSouEu() {
    var url = window.location.origin + '/quemsoueu';

    return new Promise(function(res, rej) {
        jsonGet(url).then(function(data) {
            res(data);
        }), function(err) {
            console.error("Falha na obteção dos dados básicos.", err);
            rej();
        }
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
    self.listaPosts = ko.observableArray([]);
    self.usuarioId = ko.observable('');
    self.usuarioApelido = ko.observable('');
    self.usuarioBio = ko.observable('');
    self.usuarioNome = ko.observable('');
    self.usuarioUrl = ko.observable('');
    self.usuarioSeguindo = ko.observable(false);
    self.exibirSeguindo = ko.observable(false);
    self.apelido = ko.observable('');
    self.uid = ko.observable('');

    self.atualizarUI = function() {
        quemSouEu().then(function(data) {
            self.apelido(data.apelido);
            self.listaPosts([]);
            self.uid(data.uid);

            getUsuario(feeduid).then(function(usuario) {
                self.usuarioApelido(usuario.apelido);
                self.usuarioBio(usuario.bio);
                self.usuarioNome(usuario.nome);
                self.usuarioId(feeduid);
                if (data.uid != feeduid) {
                    isUsuarioSeguindo(data.uid).then(function(ret) {
                        self.usuarioSeguindo(ret);
                    });
                }
                else
                    self.usuarioSeguindo = false;
                self.exibirSeguindo(feeduid != data.uid);

                self.usuarioUrl("/u/"+feeduid);
            });

            if (self.uid() == feeduid) {
                getPostsAgregado(feeduid).then(function(data) {
                    adicionarNome(data);
                    self.listaPosts(data);
                });
            } else {
                getPostsIndividual(feeduid).then(function(data) {
                    adicionarNome(data);
                    self.listaPosts(data);
                });
            }
        })
    }
    self.atualizarUI();
};

// Ativar knockout.js
ko.applyBindings(new AppViewModel());