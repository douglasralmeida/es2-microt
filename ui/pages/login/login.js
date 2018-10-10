/* Login Page View-model */

function AppViewModel() {
    this.apelido = ko.observable("");
    this.apelidoVazio = ko.observable(false);
    this.estaConectando = ko.observable(false);

    this.submeterDados = function() {
        var self = this;
        var usuario = self.apelido();
        if (usuario.length == 0) {
          self.apelidoVazio(true);
          return false;
        }
        self.apelidoVazio(false);
    };
}

// Ativar knockout.js
ko.applyBindings(new AppViewModel());

//<input class="botao" type="submit" value="Conectar" data-bind="click: efetuarLogin">