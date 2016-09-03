angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	console.log("Carreguei a Home!")
	$scope.jogosMock;
	$scope.showJogos = false;
	
	$scope.search = function(busca){		
		if(busca === undefined){
			$scope.buscaVaziaPopup()
		}else{
			console.log("Chamei a Busca")
			console.log(busca)
			if(busca === "bf"){
				$scope.showJogos = true;
				$scope.jogosMock = [{id:1,titulo:"Hardline"},{id:2,titulo:"Hardline 2"}]			
			}else{
				$scope.jogoNaoEncotradoPopup()
			}
		}
	}
	
	$scope.buscaVaziaPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Busca Vazia',
			template: 'Favor informar um jogo'
		});
	}
	
	$scope.jogoNaoEncotradoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Jogo Não Encontrado',
			template: 'Nenhum jogo foi encontrado para esta busca'
		});
	}

}])
   
.controller('buscarUsuRioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Tela de buscar usuario!")
	$scope.search = function(){		
		console.log("Chamei a Busca")
		console.log($scope.search.value)
	}
	
	console.log("Carreguei a Home!")
	$scope.usuariosMock;
	$scope.showUsuarios = false;
	
	$scope.search = function(busca){		
		console.log("Chamei a Busca")
		console.log(busca)
		$scope.showUsuarios = true;
		$scope.usuariosMock = [{id:1,usuario:"Eu"},{id:2,usuario:"Outro"}]
	}

}])
      
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $ionicPopup) {	
		
	$scope.login = function(usuario){
		if(usuario === undefined){
			$scope.loginSenhaInvalido()			
		}
		else if($scope.validaLogin(usuario)){
			$state.go("menu.home", {})		
		}else{
			$scope.loginSenhaInvalido()
		}
	}
	
	$scope.validaLogin = function(usuario){
		if(usuario.login === undefined){
			console.log("Login vazio")
			return false
		}else if(usuario.senha === undefined){
			console.log("Senha vazia")
			return false
		}else{
			console.log("Vou validar o usuario abaixo:")
			console.log(usuario)
			return true;			
		} 
	}
	
	$scope.loginSenhaInvalido = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Login Invalido',
			template: 'Login e Senha incorretos/vazios'
		});
	}

}])
   
.controller('cadastroCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	console.log("Carreguei a Tela de Cadastro")
	
	$scope.carregarImagem = function(){
		console.log("carregarImagem")
	}
	
	$scope.cadastrar = function(usuario){
		if(usuario === undefined){
			$scope.preenchaCamposPopup()
		}else if($scope.validaCampos(usuario)){
			console.log("Vou cadastrar esse usuario:")
			console.log(usuario)			
		}
	}
	
	$scope.validaCampos = function(usuario){
		var validade = true
		if(usuario.nome === undefined){
			$scope.preenchaCamposPopup()
			validade = false
		}else
		if (!$scope.validaEmail(usuario.email)){
			validade = false
		}else
		if (!$scope.validaUsuario(usuario.login)){
			validade = false
		}else
		if (!$scope.validaSenha(usuario)){
			validade = false
		}else
		if (usuario.resposta === undefined){
			$scope.preenchaCamposPopup()
			validade = false
		}
		return validade
	}
	
	$scope.validaSenha = function(usuario){
		var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		if(usuario.senha === undefined && usuario.confirmacaoSenha === undefined){
			$scope.preenchaCamposPopup()
			return false
		}else if (usuario.senha === usuario.senhaConfirmacao){
			if(mediumRegex.test(usuario.senha)){
				return true
			}else{
				$scope.senhaFracaPopup()
			}
		}else{
			$scope.senhasDiferentesPopup()
		}
	}
	
	$scope.senhasDiferentesPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Senhas Diferentes',
			template: 'Tenha certeza que suas senhas sejam iguais'
		});
	}
	
	$scope.senhaFracaPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Senha Fraca',
			template: 'Tenha certeza que sua senha contém Caracteres Especiais, Numeros e letras maiúsculas e minúsculas'
		});
	}
	
	$scope.validaEmail = function(email){
		if(email === undefined){
			$scope.preenchaCamposPopup()
			return false
		}else{
			if (email.indexOf('@') === -1 || email.indexOf('.com') === -1){
				$scope.emailInvalidoPopup()
				return false
			}else{
				return true
			}
		}
	}
	
	$scope.validaUsuario = function(usuario){
		if(usuario === undefined){
			$scope.preenchaCamposPopup()
		}else{
			if(usuario === "leandro"){
				return true
			}else{
				$scope.usuarioInvalidoPopup()
			}			
		}
	}
	
	$scope.usuarioInvalidoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Usuário Inválido',
			template: 'O usuário já encontra-se em uso'
		});
	}
	
	$scope.emailInvalidoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Email Inválido',
			template: 'Favor preenchar um email válido'
		});
	}
	
	$scope.preenchaCamposPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Campos Obrigatórios',
			template: 'Preencha os campos Obrigatórios'
		});
	}
	
}])
   
.controller('perfilCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	$scope.perfilMock;
	
	$scope.desabilitarPopup = function(){
		var desabilitar = "desabilitar"
			var confirmPopup = $ionicPopup.confirm({
			       title: 'Desabilitar perfil',
			       template: 'Quer ' + desabilitar + ' o seu perfil ?'
			     });
			confirmPopup.then(function(res) {
				if(res) {
					$scope.disable();
				} else {
					console.log('Cancelar');
				}
			});
	}
	
	$scope.disable = function(){
		console.log("Vou Desabilitar Você!!")
	}
	$scope.carregarPerfil = function(){
		console.log("Carreguei o Perfil do usuario")
		$scope.perfilMock = {nome:"leandro",email:"leandro.Malicheski@gmail.com",usuario:"leandroMalicheski",resposta:"Bob",imagePath:"teste"}
		console.log($scope.perfilMock)
	}
	
	
}])
  
.controller('perfilUsuRioCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	$scope.perfil
	$scope.carregarPerfilUsuario = function(){
		console.log("Carreguei o perfil do usuario com id:")
		console.log($stateParams.id)
		$scope.perfil = {id:1,usuario:"leandroMalicheski",topicos:2,comentarios:4,likes:15,dislikes:3}
	}
	
	$scope.transformarModeradorPopup = function(){
		var moderador = "transformar"
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Transformar em moderador',
		       template: 'Quer ' + moderador + ' o usuario em moderador ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.transformarModerador();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.transformarModerador = function(){
		console.log("Vou transformar ou remover em moderador")
	}
	
	
	$scope.alterarSenhaPopup = function(){
			var confirmPopup = $ionicPopup.confirm({
			       title: 'Alterar Senha',
			       template: 'Deseja alterar a senha do usuario ?'
			     });
			confirmPopup.then(function(res) {
				if(res) {
					$scope.alterarSenha();
				} else {
					console.log('Cancelar');
				}
			});
	}
	
	$scope.alterarSenha = function(){
		console.log("Vou alterar a Senha:")
	}
	
	$scope.desabilitarPopup = function(){
		var habilitado = "habilitar" 
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Desabilitar',
		       template: 'Quer ' + habilitado + ' o usuario ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.desabilitar();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.desabilitar = function(){
		console.log("Vou desabilitar ou Habilitar")
	}
	
	$scope.bloquearPopup = function(){
		var bloquear = "bloquear" 
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Bloquear',
		       template: 'Quer ' + bloquear + ' o usuario ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.bloquear();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.bloquear = function(){
		console.log("Vou bloquear ou desbloquear")
	}
	
	$scope.like = function (){
		console.log("Vou dar like")
		console.log("Antes:")
		console.log($scope.perfil.likes)
		$scope.perfil.likes = $scope.perfil.likes+1
		console.log("Depois:")
		console.log($scope.perfil.likes)
	}
	$scope.dislike = function (){
		console.log("Vou dar dislike")
		console.log("Antes:")
		console.log($scope.perfil.dislikes)
		$scope.perfil.dislikes = $scope.perfil.dislikes+1
		console.log("Depois:")
		console.log($scope.perfil.dislikes)
	}

}])
   
.controller('editarPerfilCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	$scope.perfil
	$scope.carregarPerfil = function(){
		console.log("Carreguei o perfil editar o Perfil")
		$scope.perfil = {nome:"leandro",email:"leandro.Malicheski@gmail.com",usuario:"leandroMalicheski",resposta:"Bob",imagePath:"teste",senha:"123",senhaI:"123"}
		console.log($scope.perfil)
	}
	
	$scope.salvarPopup = function(perfil){
		var desabilitar = "desabilitar"
			var confirmPopup = $ionicPopup.confirm({
			       title: 'Salvar',
			       template: 'Quer salvar suas alterações ?'
			     });
			confirmPopup.then(function(res) {
				if(res) {
					$scope.salvar(perfil);
				} else {
					console.log('Cancelar');
				}
			});
	}
	
	$scope.alterarSenhaPopup = function(){
		$scope.data = {}
		var myPopup = $ionicPopup.show({
		       title: 'Alterar a senha',
		       template: 'Nova Senha:<input type="password" ng-model="data.senha"> <br> Confirmar Nova Senha:<input type="password" ng-model="data.confirmarSenha" > <br> Antiga Senha:<input type="password" ng-model="data.senhaAntiga" > ',
		       scope: $scope,
		       buttons: [{
		           text: 'Cancel'
		        }, {
		        	text: '<b>Salvar</b>',
		            type: 'button-positive',
		            onTap: function(e) {
			            if (!$scope.data.senha) {
			            	e.preventDefault();
			            } else {
			            	$scope.alterarSenha($scope.data)
			            }
		           }
		        }, ]
		});
	}
	
	$scope.alterarSenha = function(data){
		console.log("Vou Alterar a senha")
		console.log(data)
	}
	
	$scope.salvar = function(perfil){
		console.log("vou Salvar esse cara!")
		console.log(perfil)
	}
	
	$scope.carregarImagem = function(){
		console.log("Carregar Imagem")
	}

}])
   
.controller('esqueceuASenhaCtrl', ['$scope', '$stateParams',  '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	console.log("carreguei a Tela de Esqueci minha senha")
	
	$scope.solicitarSenha = function(resposta) {
		if(resposta === undefined){
			$scope.informeRespostaPopup()
		}else{
			if($scope.validaResposta(resposta)){
				console.log("Vou enviar uma senha, a resposta foi:")
				console.log(resposta)			
			}else{
				$scope.informeRespostaPopup()
			}
		}		
	}
	
	$scope.validaResposta = function(resposta){
		if(resposta === "dog"){
			return true
		}else{
			return false;
		}
	}
	
	$scope.informeRespostaPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Resposta inválida',
			template: 'Resposta incorreta ou vazia'
		});
	}

}])
   
.controller('meusTPicosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.topicosMock 
	
	$scope.carregarTopicos = function(){
		console.log("Carreguei os Topicos")
		$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
		console.log($scope.topicosMock)		
	}
	
}])
   
.controller('tPicosOcultosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var id = $stateParams.id
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a Tela de Topicos Ocultos")
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)
}])
   
.controller('meusComentRiosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.comentariosMock;
	
	$scope.carregarComentarios = function(){
		$scope.comentariosMock = [{id:1,corpo:"Corpo do comentario 1"},{id:2,corpo:"Corpo do comentario 2"},{id:3,corpo:"Corpo do comentario 3"}]
		console.log("Carreguei a Tela de Comentarios")
		console.log("cheguei e estou com id abaixo:")
		console.log($stateParams.id)		
	}

}])
   
.controller('comentRiosOcultosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var id = $stateParams.id
	$scope.comentariosMock = [{id:1,corpo:"Corpo do comentario 1",checked:true},{id:2,corpo:"Corpo do comentario 2",checked:false},{id:3,corpo:"Corpo do comentario 3",checked:false}]
	console.log("Carreguei a Tela de Comentarios Ocultos")
	console.log("cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.ocultar = function(){
		console.log("Vou ocultar o comentario")
	}
	
	$scope.remover = function(){
		console.log("Vou remover o comentario")
	}
}])
   
.controller('meusComentRios2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.topicosMock
	
	$scope.carregarTopicos = function (){
		$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
		console.log("Carreguei a Tela dos meus topicos/comentarios")
		console.log($scope.topicosMock)		
	}
	
}])
   
.controller('comentRiosOcultos2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a tela de Comentarios Ocultos")
	console.log($scope.topicosMock)
}])
   
.controller('editarTPicoCtrl', ['$scope', '$stateParams','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	$scope.topicoMock
	
	$scope.carregarTopico = function(){
		console.log("Carreguei o topico com o id:")
		console.log($stateParams.id)
		
		$scope.topicoMock = {id:1,titulo:"Titulo do Topico",corpo:"Corpo do tópico"}
	}
	
	$scope.fecharPopup = function (){
		var fechar = "fechar"
			var confirmPopup = $ionicPopup.confirm({
			       title: 'Fechar Topico',
			       template: 'Quer ' + fechar + ' este topico ?'
			     });
			confirmPopup.then(function(res) {
				if(res) {
					$scope.fechar();
				} else {
					console.log('Cancelar');
				}
			});
	}
	
	$scope.fechar = function(){
		console.log("Vou fechar o Tópico")
	}
	
	$scope.removerPopup = function (){
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Apagar Topico',
		     template: 'Quer apagar este topico ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.remover();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.remover = function(){
		console.log("Vou remover o Tópico")
	}
	
	$scope.addLinkPopup = function(topicoNovo){
		$scope.data = {}
		var myPopup = $ionicPopup.show({
		       title: 'Adicionar Link',
		       template: 'Link:<input type="text" ng-model="data.link" placeholder="cole o link aqui">',
		       scope: $scope,
		       buttons: [{
		           text: 'Cancel'
		        }, {
		        	text: '<b>Adicionar</b>',
		            type: 'button-positive',
		            onTap: function(e) {
			            if (!$scope.data.link) {
			            	e.preventDefault();
			            } else {
			            	topicoNovo.corpo = topicoNovo.corpo + ' ' + $scope.data.link  
			            	$scope.addLink(topicoNovo)
			            }
		           }
		        }, ]
		});
	}
	
	$scope.addLink = function(topicoNovo){
		console.log("Vou adicionar um link")
		console.log(topicoNovo)
	}
	$scope.adicionarImagem = function(topicoNovo){
		console.log("Vou adicionar Imagem o Tópico")
		console.log(topicoNovo)
	}
	
	$scope.salvarPopup = function (topicoNovo){
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Salvar Alterações',
		     template: 'Salvar suas alterações ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.salvar(topicoNovo);
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.salvar = function(topicoNovo){
		console.log("Vou salvar o Tópico")
		console.log(topicoNovo)
	}

}])
   
.controller('editarComentRioCtrl', ['$scope', '$stateParams', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup) {
	$scope.cometarioMock

	$scope.carregarComentario = function(){
		$scope.cometarioMock = {id:1,corpo:"Corpo do Comentario"}
		console.log("Carreguei a Tela de editar comentarios")
		console.log("Cheguei e estou com id abaixo:")
		console.log($stateParams.id)		
	}
	
	$scope.addLinkPopup = function(topicoNovo){
		$scope.data = {}
		var myPopup = $ionicPopup.show({
		       title: 'Adicionar Link',
		       template: 'Link:<input type="text" ng-model="data.link" placeholder="cole o link aqui">',
		       scope: $scope,
		       buttons: [{
		           text: 'Cancel'
		        }, {
		        	text: '<b>Adicionar</b>',
		            type: 'button-positive',
		            onTap: function(e) {
			            if (!$scope.data.link) {
			            	e.preventDefault();
			            } else {
			            	topicoNovo.corpo = topicoNovo.corpo + ' ' + $scope.data.link  
			            	$scope.addLink(topicoNovo)
			            }
		           }
		        }, ]
		});
	}
	
	$scope.addLink = function(topicoNovo){
		console.log("Vou adicionar um link")
		console.log(topicoNovo)
	}
	
	$scope.removerPopup = function (){
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Apagar Comentário',
		     template: 'Quer apagar este comentário ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.remover();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.remover = function(){
		console.log("Vou remover o Comentario")
	}
	
	$scope.adicionarImagem = function(topicoNovo){
		console.log("Vou adicionar Imagem o Comentario")
		console.log(topicoNovo)
	}
	
	$scope.salvarPopup = function (topicoNovo){
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Salvar Alterações',
		     template: 'Salvar suas alterações ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.salvar(topicoNovo);
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.salvar = function(topicoNovo){
		console.log("Vou salvar o Comentario")
		console.log(topicoNovo)
	}
}])
   
.controller('cadastrarJogoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Tela de Cadastro de Jogo")
	
	$scope.cadastrar = function(jogo){
		console.log("Recebi este jogo:")
		console.log(jogo)
	}

}])
   
.controller('jogoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei o jogo")
	var id = $stateParams.id
	$scope.jogoMock
	
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.carregarJogo = function(){
		console.log("Carreguei o jogo com id abaixo:")
		console.log($stateParams.id)
		$scope.jogoMock = {id:1,titulo:"Battlefield Hardline",
							descricao:"é um videojogo do genero first-person shooter, produzido pela Visceral Games em colaboração com a EA Digital Illusions CE e publicado pela Electronic Arts.",
							dataLancamento:"17 de março de 2015",	
							plataformas:"PlayStation 4, Xbox One, PlayStation 3, Xbox 360, Microsoft Windows",
							desenvolvedores:"Visceral Games, EA Digital Illusions CE, Criterion Games"
							}		
	}
	
	$scope.editarJogo = function(){
		console.log("Vou editar o jogo com o id:")
		console.log($stateParams.id)
		
	}
	
	$scope.editarJogo = function(){
		console.log("Vou ocultar o jogo com o id:")
		console.log($stateParams.id)
	}
	
}])
   
.controller('jogo2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei o jogo")
	var id = $stateParams.id
	$scope.jogoMock
	
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.carregarJogo = function(){
		console.log("Carreguei o jogo com id abaixo:")
		console.log($stateParams.id)
		$scope.jogoMock = {id:1,titulo:"Battlefield Hardline",
							descricao:"é um videojogo do genero first-person shooter, produzido pela Visceral Games em colaboração com a EA Digital Illusions CE e publicado pela Electronic Arts.",
							dataLancamento:"17 de março de 2015",	
							plataformas:"PlayStation 4, Xbox One, PlayStation 3, Xbox 360, Microsoft Windows",
							desenvolvedores:"Visceral Games, EA Digital Illusions CE, Criterion Games"
							}		
	}
	
	$scope.editarJogo = function(){
		console.log("Vou editar o jogo com o id:")
		console.log($stateParams.id)
		
	}
	
	$scope.editarJogo = function(){
		console.log("Vou ocultar o jogo com o id:")
		console.log($stateParams.id)
	}

}])
   
.controller('jogo3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei o jogo")
	var id = $stateParams.id
	$scope.jogoMock
	
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.carregarJogo = function(){
		console.log("Carreguei o jogo com id abaixo:")
		console.log($stateParams.id)
		$scope.jogoMock = {id:1,titulo:"Battlefield Hardline",
							descricao:"é um videojogo do genero first-person shooter, produzido pela Visceral Games em colaboração com a EA Digital Illusions CE e publicado pela Electronic Arts.",
							dataLancamento:"17 de março de 2015",	
							plataformas:"PlayStation 4, Xbox One, PlayStation 3, Xbox 360, Microsoft Windows",
							desenvolvedores:"Visceral Games, EA Digital Illusions CE, Criterion Games",
							topicos:[{id:1,titulo:"topico1"},{id:2,titulo:"topico2"},{id:3,titulo:"topico3"}]
							}		
	}
	
	$scope.editarJogo = function(){
		console.log("Vou editar o jogo com o id:")
		console.log($stateParams.id)
		
	}
	
	$scope.editarJogo = function(){
		console.log("Vou ocultar o jogo com o id:")
		console.log($stateParams.id)
	}

}])
   
.controller('configuraEsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
}])
   
.controller('tempoDeFechamentoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Tela de Tempo de Fechamento Minimo")
	
	$scope.salvar = function(tempo){
		console.log("Recebi esse tempo:")
		console.log(tempo)
	}

}])
   
.controller('calculoDeRateCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('relatRiosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tPicoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei o Tópico")
	var id = $stateParams.id
	$scope.topicoMock
	
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.carregarTopico = function(){
		$scope.topicoMock = {id:1,titulo:"Tópico1",
				corpo:"Sem comentarios",
				comentarios:[{id:1,usuario:"Eu",corpo:"nao vou comentar"},
				             {id:2,usuario:"outro",corpo:"comentei"},
				             {id:3,usuario:"OutroCara", corpor:"Sei la"}]
				}		
	}
	
	$scope.gravarComentario = function(comentario){
		console.log("Comentario recebido :")
		console.log(comentario.corpo)
	}
}])
 