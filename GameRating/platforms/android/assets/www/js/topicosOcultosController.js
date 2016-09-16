angular.module('app.tPicosOcultosCtrl', [])
.controller('tPicosOcultosCtrl', ['$scope', '$stateParams', '$ionicPopup','$http',
function ($scope, $stateParams, $ionicPopup,$http) {
	$scope.topicos
	$scope.showTopicos = false
	
	$scope.carregarTopicosOcultos = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/listHideTopics"
		$http.get(request, headers).success(function(data) {
			$scope.topicos = data
			$scope.showTopicos = true;
		});
	}
	
	$scope.removerOcultacaoPopup = function(topicos){
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Remover Ocultação',
		       template: 'Gostaria de remover a ocultação deste(s) Tópicos ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.removerOcultacao(topicos);
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.removerOcultacao = function(topicos){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateTopicsVisibleStatus", topicos, headers).success(function(data) {
			$scope.topicos = data
		});
	}
}])