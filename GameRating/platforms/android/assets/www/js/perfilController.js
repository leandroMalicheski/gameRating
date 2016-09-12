angular.module('app.perfilController', [])

.controller('perfilCtrl', ['$scope', '$stateParams', '$ionicPopup', '$window',
function ($scope, $stateParams, $ionicPopup, $window) {
	$scope.perfil;
	
	$scope.desabilitarPopup = function(){
		var desabilitar = "desabilitar"
		if(!perfil.visible){
			desabilitar = "habilitar"
		}
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
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/disableUser?id="+$scope.perfil
		$http.get(request, headers).success(function(data) {
			$scope.perfil = data
		});
	}
	$scope.carregarPerfil = function(){
		$scope.perfil = JSON.parse($window.localStorage['userOn'] || '[]');
	}	
	
}])