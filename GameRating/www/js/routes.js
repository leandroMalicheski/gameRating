angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.buscarUsuRio', {
    url: '/buscarUsuario',
    views: {
      'side-menu21': {
        templateUrl: 'templates/buscarUsuRio.html',
        controller: 'buscarUsuRioCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('cadastro', {
    url: '/cadastro',
    templateUrl: 'templates/cadastro.html',
    controller: 'cadastroCtrl'
  })

  .state('menu.perfil', {
    url: '/perfil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.perfilUsuRio', {
    url: '/perfilUsuario?id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfilUsuRio.html',
        controller: 'perfilUsuRioCtrl'
      }
    }
  })

  .state('menu.editarPerfil', {
    url: '/editarPerfil',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarPerfil.html',
        controller: 'editarPerfilCtrl'
      }
    }
  })

  .state('esqueceuASenha', {
    url: '/esqueceuSenha',
    templateUrl: 'templates/esqueceuASenha.html',
    controller: 'esqueceuASenhaCtrl'
  })

  .state('menu.meusTPicos', {
    url: '/meusTopicos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/meusTPicos.html',
        controller: 'meusTPicosCtrl'
      }
    }
  })

  .state('menu.tPicosOcultos', {
    url: '/topicosOcultos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tPicosOcultos.html',
        controller: 'tPicosOcultosCtrl'
      }
    }
  })

  .state('menu.meusComentRios', {
    url: '/meusComentarios?id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/meusComentRios.html',
        controller: 'meusComentRiosCtrl'
      }
    }
  })

  .state('menu.comentRiosOcultos', {
    url: '/comentariosOcultos?id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/comentRiosOcultos.html',
        controller: 'comentRiosOcultosCtrl'
      }
    }
  })

  .state('menu.meusComentRios2', {
    url: '/meusTopicosComentario',
    views: {
      'side-menu21': {
        templateUrl: 'templates/meusComentRios2.html',
        controller: 'meusComentRios2Ctrl'
      }
    }
  })

  .state('menu.comentRiosOcultos2', {
    url: '/topicosComentariosOcultos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/comentRiosOcultos2.html',
        controller: 'comentRiosOcultos2Ctrl'
      }
    }
  })

  .state('menu.editarTPico', {
    url: '/editarTopico?id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarTPico.html',
        controller: 'editarTPicoCtrl'
      }
    }
  })

  .state('menu.editarComentRio', {
    url: '/editarComentario?id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarComentRio.html',
        controller: 'editarComentRioCtrl'
      }
    }
  })

  .state('menu.cadastrarJogo', {
    url: '/cadastrarJogo',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cadastrarJogo.html',
        controller: 'cadastrarJogoCtrl'
      }
    }
  })

  .state('menu.jogo', {
    url: '/jogoRating?id',
    views: {
        'side-menu21': {
        	templateUrl: 'templates/jogo.html',
        	controller: 'jogoCtrl'
        }
    }
  })

  .state('menu.jogo2', {
    url: '/jogo?id',
    views: {
        'side-menu21': {
          templateUrl: 'templates/jogo2.html',
          controller: 'jogo2Ctrl'
        }
      }
  })

  .state('menu.jogo3', {
    url: '/jogoForum?id',
    views: {
        'side-menu21': {
        	templateUrl: 'templates/jogo3.html',
        	controller: 'jogo3Ctrl'
        }
    }
  })

  .state('menu.configuraEs', {
    url: '/configuracoes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/configuraEs.html',
        controller: 'configuraEsCtrl'
      }
    }
  })

  .state('menu.tempoDeFechamento', {
    url: '/fechamentoTopico',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tempoDeFechamento.html',
        controller: 'tempoDeFechamentoCtrl'
      }
    }
  })

  .state('menu.calculoDeRate', {
    url: '/calculoRate',
    views: {
      'side-menu21': {
        templateUrl: 'templates/calculoDeRate.html',
        controller: 'calculoDeRateCtrl'
      }
    }
  })

  .state('menu.relatRios', {
    url: '/relatorios',
    views: {
      'side-menu21': {
        templateUrl: 'templates/relatRios.html',
        controller: 'relatRiosCtrl'
      }
    }
  })

  .state('menu.tPico', {
    url: '/topico?id',
    views: {
        'side-menu21': {
        	templateUrl: 'templates/tPico.html',
        	controller: 'tPicoCtrl'
        }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});