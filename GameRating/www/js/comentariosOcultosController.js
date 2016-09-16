angular.module('app.comentariosOcultosController', [])
.controller('comentRiosOcultosCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http',
function ($scope, $stateParams, $ionicPopup, $http) {
	var id = $stateParams.id
	$scope.comentarios
	
	$scope.carregarComentarios = function (){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getHideCommentsTopicsByTopicId?id="+id
		$http.get(request, headers).success(function(data) {
			if(data.length > 0) {
				$scope.comentarios = data
			}
		});
	}
	
	$scope.removerOcultacaoPopup = function(comentarios){
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Remover Ocultação',
		       template: 'Gostaria de remover a ocultação deste(s) comentários ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				$scope.removerOcultacao(comentarios);
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.removerOcultacao = function(comentarios){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateCommetsVisibleStatus", comentarios, headers).success(function(data) {
			$scope.comentarios = data
		});
	}
}])