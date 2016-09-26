angular.module('app.jogoTopicoController', [])
.controller('jogo3Ctrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	var id = $stateParams.id
	$scope.jogo
	$scope.topicos
	$scope.showTopics = false
	$scope.mostrarDisable = false;
	$scope.mostrarEditar = false;
	
	$scope.carregarJogo = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getJogoById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.jogo = data;
			var request = getWebServices() + "/getTopicsByGameId?id="+id
			$http.get(request, headers).success(function(data) {
				var user = JSON.parse($window.localStorage['userOn'] || '[]');
				if(user.profile == 0){
					$scope.mostrarDisable = true;
					$scope.mostrarEditar = true;
				}
				if(data.length !== 0){
					$scope.topicos = data;
					$scope.showTopics = true
					$scope.checkVisibleClass($scope.jogo.isVisible)
				}
			});	
		});
			
	}
	
	$scope.checkVisibleClass = function(visibility){
		if(visibility){
			$scope.gameDisable = "ion-eye"
		}else{
			$scope.gameDisable = "ion-eye-disabled"
		}
	}
	
	$scope.ocultarPopup = function(){
		var ocultar = "remover a ocultação"
		if($scope.jogo.isVisible){
			ocultar = "ocultar"
		}
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Ocultar Jogo',
		       template: 'Gostaria de ' + ocultar + ' este jogo ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.ocultar();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.ocultar = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/updateVisibility"
		$http.post(request, $scope.jogo, headers).success(function(data) {
			$scope.jogo = data
			if($scope.jogo.isVisible){
				$scope.gameDisable = "ion-eye"
			}else{
				$scope.gameDisable = "ion-eye-disabled"
			}
			alteracoesSalvasPopup($ionicPopup)
		});
	}

}])