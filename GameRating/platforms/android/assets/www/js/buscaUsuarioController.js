angular.module('app.buscarUsuRioCtrl', [])
.controller('buscarUsuRioCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http',
function ($scope, $stateParams, $ionicPopup,$http) {
	console.log("Carreguei a Tela de buscar usuario!")
	$scope.usuarios;
	$scope.showUsuarios = false;
	
	$scope.search = function(busca){		
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/listUserByName?search=" + busca
		$http.get(request, headers).success(function(data) {
			if(busca === undefined){
				$scope.buscaVaziaPopup();
			}else{
				if(data.length === 0){
					$scope.usuarioNaoEncotradoPopup()
				}else{
					$scope.usuarios = data;
					$scope.showUsuarios = true;											
				}
			}
		});
	}
	
	$scope.buscaVaziaPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Busca Vazia',
			template: 'Favor informar um usuário'
		});
	}
	
	$scope.usuarioNaoEncotradoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Usuário Não Encontrado',
			template: 'Nenhum usuário foi encontrado para esta busca'
		});
	}

}])