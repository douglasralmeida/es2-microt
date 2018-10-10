/* Login Page View-model */

ko.validation.init({
    insertMessages: false,
    decorateInputElement: true,
    writeInputAttributes: true,
    errorElementClass: "erro"
});

ko.validation.rules['nomeJaUtilizado'] = {
    async: true,
    validator: function ( val, parms, callback ) { 
        var defaults = {
            url: '/usuario/verificar/'+val,
            type: 'POST',
            success: function(data) {
              callback(true);
            }
        }
        var options = $.extend( defaults, parms );
        $.ajax(options);
    },
    message: 'O apelido informado já está sendo utilizado. Informe outro.'
};

ko.validation.registerExtenders();

function AppViewModel() {
    var self = this;

    //inicializar objetos observáveis
    self.apelido = ko.observable("");
    self.apelidoJaExiste = ko.observable(false);
    self.apelidoVazio = ko.observable(false);
    self.bio = ko.observable("");
    self.estaConectando = ko.observable(false);
    self.nome = ko.observable("");
    self.nomeVazio = ko.observable(false);
    self.novoApelido = ko.observable("").extend({
        required: {params: true, message: "Insira um novo apelido antes de continuar."}});

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
        return false;
    }
    self.voltar = function() {
        if (self.formAtual() > 1)
            self.alterarform(self.formAtual() - 1);
    }
    self.cadastrar = function() {
        self.alterarform(2);
    }
    self.finalizar = function() {
        alert("TODO: Cadastar usuário e Ir para TimeLine");
    }
    self.alterarform = function(proxform) {
        var validationObservable = "form" + self.formAtual();
        if (self[validationObservable].isValid()) {
            self.formAtual(proxform);
            return true;
        }
    }

    //logar no aplicativo
    this.submeterDados = function() {
        var usuario = self.apelido();
        if (usuario.length == 0) {
          self.apelidoVazio(true);
          return false;
        }
        self.apelidoVazio(false);
    };
};

// Ativar knockout.js
ko.applyBindings(new AppViewModel());

//<input class="botao" type="submit" value="Conectar" data-bind="click: efetuarLogin">