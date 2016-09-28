angular.module('app.comentarioController', [])
.controller('comentarioCtrl', ['$scope', '$stateParams',  '$ionicPopup', '$state', '$http',
function ($scope, $stateParams, $ionicPopup, $state, $http) {
	$scope.commentDisable = "ion-eye";
	$scope.comentario
	var id = $stateParams.id
	
	$scope.carregarComentario = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getCommentById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.comentario = data
			$scope.checkVisibleClass($scope.comentario.visible)
		});
	}
	
	$scope.checkVisibleClass = function(visibility){
		if(visibility){
			$scope.commentDisable = "ion-eye"
		}else{
			$scope.commentDisable = "ion-eye-disabled"
		}
	}
	
	$scope.ocultarPopup = function(){
		var ocultar = "remover a ocultação"
		if($scope.comentario.visible){
			ocultar = "ocultar"
		}
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Ocultar Comentário',
		       template: 'Gostaria de ' + ocultar + ' este comentário ?'
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
		var request = getWebServices() + "/updateCommentVisibility"
		$http.post(request, $scope.comentario, headers).success(function(data) {
			$scope.comentario = data
			$scope.checkVisibleClass($scope.comentario.visible)
			alteracoesSalvasPopup($ionicPopup)
		});
	}
	
}])