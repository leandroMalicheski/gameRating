angular.module('app.pefilUsuarioController', [])
.controller('perfilUsuRioCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http',
function ($scope, $stateParams, $ionicPopup, $http) {
	$scope.perfil
	var id = $stateParams.id
	$scope.carregarPerfilUsuario = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getUserById?id="+id
		$http.get(request, headers).success(function(data) {
			if(data.length !== 0){
				$scope.perfil = data
			}
		});
	}
	
	$scope.transformarModerador = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateUserProfile", $scope.perfil, headers).success(function(data) {});
		$scope.usuarioModeradorPopup()
	}
	
	$scope.alterarSenha = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/resetUserPassword?login="+$scope.perfil.login
		$http.get(request, headers).success(function(data) {});
		$scope.senhaEncaminhadaPopup()
	}
	
	$scope.desabilitar = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/disableUser", $scope.perfil, headers).success(function(data) {});
		$scope.usuarioDesabilitadoPopup()
	}
	
	$scope.bloquear = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/blockUser", $scope.perfil, headers).success(function(data) {});
		$scope.usuarioBloqueadoPopup()
	}
	
	$scope.transformarModeradorPopup = function(){
		var moderador = "adicionar"
		if($scope.profile == 1){
			moderador = "remover"
		}
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Transformar em moderador',
		       template: 'Gostaria de' + moderador + ' o status de moderador do usuario ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.transformarModerador();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.usuarioModeradorPopup = function(){
		var alertPopup = $ionicPopup.alert({
				title: 'Transformar em moderador',
				template: 'O status do usuario foi alterado com sucesso'
		});
	}
	
	$scope.alterarSenhaPopup = function(){
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Alterar Senha',
		       template: 'Deseja alterar a senha do usuario ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.alterarSenha()
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.senhaEncaminhadaPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Alterar Senha',
			template: 'Uma senha foi enviada ao usuário com sucesso'
		});
	}
	
	$scope.desabilitarPopup = function(){
		var habilitado = "habilitar" 
		if(perfil.visible){
			habilitado = "desabilitar"
		}
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Desabilitar',
		       template: 'Gostaria de ' + habilitado + ' o usuario ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.desabilitar();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.usuarioDesabilitadoPopup = function(){
		var desabilitar = "desabilitado"							
		if(perfil.visible){
			delabilitar = "habilitado"
		}
			var alertPopup = $ionicPopup.alert({
				title: 'Desabilitar',
				template: 'O usuário foi '+desabilitar+' com sucesso'
		});
	}
	
	$scope.bloquearPopup = function(){
		var bloquear = "bloquear" 
		if(perfil.blocked){
			habilitado = "desbloquear"
		}
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
	
	$scope.usuarioBloqueadoPopup = function(){
		var bloquear = "desbloqueado" 
		if(perfil.blocked){
			habilitado = "desbloquear"
		}
		var alertPopup = $ionicPopup.alert({
				title: 'Desabilitar',
				template: 'O usuário foi '+bloquear+' com sucesso'
		});
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