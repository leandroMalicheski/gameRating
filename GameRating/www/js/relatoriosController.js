angular.module('app.relatoriosController', [])
.controller('relatorioTopicosJogoCtrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.gamelist;
		
	$scope.gerarRelatorio = function(){
		var request = "http://localhost:8080/listNumTopicsGame"
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		$http.get(request, headers).success(function(data) {
			$scope.gamelist = data;
		});	
	}
}])
.controller('relatorioComentarioJogoCtrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.gamelist;
		
	$scope.gerarRelatorio = function(){
		var request = "http://localhost:8080/listNumCommentsGame"
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		$http.get(request, headers).success(function(data) {
			$scope.gamelist = data;
		});	
	}
}])
.controller('relatorioDataViewJogoCtrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.gamelist;
	
	$scope.gerarRelatorio = function(){
		var request = "http://localhost:8080/lastViewGame"
			var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		$http.get(request, headers).success(function(data) {
			$scope.gamelist = data;
		});	
	}
}])
.controller('relatorioDataViewTopicoCtrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.topiclist;
	
	$scope.gerarRelatorio = function(){
		var request = "http://localhost:8080/lastViewTopic"
			var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		$http.get(request, headers).success(function(data) {
			$scope.topiclist = data;
		});	
	}
}])
.controller('relatorioViewTopicoCtrl', ['$scope', '$stateParams','$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
	$scope.topicList;
	
	$scope.gerarRelatorio = function(){
		var request = "http://localhost:8080/listNumViewsTopic"
			var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		$http.get(request, headers).success(function(data) {
			$scope.topicList = data;
		});	
	}
}])

