angular.module('app.login', [])
.controller('loginCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $state, $ionicPopup, $http, $window) {	
		
$scope.login = function(usuario){
	if(usuario === undefined){
		$scope.loginSenhaInvalido()			
	}
	else if($scope.validaLogin(usuario)){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/login", usuario, headers).success(function(data) {
			if(data.login === null){
				$scope.loginSenhaInvalido()
			}else{
				$window.localStorage['userOn'] = JSON.stringify(data);
				$state.go("menu.home", {})											
			}
		});
	}else{
		$scope.loginSenhaInvalido()
	}
}
	
$scope.validaLogin = function(usuario){
	if(usuario.login === undefined || usuario.login === "" || usuario.password === undefined || usuario.password === ""){
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