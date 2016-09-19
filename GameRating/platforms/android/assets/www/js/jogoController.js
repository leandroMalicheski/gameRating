angular.module('app.jogoController', [])
.controller('jogo2Ctrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.jogo
	$scope.gameDisable = "ion-eye"
	var id = $stateParams.id
	$scope.mostrarDisable = false;
	$scope.mostrarEditar = false;
	
	$scope.carregarJogo = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getJogoById?id="+id
		$http.get(request, headers).success(function(data) {
			var user = JSON.parse($window.localStorage['userOn'] || '[]');
			$scope.jogo = data;
			$scope.checkVisibleClass($scope.jogo.isVisible)
			if(user.profile == 0){
				$scope.mostrarDisable = true;
				$scope.mostrarEditar = true;
			}
			parameters = {params:{'userId': user.id, 'gameId' : id}}
			$http.get("http://localhost:8080/addVisitedTime",parameters,headers).success(function(data) {});
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
		$http.post("http://localhost:8080/updateVisibility", $scope.jogo, headers).success(function(data) {
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