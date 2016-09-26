angular.module('app.meusTPicosCtrl', [])
.controller('meusTPicosCtrl', ['$scope', '$stateParams', '$http','$window',
function ($scope, $stateParams, $http, $window) {
	$scope.topicos 
	$scope.user
	$scope.showTopicos = false;
	
	$scope.carregarTopicos = function(){
		$scope.user = JSON.parse($window.localStorage['userOn'] || '[]');
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getTopicByUserId?id="+$scope.user.id
		$http.get(request, headers).success(function(data) {
			if(data.length > 0) {
				$scope.topicos = data
				$scope.showTopicos = true;
			}
		});
	}
}])