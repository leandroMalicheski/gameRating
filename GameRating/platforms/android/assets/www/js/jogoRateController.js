angular.module('app.jogoRateController', [])

.controller('jogoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http',
function ($scope, $stateParams,$ionicPopup, $http) {
	var id = $stateParams.id
	$scope.jogo
	$scope.icon1Rate = 'ion-android-star-outline'
	$scope.icon2Rate = 'ion-android-star-outline'
	$scope.icon3Rate = 'ion-android-star-outline'
	$scope.icon4Rate = 'ion-android-star-outline'
	$scope.icon5Rate = 'ion-android-star-outline'
	$scope.icon1JRate = 'ion-android-star-outline'
	$scope.icon2JRate = 'ion-android-star-outline'
	$scope.icon3JRate = 'ion-android-star-outline'
	$scope.icon4JRate = 'ion-android-star-outline'
	$scope.icon5JRate = 'ion-android-star-outline'
   
$scope.carregarJogo = function(){
	var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
	var request = "http://localhost:8080/getJogoById?id="+id
	$http.get(request, headers).success(function(data) {
		$scope.jogo = data
		$scope.definirRate(data)
		$scope.definirJogabilidadeRate(data)
	});
}
   
$scope.definirRate = function(data){
	switch (data.ratingMedio) {
	case 1:
		scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star-outline'
		$scope.icon3Rate = 'ion-android-star-outline'
		$scope.icon4Rate = 'ion-android-star-outline'
		$scope.icon5Rate = 'ion-android-star-outline'
		break;
	case 2:
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star-outline'
		$scope.icon4Rate = 'ion-android-star-outline'
		$scope.icon5Rate = 'ion-android-star-outline'
		break;
	case 3:
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star'
		$scope.icon4Rate = 'ion-android-star-outline'
		$scope.icon5Rate = 'ion-android-star-outline'
		break;
	case 4:
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star'
		$scope.icon4Rate = 'ion-android-star'
		$scope.icon5Rate = 'ion-android-star-outline'
		break;
	case 5:
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star'
		$scope.icon4Rate = 'ion-android-star'
		$scope.icon5Rate = 'ion-android-star'
		break;
	}
}
$scope.definirJogabilidadeRate = function(data){
	switch (data.ratingJogabilidade) {
	case 1:
		$scope.definirJRate1();
		break;
	case 2:
		$scope.definirJRate2()
		break;
	case 3:
		$scope.definirJRate3()
		break;
	case 4:
		$scope.definirJRate4()
		break;
	case 5:
		$scope.definirJRate5()
		break;
	default:
		$scope.icon1JRate = 'ion-android-star'
		$scope.icon2JRate = 'ion-android-star'
		$scope.icon3JRate = 'ion-android-star'
		$scope.icon4JRate = 'ion-android-star-outline'
		$scope.icon5JRate = 'ion-android-star-outline'
	}
}

$scope.definirJRate1 = function(){
	$scope.icon1JRate = 'ion-android-star'
	$scope.icon2JRate = 'ion-android-star-outline'
	$scope.icon3JRate = 'ion-android-star-outline'
	$scope.icon4JRate = 'ion-android-star-outline'
	$scope.icon5JRate = 'ion-android-star-outline'
	$scope.jogo.ratingJogabilidade = 1;
}
$scope.definirJRate2 = function(){
	$scope.icon1JRate = 'ion-android-star'
	$scope.icon2JRate = 'ion-android-star'
	$scope.icon3JRate = 'ion-android-star-outline'
	$scope.icon4JRate = 'ion-android-star-outline'
	$scope.icon5JRate = 'ion-android-star-outline'
	$scope.jogo.ratingJogabilidade = 2;
}
$scope.definirJRate3 = function(){
	$scope.icon1JRate = 'ion-android-star'
	$scope.icon2JRate = 'ion-android-star'
	$scope.icon3JRate = 'ion-android-star'
	$scope.icon4JRate = 'ion-android-star-outline'
	$scope.icon5JRate = 'ion-android-star-outline'
	$scope.jogo.ratingJogabilidade = 3;
}
$scope.definirJRate4 = function(){
	$scope.icon1JRate = 'ion-android-star'
	$scope.icon2JRate = 'ion-android-star'
	$scope.icon3JRate = 'ion-android-star'
	$scope.icon4JRate = 'ion-android-star'
	$scope.icon5JRate = 'ion-android-star-outline'
	$scope.jogo.ratingJogabilidade = 4;
}
$scope.definirJRate5 = function(){
	$scope.icon1JRate = 'ion-android-star'
	$scope.icon2JRate = 'ion-android-star'
	$scope.icon3JRate = 'ion-android-star'
	$scope.icon4JRate = 'ion-android-star'
	$scope.icon5JRate = 'ion-android-star'
	$scope.jogo.ratingJogabilidade = 5;
}

$scope.salvarRatingPopup = function(jogo){
	var confirmPopup = $ionicPopup.confirm({
		title: 'Salvar Rate',
		template: 'Gostaria de salvar o Rate atual ?'
	});
	confirmPopup.then(function(res) {
		if(res) {
			$scope.salvarRate(jogo);
			alteracoesSalvasPopup($ionicPopup)
		} else {
			console.log('Cancelar');
		}
	});
}

$scope.salvarRate = function(jogo){
	var headers = {headers : {'Content-Type' : 'application/json'}};
	$http.post("http://localhost:8080/saveGameRate", jogo, headers).success(function(data) {
		$scope.jogo = data;
	});
}

$scope.ocultarPopup = function(){
	var ocultar = "remover a ocultação"
	if($scope.jogo.isVisible){
		ocultar = "ocultar"
	}
	var confirmPopup = $ionicPopup.confirm({
		title: 'Ocultar Jogo',
		template: 'Gostaria de ' + ocultar + ' este jogo ?'
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
	$http.post("http://localhost:8080/hideGame", $scope.jogo, headers).success(function(data) {
		$scope.jogo = data;
	});
}
}])