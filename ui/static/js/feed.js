/* Feed Page View-model */

const PAINEL_POSTAGENS = 0;
const PAINEL_SEGUINDOS = 1;
const PAINEL_SEGUIDORES = 2;

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

function getUsuarioSeguidores(uid) {
    var url = 'https://mtusuarios.herokuapp.com/usuario/seguidores/' + uid;

    return new Promise(function(res, rej) {
        jsonGet(url).then(function(data) {
            tratarListaUsuarios(data);
            res(data);
        }), function(err) {
            console.error("Falha na obteção dos seguidores do usuário.", err);
            rej();
        }
    });
}

function getUsuarioSeguindos(uid) {
    var url = 'https://mtusuarios.herokuapp.com/usuario/seguidos/' + uid;

    return new Promise(function(res, rej) {
        jsonGet(url).then(function(data) {
            tratarListaUsuarios(data);
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

function isUsuarioSeguindo(seguidor, seguido) {
    return new Promise(function(res, rej) {
        getUsuarioSeguindos(seguidor).then(function(data) {
            var len = data.length;
            for (i = 0; i < len; i++) {
                if (data[i].id_usuario == seguido)
                    res(true);
            }
            res(false);
        }), function() {
            rej()
        };
    });
}

function searchUsuario(valor) {
    var urlgetid = 'https://mtusuarios.herokuapp.com/usuario/getid/' + valor;
    var urlchecar = 'https://mtusuarios.herokuapp.com/usuario/verificar/' + valor;

    var url = window.location.origin + '/u/';

    promid = new Promise(function(res, rej) {
        jsonGet(urlgetid).then(function(data) {
            url = url + data.data.id_usuario;
            window.location.replace(url);
        }), function(err) {
            console.error("Falha na obteção do ID do usuário.", err);
            rej();
        }
    });

    return new Promise(function(res, rej) {
        jsonGet(urlchecar).then(function(data) {            
            if (data.quantidade === 1) {
                promid().then(function() {

                }, function() {
                    rej();
                });
            } else
                res(0);
        }), function(err) {
            console.error("Falha na checagem do usuário.", err);
            rej();
        }
    });
}

function tratarListaUsuarios(lista) {
    var len = lista.length;
    for (i = 0; i < len; i++) {
        lista[i].userurl = "/u/" + lista[i].id_usuario;   
    }
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

function sendPublicacao(uid, msg) {
    var url = 'https://mtmensagens.herokuapp.com/msg/postar';

    param = {uid: uid, conteudo: msg};
    url = url + paramToGet(param);

    return new Promise(function(res, rej) {
        httpGet(url).then(function() {
            res();
        }, function() {
            rej();
        });
    });
}

function setSeguirUsuario(seguidor, seguido, valor) {
    var urlseguir = 'https://mtusuarios.herokuapp.com/usuario/seguir/' + seguido;
    var urldeixarseguir = 'https://mtusuarios.herokuapp.com/usuario/deixar/' + seguido;
    var url;

    if (valor)
      url = urlseguir;
    else
      url = urldeixarseguir;

    param = {uid: seguidor};
    url = url + paramToGet(param);

    return new Promise(function(res, rej) {
        httpGet(url).then(function() {
            res();
        }), function() {
            rej();
        };
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
    self.listaUsuarios = ko.observableArray([]);
    self.usuarioId = ko.observable('');
    self.usuarioApelido = ko.observable('');
    self.usuarioBio = ko.observable('');
    self.usuarioNome = ko.observable('');
    self.usuarioUrl = ko.observable('');
    self.usuarioSeguindo = ko.observable(false);
    self.carregandoPerfil = ko.observable(true);
    self.carregandoDados = ko.observable(true);
    self.painelExibicao = ko.observable(PAINEL_POSTAGENS);
    self.exibirBarraSuperior = ko.observable(false);
    self.exibirSeguindo = ko.observable(false);
    self.numPostsPlaceHolders = ko.observableArray(['1', '2', '3']);
    self.textoBarraSuperior = ko.observable('');
    self.textoSeguir = ko.observable('');
    self.textoTituloPerfil = ko.observable('');
    self.textoPostagem = ko.observable('');
    self.textoPesquisa = ko.observable('');
    self.apelido = ko.observable('');
    self.uid = ko.observable('');

    self.getExibirFeed = function() {
        return (self.painelExibicao() == PAINEL_POSTAGENS) && (!self.carregandoDados()) && (feedagregado == 'True');
    };

    self.getExibirPosts = function() {
        return (self.painelExibicao() == PAINEL_POSTAGENS) && (!self.carregandoDados());
    };

    self.getExibirUsuario = function() {
        return (self.painelExibicao() != PAINEL_POSTAGENS) && (!self.carregandoDados());
    };

    self.clicarSeguir = function() {
        seguidor = self.uid();
        seguido = self.usuarioId();
        valor = !self.usuarioSeguindo();
        setSeguirUsuario(seguidor, seguido, valor).then(function() {
            self.atualizarUI();
        }, function() {
            alert("Deu erro");
        });
    };
    
    self.exibirMsg = function(msg) {
        self.textoBarraSuperior(msg);
        self.exibirBarraSuperior(true);
    };   

    self.exibirPostagens = function() {
        self.carregandoDados(true);
        getPostsIndividual(feeduid).then(function(data) {
            adicionarNome(data);
            self.carregandoDados(false);
            self.listaPosts(data);
            self.painelExibicao(PAINEL_POSTAGENS);
        });
    };

    self.exibirSeguidores = function() {
        self.carregandoDados(true);
        getUsuarioSeguidores(feeduid).then(function(data) {
            self.carregandoDados(false);
            self.listaUsuarios(data);
            self.painelExibicao(PAINEL_SEGUIDORES);
        });
    };

    self.exibirSeguindos = function() {
        self.carregandoDados(true);
        getUsuarioSeguindos(feeduid).then(function(data) {
            self.carregandoDados(false);
            self.listaUsuarios(data);
            self.painelExibicao(PAINEL_SEGUINDOS);
        });
    };

    self.pesquisar = function() {
        var pesquisa = self.textoPesquisa();
        var url = window.location.origin + '/u/';

        if (pesquisa.length > 0) {
            searchUsuario(pesquisa).then(function(data) {
                if (data > 0) {
                    url = url + data;
                    window.location.replace(url);
                }
            });
        }
        else {
            self.exibirMsg('Nenhum usuário foi encontrado com o apelido ' + pesquisa + '.');
        }
    };

    self.postar = function() {
        var postagem = self.textoPostagem();
        var uid = self.uid();

        if (postagem.length > 0) {
            self.carregandoDados(true);
            sendPublicacao(uid, postagem).then(function() {
                getPostsAgregado(feeduid).then(function(data) {
                    adicionarNome(data);
                    self.carregandoDados(false);
                    self.listaPosts(data);
                    self.textoPostagem('');
                }, function() {

                });
            });
        }
    };

    self.atualizarUI = function() {
        quemSouEu().then(function(data) {
            self.apelido(data.apelido);
            self.listaPosts([]);
            self.uid(data.uid);

            getUsuario(feeduid).then(function(usuario) {
                self.carregandoPerfil(false);
                self.usuarioApelido(usuario.apelido);
                self.usuarioBio(usuario.bio);
                self.usuarioNome(usuario.nome);
                self.usuarioId(feeduid);
                if (feeduid == data.uid)
                        self.textoTituloPerfil('Seu Perfil')
                    else
                        self.textoTituloPerfil('Perfil do Usuário')
                if (data.uid != feeduid) {
                    isUsuarioSeguindo(data.uid, feeduid).then(function(ret) {
                        self.usuarioSeguindo(ret);
                        if (ret)
                            self.textoSeguir('Deixar de seguir')
                        else
                            self.textoSeguir('Seguir');
                    });
                }
                else
                    self.usuarioSeguindo(false);
                self.exibirSeguindo(feeduid != data.uid);
                self.usuarioUrl("/u/"+feeduid);
            });

            if (feedagregado == 'True') {
                getPostsAgregado(feeduid).then(function(data) {
                    adicionarNome(data);
                    self.carregandoDados(false);
                    self.listaPosts(data);
                    self.painelExibicao(PAINEL_POSTAGENS);
                });
            } else {
                getPostsIndividual(feeduid).then(function(data) {
                    adicionarNome(data);
                    self.carregandoDados(false);
                    self.listaPosts(data);
                    self.painelExibicao(PAINEL_POSTAGENS);
                });
            }
        })
    }
    self.atualizarUI();
};

// Ativar knockout.js
ko.applyBindings(new AppViewModel());
