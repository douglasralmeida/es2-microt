/* Login Page View-model */

function get(url) {
    return new Promise(function(res, rej) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function() {
            if (req.status == 200) {
                var data = JSON.parse(req.responseText)
                res(data.quantidade === 0)
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

ko.validation.rules['nomeJaUtilizado'] = {
    validator: function (val) { 
        get('https://mtusuarios.herokuapp.com/usuario/verificar/'+val).then(function(res) {
            return res;
        }, function(err) {
            console.error("Falha na verficiação de apelido.", err);
            return false;
        });
    },
    message: 'O apelido informado já está sendo utilizado. Informe outro.'
};

ko.validation.registerExtenders();

function AppViewModel() {
    var self = this;

    //inicializar objetos observáveis
    self.apelido = ko.observable("").extend({
        required: {params: true, message: "Insira seu apelido antes de conectar."}
    });
    self.apelidoJaExiste = ko.observable(false);
    self.bio = ko.observable("");
    self.estaProcessando = ko.observable(false);
    self.nome = ko.observable("").extend({
        required: {params: true, message: "Digite seu nome completo antes de continuar."}
    })
    self.novoApelido = ko.observable("").extend({
        required: {params: true, message: "Insira um novo apelido antes de continuar."},
        nomeJaUtilizado: {data: self}
    });

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
    self.cadastrar = function() {
        self.formAtual(2);
    }
    self.finalizar = function() {
        var validationObservable = "form" + self.formAtual();
        if (self[validationObservable].isValid()) {
            alert("TODO: Cadastar usuário e Ir para TimeLine");
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

    //logar no aplicativo
    this.logar = function() {
        var validationObservable = "form" + self.formAtual();
        if (self[validationObservable].isValid()) {
            alert("TODO: Logar");
        } else {
            self[validationObservable].errors.showAllMessages();
            return false;
        }
    };
};

// Ativar knockout.js
ko.applyBindings(new AppViewModel());