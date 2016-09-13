angular.module('app.meusComentariosTController', [])
.controller('meusComentRios2Ctrl', ['$scope', '$stateParams', '$http', '$window', 
function ($scope, $stateParams, $http, $window) {
	$scope.topicos
	$scope.user
	$scope.showTopicos = false;
	
	$scope.carregarTopicos = function (){
		$scope.user = JSON.parse($window.localStorage['userOn'] || '[]');
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getUserCommentedTopics?id="+$scope.user.id
		$http.get(request, headers).success(function(data) {
			$scope.topicos = data
		});
	}
}])