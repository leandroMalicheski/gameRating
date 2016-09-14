angular.module('app.perfilController', [])

.controller('perfilCtrl', ['$scope', '$stateParams', '$ionicPopup', '$window', '$http',
function ($scope, $stateParams, $ionicPopup, $window, $http) {
	$scope.perfil;
	$scope.disableIcon = "ion-eye"
	
	$scope.desabilitarPopup = function(){
		var desabilitar = "desabilitar"
		if(!$scope.perfil.visible){
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
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateDisableStatus", $scope.perfil, headers).success(function(data) {
			$scope.perfil = data
			if($scope.perfil.visible){
				$scope.disableIcon = "ion-eye"
			}else{
				$scope.disableIcon = "ion-eye-disabled"
			}
		});
	}
	$scope.carregarPerfil = function(){
		$scope.perfil = JSON.parse($window.localStorage['userOn'] || '[]');
		if(!$scope.perfil.visible){
			$scope.disableIcon = "ion-eye-disabled"
		}
	}	
	
}])