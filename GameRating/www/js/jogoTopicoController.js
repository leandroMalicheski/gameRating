angular.module('app.jogoTopicoController', [])
.controller('jogo3Ctrl', ['$scope', '$stateParams','$ionicPopup', '$http', 
function ($scope, $stateParams, $ionicPopup, $http) {
	var id = $stateParams.id
	$scope.jogo
	$scope.topicos
	$scope.showTopics = false
	
	$scope.carregarJogo = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getJogoById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.jogo = data;
			var request = "http://localhost:8080/getTopicsByGameId?id="+id
			$http.get(request, headers).success(function(data) {
				if(data.length !== 0){
					$scope.topicos = data;
					$scope.showTopics = true
				}
			});	
		});
			
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
		$http.post("http://localhost:8080/hideGame", $scope.jogo, headers).success(function(data) {
			$scope.jogo = data
			alteracoesSalvasPopup($ionicPopup)
		});
	}

}])