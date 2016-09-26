angular.module('app.meusComentariosController', [])
.controller('meusComentRiosCtrl', ['$scope', '$stateParams', '$window', '$http',
function ($scope, $stateParams, $window, $http) {
	$scope.comentarios
	var id = $stateParams.id 
	
	$scope.carregarComentarios = function(){
		var user = JSON.parse($window.localStorage['userOn'] || '[]');
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		parameters = {params:{'userId': user.id, 'topicId' : id}}
		var request = getWebServices() + "/getCommentByTopicUserId"
		$http.get(request,parameters,headers).success(function(data) {
			if(data.length > 0) {
				$scope.comentarios = data
			}
		});
	}
}])