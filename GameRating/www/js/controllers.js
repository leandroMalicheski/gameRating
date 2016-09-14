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
					$http.post("http://localhost:8080/generateUserPassword", usuario, headers).success(function(data) {
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
   
.controller('comentRiosOcultos2Ctrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a tela de Comentarios Ocultos")
	console.log($scope.topicosMock)
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