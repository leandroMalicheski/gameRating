angular.module('app.cadastroController', [])
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