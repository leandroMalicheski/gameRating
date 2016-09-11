angular.module('app.controllers', [])
  
.controller('buscarUsuRioCtrl', ['$scope', '$stateParams', '$ionicPopup', 
function ($scope, $stateParams, $ionicPopup) {
	console.log("Carreguei a Tela de buscar usuario!")
	$scope.usuariosMock;
	$scope.showUsuarios = false;
	
	$scope.search = function(busca){		
		if(busca === undefined){
			$scope.buscaVaziaPopup()
		}else{
			console.log("Chamei a Busca")
			console.log(busca)
			if(busca === "eu"){
				$scope.showUsuarios = true;
				$scope.usuariosMock = [{id:1,usuario:"Eu"},{id:2,usuario:"Outro"}]
			}else{
				$scope.usuarioNaoEncotradoPopup()
			}
		}
	}
	
	$scope.buscaVaziaPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Busca Vazia',
			template: 'Favor informar um usuário'
		});
	}
	
	$scope.usuarioNaoEncotradoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Jogo Não Encontrado',
			template: 'Nenhum jogo foi encontrado para esta busca'
		});
	}

}])
   
.controller('cadastroCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$http',
function ($scope, $stateParams, $ionicPopup, $state, $http) {
	$scope.carregarImagem = function(){
		console.log("carregarImagem")
	}
	
	$scope.cadastrar = function(usuario){
		if(usuario === undefined){
			preenchaCamposPopup($ionicPopup)
		}else if($scope.validaCampos(usuario)){
			var headers = {headers : {'Content-Type' : 'application/json'}};
			$http.post("http://localhost:8080/addUser", usuario, headers).success(function(data) {
				$scope.usuarioCadastradoPopup()																	
			});
		}
	}
	
	$scope.usuarioCadastradoPopup = function(){
		var myPopup = $ionicPopup.show({
		       title: 'Usuario Cadastrado',
		       template: 'Usuario cadastrado com sucesso',
		       buttons: [{
		           text: '<b>Ok</b>',
		            type: 'button-positive',
		            onTap: function(e) {
		            	$state.go("login", {})  
		           }
		        }, ]
		});
	}
	
	$scope.validaCampos = function(usuario){
		var validade = true
		if(usuario.name === undefined){
			preenchaCamposPopup($ionicPopup)
			validade = false
		}else if (!validaEmail(usuario.email, $ionicPopup)){
			validade = false
		}else if (validaUsuario(usuario.login, $ionicPopup, $http)){
			validade = false
		}else if (!validaSenha(usuario, $ionicPopup)){
			validade = false
		}else if (usuario.passwordTip === undefined){
			preenchaCamposPopup($ionicPopup)
			validade = false
		}
		return validade
	}	
}])

.controller('editarPerfilCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', 
function ($scope, $stateParams, $ionicPopup, $state) {
	$scope.perfil
	$scope.carregarPerfil = function(){
		console.log("Carreguei o perfil editar o Perfil")
		$scope.perfil = {nome:"leandro",email:"leandro.Malicheski@gmail.com",usuario:"leandroMalicheski",resposta:"Bob",imagePath:"teste",senha:"123",senhaI:"123"}
		console.log($scope.perfil)
	}
	
	$scope.salvarPopup = function(perfil){
			var confirmPopup = $ionicPopup.confirm({
			       title: 'Salvar',
			       template: 'Quer salvar suas alterações ?'
			     });
			confirmPopup.then(function(res) {
				if(res) {
					if($scope.validaCampos(perfil)){
						alteracoesSalvasPopup($ionicPopup)
						$scope.salvar(perfil);	
						$state.go('menu.editarPerfil',{})
					}
				} else {
					console.log('Cancelar');
				}
			});
	}
	
	$scope.validaCampos = function(perfil){
		if(perfil.nome === undefined || perfil.nome === ""){
			preenchaCamposPopup($ionicPopup)
		}else if (validaEmail(perfil.email, $ionicPopup)){
			return true
		}else if (perfil.resposta === undefined || perfil.resposta === ""){
			preenchaCamposPopup($ionicPopup)
		}else{
			return true
		}
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
			            	if($scope.validaSenhas($scope.data)){
			            		$scope.alterarSenha($scope.data)			            		
			            		alteracoesSalvasPopup($ionicPopup)
			            	}else{
			            		alterarSenhaPopup()
			            	}
			            }
		           }
		        }, ]
		});
	}
	
	$scope.validaSenhas = function(data){
		var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		if(data.senha === undefined || data.senha === "" || data.confirmarSenha === undefined || data.confirmarSenha === "" || data.senhaAntiga === undefined || data.senhaAntiga === ""){
			preenchaCamposPopup($ionicPopup)
			return false
		}else if (data.senha === data.confirmarSenha ){
			if(data.senhaAntiga === $scope.perfil.senha){
				if(mediumRegex.test(data.senha)){
					return true
				}else{
					senhaFracaPopup($ionicPopup)
					return false
				}	
			}else{
				$scope.senhaAntigaInvalidaPopup($ionicPopup)
			}
		}else{
			senhasDiferentesPopup($ionicPopup)
			return false
		}
	}
	
	$scope.senhaAntigaInvalidaPopup = function(ionicPopup){
		var alertPopup = ionicPopup.alert({
			title: 'Senha Antiga Inválida',
			template: 'A senha antiga encontra-se incorreta'
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
   
.controller('esqueceuASenhaCtrl', ['$scope', '$stateParams',  '$ionicPopup', '$state', '$http',
function ($scope, $stateParams, $ionicPopup, $state, $http) {
	console.log("carreguei a Tela de Esqueci minha senha")
	
	$scope.solicitarSenha = function(usuario) {
		if(usuario === undefined || usuario.passwordTip === undefined || usuario.passwordTip === "" || usuario.login === undefined || usuario.login === "" || usuario.email === undefined || usuario.email === ""){
			preenchaCamposPopup($ionicPopup)
		}else{
			var headers = {headers : {'Content-Type' : 'application/json'}};
			$http.post("http://localhost:8080/userDataValidation", usuario, headers).success(function(data) {
				if(data.login === null){
					$scope.informeRespostaPopup()
				} else{
					$http.post("http://localhost:8080/updateUserPassword", usuario, headers).success(function(data) {
						$scope.senhaGeradaPopup(data.passwordGenerated)																	
					});					
				}																	
			});
		}		
	}
	
	$scope.senhaGeradaPopup = function(senhaGerada){
		var alertPopup = $ionicPopup.alert({
			title: 'Senha Gerada',
			template: 'Sua nova senha é: ' + senhaGerada
		});
	}
	
	$scope.informeRespostaPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Dados inválidos',
			template: 'Os dados informados não correspondem ao usuário'
		});
	}

}])
   
.controller('meusTPicosCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
	$scope.topicosMock 
	
	$scope.carregarTopicos = function(){
		console.log("Carreguei os Topicos")
		$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
		console.log($scope.topicosMock)		
	}
	
	
	
}])
   
.controller('tPicosOcultosCtrl', ['$scope', '$stateParams', '$ionicPopup',
function ($scope, $stateParams, $ionicPopup) {
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	
	$scope.removerOcultacaoPopup = function(comentarios){
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Remover Ocultação',
		       template: 'Gostaria de remover a ocultação deste(s) Tópicos ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.removerOcultacao(comentarios);
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.removerOcultacao = function(comentarios){
		console.log("Vou remover a ocultação deste(s) jogos o jogo com o id:")
		console.log(comentarios)
	}
}])
   
.controller('meusComentRiosCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
	$scope.comentariosMock;
	
	$scope.carregarComentarios = function(){
		$scope.comentariosMock = [{id:1,corpo:"Corpo do comentario 1"},{id:2,corpo:"Corpo do comentario 2"},{id:3,corpo:"Corpo do comentario 3"}]
		console.log("Carreguei a Tela de Comentarios")
		console.log("cheguei e estou com id abaixo:")
		console.log($stateParams.id)		
	}
}])
   
.controller('comentRiosOcultosCtrl', ['$scope', '$stateParams', '$ionicPopup',
function ($scope, $stateParams, $ionicPopup) {
	var id = $stateParams.id
	$scope.comentariosMock = [{id:1,corpo:"Corpo do comentario 1",checked:true},{id:2,corpo:"Corpo do comentario 2",checked:false},{id:3,corpo:"Corpo do comentario 3",checked:false}]
	console.log("Carreguei a Tela de Comentarios Ocultos")
	console.log("cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.removerOcultacaoPopup = function(comentarios){
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Remover Ocultação',
		       template: 'Gostaria de remover a ocultação deste(s) comentários ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.removerOcultacao(comentarios);
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.removerOcultacao = function(comentarios){
		console.log("Vou remover a ocultação deste(s) jogos o jogo com o id:")
		console.log(comentarios)
	}
}])
   
.controller('meusComentRios2Ctrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
	$scope.topicosMock
	
	$scope.carregarTopicos = function (){
		$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
		console.log("Carreguei a Tela dos meus topicos/comentarios")
		console.log($scope.topicosMock)		
	}
	
}])
   
.controller('comentRiosOcultos2Ctrl', ['$scope', '$stateParams', 

// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a tela de Comentarios Ocultos")
	console.log($scope.topicosMock)
}])
   
.controller('editarTPicoCtrl', ['$scope', '$stateParams','$ionicPopup', '$state', '$ionicHistory', 
function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory) {
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
		$scope.topicoFechadoPopup()
	}
	
	$scope.topicoFechadoPopup = function(){
		var fechar = "fechado"
		var alertPopup = $ionicPopup.alert({
			title: 'Fechar Tópico',
			template: 'O tópico foi '+fechar+' com sucesso'
		});
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
	
	$scope.topicoRemovidoPopup = function(){
		var remover = "removido"
		var alertPopup = $ionicPopup.alert({
			title: 'Fechar Tópico',
			template: 'O tópico foi '+remover+' com sucesso'
		});
	}
	
	$scope.remover = function(){
		console.log("Vou remover o Tópico")
		$scope.topicoRemovidoPopup()
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.meusTPicos',{})
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
				if($scope.validaCampos(topicoNovo)){
					$scope.salvar(topicoNovo);
					alteracoesSalvasPopup($ionicPopup)
				}else{
					preenchaCamposPopup($ionicPopup)
				}
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.validaCampos = function(topicoNovo){
		if(topicoNovo.titulo === undefined || topicoNovo.titulo === "" || topicoNovo.corpo === undefined || topicoNovo.corpo === ""){
			return false
		}else{
			return true
		}
	}
	
	$scope.salvar = function(topicoNovo){
		console.log("Vou salvar o Tópico")
		console.log(topicoNovo)
	}

}])
   
.controller('editarComentRioCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicHistory', '$state',  
function ($scope, $stateParams, $ionicPopup, $ionicHistory, $state) {
	$scope.cometarioMock

	$scope.carregarComentario = function(){
		$scope.cometarioMock = {id:1,corpo:"Corpo do Comentario"}
		console.log("Carreguei a Tela de editar comentarios")
		console.log("Cheguei e estou com id abaixo:")
		console.log($stateParams.id)		
	}
	
	$scope.addLinkPopup = function(comentarioNovo){
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
			            	comentarioNovo.corpo = comentarioNovo.corpo + ' ' + $scope.data.link  
			            	$scope.addLink(comentarioNovo)
			            }
		           }
		        }, ]
		});
	}
	
	$scope.addLink = function(comentarioNovo){
		console.log("Vou adicionar um link")
		console.log(comentarioNovo)
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
	
	$scope.comentarioRemovidoPopup = function(){
		var remover = "removido"
		var alertPopup = $ionicPopup.alert({
			title: 'Remover Comentário',
			template: 'O comentário foi '+remover+' com sucesso'
		});
	}
	
	$scope.remover = function(){
		console.log("Vou remover o Comentario")
		$scope.comentarioRemovidoPopup()
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.meusComentRios2',{})
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
				alteracoesSalvasPopup($ionicPopup)
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
   
.controller('cadastrarJogoCtrl', ['$scope', '$stateParams', '$ionicPopup', 
function ($scope, $stateParams, $ionicPopup) {
	console.log("Carreguei a Tela de Cadastro de Jogo")
	
	$scope.cadastrar = function(jogo){
		if(validaJogo($scope.jogoMock, $ionicPopup)){
			$scope.salvar(jogo);					
		}else{
			preenchaCamposPopup($ionicPopup)
		}
	}
	
	$scope.salvar = function(jogo){
		console.log("Vou salvar o jogo")
		console.log(jogo)
		$scope.jogoSalvoPopup()
	}
	
	$scope.jogoSalvoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Jogo Adicionado',
			template: 'O jogo foi adicionado com sucesso'
		});
	}

}])
   
.controller('configuraEsCtrl', ['$scope', '$stateParams', '$ionicPopup',
function ($scope, $stateParams, $ionicPopup) {
}])
   
.controller('tempoDeFechamentoCtrl', ['$scope', '$stateParams', '$ionicPopup', 
function ($scope, $stateParams, $ionicPopup) {
	console.log("Carreguei a Tela de Tempo de Fechamento Minimo")
	$scope.tempo = {}
	$scope.carregarTempo = function(){
		$scope.tempo.dias = 3
	}
	
	$scope.salvarPopup = function(tempo){
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Tempo de fechamento',
		       template: 'Gostaria de salvar esta quantidade de dias ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				if(tempo === undefined){
					preenchaCamposPopup($ionicPopup)
				}else{
					if(tempo.dias > 0){
						$scope.salvar(tempo)
					}else{
						$scope.tempoEmDiasInvalidoPopup()
					}					
				}
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.tempoEmDiasInvalidoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Dia inválido',
			template: 'Por gentileza informar um valor maior que 0'
		});
	}
	
	$scope.salvar = function(tempo){
		console.log("Recebi esse tempo:")
		console.log(tempo)
		alteracoesSalvasPopup($ionicPopup)
	}

}])
   
.controller('calculoDeRateCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])
   
.controller('relatRiosCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])
 
this.preenchaCamposPopup = function(ionicPopup){
	var alertPopup = ionicPopup.alert({
		title: 'Campos Obrigatórios',
		template: 'Preencha os campos Obrigatórios'
	});
}
this.validaEmail = function(email, ionicPopup){
	if(email === undefined || email === ""){
		emailInvalidoPopup(ionicPopup)
	}else{
		return true
	}
}
this.emailInvalidoPopup = function(ionicPopup){
	var alertPopup = ionicPopup.alert({
		title: 'Email Inválido',
		template: 'Favor preenchar um email válido'
	});
}
this.validaUsuario = function(usuario, ionicPopup, http){
	if(usuario === undefined){
		preenchaCamposPopup(ionicPopup)
	}else{
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/userLoginValidation?login="+usuario
		http.get(request, headers).success(function(data) {
			if(data.login === null){
				return true									
			}else{
				usuarioInvalidoPopup(ionicPopup)
			}
		});		
	}
}
this.usuarioInvalidoPopup = function(ionicPopup){
	var alertPopup = ionicPopup.alert({
		title: 'Usuário Inválido',
		template: 'O usuário já encontra-se em uso'
	});
}

this.validaSenha = function(usuario, ionicPopup){
	var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
	if(usuario.passwor === undefined && usuario.passwordConfirm === undefined){
		preenchaCamposPopup(ionicPopup)
		return false
	}else if (usuario.password === usuario.passwordConfirm){
		if(mediumRegex.test(usuario.password)){
			return true
		}else{
			senhaFracaPopup(ionicPopup)
		}
	}else{
		senhasDiferentesPopup(ionicPopup)
	}
}

this.senhasDiferentesPopup = function(ionicPopup){
	var alertPopup = ionicPopup.alert({
		title: 'Senhas Diferentes',
		template: 'Tenha certeza que suas senhas sejam iguais'
	});
}

this.senhaFracaPopup = function(ionicPopup){
	var alertPopup = ionicPopup.alert({
		title: 'Senha Fraca',
		template: 'Tenha certeza que sua senha contém Caracteres Especiais, Numeros e letras maiúsculas e minúsculas'
	});
}

this.alteracoesSalvasPopup = function(ionicPopup){
	var alertPopup = ionicPopup.alert({
		title: 'Alterações Salvas',
		template: 'Suas alterações foram salvas com sucesso'
	});
}
this.validaJogo = function(jogo, ionicPopup){
	if(jogo === undefined){
		return false
	}else{
		if(jogo.name === undefined || jogo.name === "" || jogo.description === undefined || jogo.description === "" || jogo.launchDate === undefined || jogo.launchDate === "" || jogo.platforms === undefined || jogo.platforms === "" || jogo.devs === undefined || jogo.devs === ""){
			return false
		}else{
			return true
		}		
	}
}