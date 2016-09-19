angular.module('app.menuController', [])
.controller('menuController', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.user
	$scope.showTopicoO = false;
	$scope.showComentarioO = false;
	$scope.showConfig = false;
	$scope.showRelatorios = false;
	
	$scope.carregarMenu = function(){
		$scope.user = JSON.parse($window.localStorage['userOn'] || '[]');
		if($scope.user.profile === 0){
			$scope.showTopicoO = true;
			$scope.showComentarioO = true;
			$scope.showConfig = true;
			$scope.showRelatorios = true;
			$scope.showCadastroJogo = true;
		}else if($scope.user.profile === 1){
			$scope.showRelatorios = true;
		}
	}
}])
