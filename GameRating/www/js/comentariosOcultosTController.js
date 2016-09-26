angular.module('app.comentariosOcultosTController', [])
.controller('comentRiosOcultos2Ctrl', ['$scope', '$stateParams', '$http',
function ($scope, $stateParams, $http) {
	$scope.topicos
	$scope.showTopicos = false
	
	$scope.carregarTopicos = function (){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getHideCommentsTopics"
		$http.get(request, headers).success(function(data) {
			if(data.length > 0) {
				$scope.topicos = data
				$scope.showTopicos = true;
			}
		});
	}
}])