angular.module('app.homeController', [])
.controller('homeCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	console.log("Carreguei a Home!")
	$scope.jogos;
	$scope.showJogos = false;
	
$scope.search = function(busca){		
	if(busca === undefined || busca === ""){
		$scope.buscaVaziaPopup()
	}else{
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		user = JSON.parse($window.localStorage['userOn'] || '[]');  
		if(user.profile === 0){
			var request = "http://localhost:8080/listGamesByNameAdm?search="+busca
			$http.get(request, headers).success(function(data) {
				if(data.length === 0){
					$scope.jogoNaoEncotradoPopup()
				}else{
					$scope.jogos = data;
					$scope.showJogos = true;											
				}
			});						
		}else{
			var request = "http://localhost:8080/listGamesByName?search="+busca
			$http.get(request, headers).success(function(data) {
				if(data.length === 0){
					$scope.jogoNaoEncotradoPopup()
				}else{
					$scope.jogos = data;
					$scope.showJogos = true;											
				}
			});			
		}
	}
}
	
$scope.buscaVaziaPopup = function(){
	var alertPopup = $ionicPopup.alert({
		title: 'Busca Vazia',
		template: 'Favor informar um jogo'
	});
}
	
$scope.jogoNaoEncotradoPopup = function(){
	var alertPopup = $ionicPopup.alert({
		title: 'Jogo Não Encontrado',
		template: 'Nenhum jogo foi encontrado para esta busca'
	});
}
}])