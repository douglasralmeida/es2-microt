/* Login Page View-model */

function cadastrarUsuario(apelido, nome, bio) {
    var params = {
        apelido: apelido,
        nome: nome,
        bio: bio
    };
    var urlcadastro = 'https://mtusuarios.herokuapp.com/usuario/registrar' + paramToGet(params);

    return new Promise(function(res, rej) {
        httpGet(urlcadastro).then(function() {
            res();
        }), function(err) {
            console.error("Falha no cadastro de usuário.", err);
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

ko.validation.rules['nomeJaUtilizado'] = {
    async: true,
    validator: function (val, param, callback) {
        checarApelido(val).then(function(res) {
            callback(res);
        }, function(err) {
            console.error("Falha na verficiação de apelido.", err);
            callback(false);
        });
    },
    message: 'O apelido informado já está sendo utilizado. Informe outro.'
};

ko.validation.rules['apelidoNaoExiste'] = {
    async: true,
    validator: function (val, param, callback) {
        checarApelido(val).then(function(res) {
            callback(!res);
        }, function(err) {
            console.error("Falha na verficiação de apelido.", err);
            callback(false);
        });
    },
    message: 'O apelido informado não existe. Informe outro.'
};

ko.validation.registerExtenders();

function AppViewModel() {
    var self = this;

    //inicializar objetos observáveis
    self.apelido = ko.observable("").extend({
        required: {params: true, message: "Insira seu apelido antes de conectar."},
        apelidoNaoExiste: {data: self}
    });
    self.bio = ko.observable("");
    self.estaProcessando = ko.observable(false);
    self.nome = ko.observable("").extend({
        required: {params: true, message: "Digite seu nome completo antes de continuar."}
    });
    self.novoApelido = ko.observable("").extend({
        required: {params: true, message: "Insira um novo apelido antes de continuar."},
        nomeJaUtilizado: {data: self}
    });
    self.novoApelidoProcessando = ko.observable(false);

    //inicializar validadores de objetos observáveis
    //form1 = formulário de login
    self.form1 = ko.validatedObservable({
        apelido: self.apelido
    });

    //form2 = formulário de cadastro
    self.form2 = ko.validatedObservable({
        apelido: self.novoApelido
    });

    //form3 = formulário de dados básicos
    self.form3 = ko.validatedObservable({
        nome: self.nome,
        bio: self.bio
    })

    //formulário inicial
    self.formAtual = ko.observable(1);

    //funções genéricas dos formulários
    self.continuar = function() {
        if (self.formAtual() < 3)
            self.alterarform(self.formAtual() + 1);
    }
    self.voltar = function() {
        if (self.formAtual() > 1)
            self.alterarform(self.formAtual() - 1);
    }    
    self.finalizar = function() {
        var validationObservable = "form" + self.formAtual();
        if (self[validationObservable].isValid()) {
            var novoApelido = self.novoApelido();
            var bio = self.bio();
            var nome = self.nome();

            cadastrarUsuario(novoApelido, nome, bio).then(function(){
                credencial = Credencial(self.apelido());
                entrarSistema(credencial);
            });
        } else {
            self[validationObservable].errors.showAllMessages();
            return false;
        }
    }
    self.alterarform = function(proxform) {
        var validationObservable = "form" + self.formAtual();
        if (self[validationObservable].isValid()) {
            self.formAtual(proxform);
            return true;
        } else {
            self[validationObservable].errors.showAllMessages();
            return false;
        }
    }
    self.cadastrar = function() {
        self.formAtual(2);
    }

    //logar no aplicativo
    this.logar = function() {
        var validationObservable = "form" + self.formAtual();
        if (self[validationObservable].isValid()) {
            credencial = Credencial(self.apelido());
            entrarSistema(credencial);
        } else {
            self[validationObservable].errors.showAllMessages();
            return false;
        }
    };
};

// Ativar knockout.js
ko.applyBindings(new AppViewModel());