angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.buscarUsuRio', {
    url: '/buscarUsuario',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/buscarUsuRio.html',
        controller: 'buscarUsuRioCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu',
    cache: false,
    templateUrl: 'templates/menu.html',
    controller: 'menuController',
    abstract:true
  })

  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('cadastro', {
    url: '/cadastro',
    cache: false,
    templateUrl: 'templates/cadastro.html',
    controller: 'cadastroCtrl'
  })

  .state('menu.perfil', {
    url: '/perfil',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.perfilUsuRio', {
    url: '/perfilUsuario?id',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfilUsuRio.html',
        controller: 'perfilUsuRioCtrl'
      }
    }
  })

  .state('menu.editarPerfil', {
    url: '/editarPerfil',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarPerfil.html',
        controller: 'editarPerfilCtrl'
      }
    }
  })

  .state('esqueceuASenha', {
    url: '/esqueceuSenha',
    cache: false,
    templateUrl: 'templates/esqueceuASenha.html',
    controller: 'esqueceuASenhaCtrl'
  })

  .state('menu.meusTPicos', {
    url: '/meusTopicos',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/meusTPicos.html',
        controller: 'meusTPicosCtrl'
      }
    }
  })

  .state('menu.tPicosOcultos', {
    url: '/topicosOcultos',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/tPicosOcultos.html',
        controller: 'tPicosOcultosCtrl'
      }
    }
  })

  .state('menu.meusComentRios', {
    url: '/meusComentarios?id',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/meusComentRios.html',
        controller: 'meusComentRiosCtrl'
      }
    }
  })

  .state('menu.comentRiosOcultos', {
    url: '/comentariosOcultos?id',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/comentRiosOcultos.html',
        controller: 'comentRiosOcultosCtrl'
      }
    }
  })

  .state('menu.meusComentRios2', {
    url: '/meusTopicosComentario',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/meusComentRios2.html',
        controller: 'meusComentRios2Ctrl'
      }
    }
  })

  .state('menu.comentRiosOcultos2', {
    url: '/topicosComentariosOcultos',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/comentRiosOcultos2.html',
        controller: 'comentRiosOcultos2Ctrl'
      }
    }
  })

  .state('menu.editarTPico', {
    url: '/editarTopico?id',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarTPico.html',
        controller: 'editarTPicoCtrl'
      }
    }
  })

  .state('menu.editarComentRio', {
    url: '/editarComentario?id',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarComentRio.html',
        controller: 'editarComentRioCtrl'
      }
    }
  })

  .state('menu.cadastrarJogo', {
    url: '/cadastrarJogo',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/cadastrarJogo.html',
        controller: 'cadastrarJogoCtrl'
      }
    }
  })

  .state('menu.jogo', {
    url: '/jogoRating?id',
    cache: false,
    views: {
        'side-menu21': {
        	templateUrl: 'templates/jogo.html',
        	controller: 'jogoCtrl'
        }
    }
  })

  .state('menu.jogo2', {
    url: '/jogo?id',
    cache: false,
    views: {
        'side-menu21': {
          templateUrl: 'templates/jogo2.html',
          controller: 'jogo2Ctrl'
        }
      }
  })

  .state('menu.jogo3', {
    url: '/jogoForum?id',
    cache: false,
    views: {
        'side-menu21': {
        	templateUrl: 'templates/jogo3.html',
        	controller: 'jogo3Ctrl'
        }
    }
  })

  .state('menu.configuraEs', {
    url: '/configuracoes',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/configuraEs.html',
        controller: 'configuraEsCtrl'
      }
    }
  })

  .state('menu.tempoDeFechamento', {
    url: '/fechamentoTopico',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/tempoDeFechamento.html',
        controller: 'tempoDeFechamentoCtrl'
      }
    }
  })

  .state('menu.calculoDeRate', {
    url: '/calculoRate',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/calculoDeRate.html',
        controller: 'calculoDeRateCtrl'
      }
    }
  })

  .state('menu.relatRios', {
    url: '/relatorios',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/relatRios.html',
        controller: 'relatRiosCtrl'
      }
    }
  })

  .state('menu.tPico', {
    url: '/topico?id',
    cache: false,
    views: {
        'side-menu21': {
        	templateUrl: 'templates/tPico.html',
        	controller: 'tPicoCtrl'
        }
    }
  })
  
  .state('menu.editarJogo', {
    url: '/editarJogo?id',
    cache: false,
    views: {
        'side-menu21': {
        	templateUrl: 'templates/editarJogo.html',
        	controller: 'editarJogoCtrl'
        }
    }
  })
  
  .state('menu.cadastrarTopico', {
    url: '/cadastrarTopico?id',
    cache: false,
    views: {
        'side-menu21': {
        	templateUrl: 'templates/cadastrarTopico.html',
        	controller: 'cadastrarTopicoCtrl'
        }
    }
  })
  
  .state('menu.comentario', {
    url: '/comentario?id',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/comentario.html',
        controller: 'comentarioCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')
});