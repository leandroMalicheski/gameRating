angular.module('app.pefilUsuarioController', [])
.controller('perfilUsuRioCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.perfil
	$scope.thumbsupDisable = false;
	$scope.thumbsdownDisable = false;
	
	$scope.showModerador = false;
	$scope.showSenha = false;
	$scope.showDisable = false;
	$scope.showBloquear = false;
	
	var id = $stateParams.id
	$scope.carregarPerfilUsuario = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getUserById?id="+id
		$http.get(request, headers).success(function(data) {
			if(data.length !== 0){
				$scope.perfil = data
				user = JSON.parse($window.localStorage['userOn'] || '[]');
				params =  {params: {profileId: data.id,userId:user.id}}
				$http.get('http://localhost:8080/checkReputation',params, headers).success(function(data) {
					if(user.profile === 0){
						$scope.showModerador = true;
						$scope.showSenha = true;
						$scope.showDisable = true;
						$scope.showBloquear = true;
					}else if(user.profile === 1){
						$scope.showBloquear = true;
					}
					if(data.reputation !== ""){
						if(data.reputation === 0 || data.reputation === '0'){
							$scope.thumbsupDisable = true;
						}else{
							$scope.thumbsdownDisable = true;
						}
					}
				});
			}
		});
	}
	
	$scope.like = function (){
		$scope.thumbsupDisable = true;
		$scope.thumbsdownDisable = false;
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		user = JSON.parse($window.localStorage['userOn'] || '[]');
		parameters = {params: {profileId: $scope.perfil.id,userId:user.id}}
		$http.get("http://localhost:8080/giveLike",parameters, headers).success(function(data) {
			if(data.login !== "" || data.login !== null){
				$scope.perfil = data	
			}
		});
	}
	
	$scope.dislike = function (){
		$scope.thumbsupDisable = false;
		$scope.thumbsdownDisable = true;
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		user = JSON.parse($window.localStorage['userOn'] || '[]');
		parameters = {params: {profileId: $scope.perfil.id,userId:user.id}}
		$http.get("http://localhost:8080/giveDislike",parameters, headers).success(function(data) {
			if(data.login !== "" || data.login !== null){
				$scope.perfil = data	
			}
		});
	}
	
	$scope.transformarModerador = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateUserProfile", $scope.perfil, headers).success(function(data) {
			$scope.perfil = data
			$scope.usuarioModeradorPopup()
		});
	}
	
	$scope.alterarSenha = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/resetUserPassword?login="+$scope.perfil.login
		$http.get(request, headers).success(function(data) {});
		$scope.senhaEncaminhadaPopup()
	}
	
	$scope.desabilitar = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateDisableStatus", $scope.perfil, headers).success(function(data) {
			$scope.perfil = data;
			$scope.usuarioDesabilitadoPopup()
		});
	}
	
	$scope.bloquear = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateBlockStatus", $scope.perfil, headers).success(function(data) {
			$scope.perfil = data
			$scope.usuarioBloqueadoPopup()
		});
	}
	
	$scope.transformarModeradorPopup = function(){
		var moderador = "adicionar"
		if($scope.perfil.profile == 1){
			moderador = "remover"
		}
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Transformar em moderador',
		       template: 'Gostaria de ' + moderador + ' o status de moderador do usuario ?'
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
		if($scope.perfil.visible){
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
		if($scope.perfil.visible){
			delabilitar = "habilitado"
		}
			var alertPopup = $ionicPopup.alert({
				title: 'Desabilitar',
				template: 'O usuário foi '+desabilitar+' com sucesso'
		});
	}
	
	$scope.bloquearPopup = function(){
		var bloquear = "bloquear" 
		if($scope.perfil.blocked){
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
		if($scope.perfil.blocked){
			habilitado = "desbloquear"
		}
		var alertPopup = $ionicPopup.alert({
				title: 'Desabilitar',
				template: 'O usuário foi '+bloquear+' com sucesso'
		});
	}
}])