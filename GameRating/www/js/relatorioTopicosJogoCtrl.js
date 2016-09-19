angular.module('app.relatoriosController', [])
.controller('relatorioTopicosJogoCtrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.gamelist;
		
	$scope.gerarRelatorio1 = function(){
		var request = "http://localhost:8080/listRelatorioTopicosJogo"
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		$http.get(request, headers).success(function(data) {
			$scope.gamelist = data;
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