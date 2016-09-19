angular.module('app.jogoRateController', [])

.controller('jogoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$window',
function ($scope, $stateParams,$ionicPopup, $http,$window) {
	var id = $stateParams.id
	$scope.jogo
	$scope.gameDisable = "ion-eye"
	$scope.isInsert = false;
	
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
		
	$scope.icon1DRate = 'ion-android-star-outline'
	$scope.icon2DRate = 'ion-android-star-outline'
	$scope.icon3DRate = 'ion-android-star-outline'
	$scope.icon4DRate = 'ion-android-star-outline'
	$scope.icon5DRate = 'ion-android-star-outline'	
	
	$scope.icon1ARate = 'ion-android-star-outline'
	$scope.icon2ARate = 'ion-android-star-outline'
	$scope.icon3ARate = 'ion-android-star-outline'
	$scope.icon4ARate = 'ion-android-star-outline'
	$scope.icon5ARate = 'ion-android-star-outline'
		
	$scope.icon1IRate = 'ion-android-star-outline'
	$scope.icon2IRate = 'ion-android-star-outline'
	$scope.icon3IRate = 'ion-android-star-outline'
	$scope.icon4IRate = 'ion-android-star-outline'
	$scope.icon5IRate = 'ion-android-star-outline'	
		
	$scope.mostrarDisable = false;
	$scope.mostrarEditar = false;
   
$scope.carregarJogo = function(){
	var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
	user = JSON.parse($window.localStorage['userOn'] || '[]');
	parameters = {params:{'userId': user.id, 'gameId' : id}}
	$http.get("http://localhost:8080/getRateInformation",parameters,headers).success(function(data) {
		if(user.profile == 0){
			$scope.mostrarDisable = true;
			$scope.mostrarEditar = true;
		}
		if(data.name === null){
			var request = "http://localhost:8080/getJogoById?id="+id
			$http.get(request, headers).success(function(data2) {
				$scope.jogo = data2;
				$scope.isInsert = true;
				$scope.definirRate(data2)
				$scope.definirJogabilidadeRate(data2)
				$scope.definirDiversaoRate(data2)
				$scope.definirAudioRate(data2)
				$scope.definirImersaoRate(data2)
				$scope.checkVisibleClass($scope.jogo.isVisible)
			});	
		}else{
			$scope.jogo = data
			$scope.checkVisibleClass($scope.jogo.isVisible)
			$scope.definirRate(data)
			$scope.definirJogabilidadeRate(data)
			$scope.definirDiversaoRate(data)
			$scope.definirAudioRate(data)
			$scope.definirImersaoRate(data)
		}	
	});
}

$scope.salvarRatingPopup = function(jogo){
	var confirmPopup = $ionicPopup.confirm({
		title: 'Salvar Rate',
		template: 'Gostaria de salvar o Rate atual ?'
	});
	confirmPopup.then(function(res) {
		if(res) {
			$scope.salvarRate(jogo);
		} else {
			console.log('Cancelar');
		}
	});
}
$scope.salvarRate = function(jogo){
	user = JSON.parse($window.localStorage['userOn'] || '[]');
	jogo.userTempId = user.id
	if($scope.isInsert){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/addRate", jogo, headers).success(function(data) {
			alteracoesSalvasPopup($ionicPopup)
		});	
	}else{
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateRate", jogo, headers).success(function(data) {
		alteracoesSalvasPopup($ionicPopup)
		});
	}
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
	$http.post("http://localhost:8080/updateVisibility", $scope.jogo, headers).success(function(data) {
		$scope.jogo = data
		$scope.checkVisibleClass($scope.jogo.isVisible)
		alteracoesSalvasPopup($ionicPopup)
	});
}

$scope.checkVisibleClass = function(visibility){
	if(visibility){
		$scope.gameDisable = "ion-eye"
	}else{
		$scope.gameDisable = "ion-eye-disabled"
	}
}
   
$scope.definirRate = function(data){
	switch (data.ratingMedio) {
	case 1:
		$scope.icon1Rate = 'ion-android-star'
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

$scope.definirDiversaoRate = function(data){
	switch (data.ratingDiversao) {
	case 1:
		$scope.definirDRate1();
		break;
	case 2:
		$scope.definirDRate2()
		break;
	case 3:
		$scope.definirDRate3()
		break;
	case 4:
		$scope.definirDRate4()
		break;
	case 5:
		$scope.definirDRate5()
		break;
	default:
		$scope.icon1DRate = 'ion-android-star'
		$scope.icon2DRate = 'ion-android-star'
		$scope.icon3DRate = 'ion-android-star'
		$scope.icon4DRate = 'ion-android-star-outline'
		$scope.icon5DRate = 'ion-android-star-outline'
	}
}

$scope.definirDRate1 = function(){
	$scope.icon1DRate = 'ion-android-star'
	$scope.icon2DRate = 'ion-android-star-outline'
	$scope.icon3DRate = 'ion-android-star-outline'
	$scope.icon4DRate = 'ion-android-star-outline'
	$scope.icon5DRate = 'ion-android-star-outline'
	$scope.jogo.ratingDiversao = 1;
}
$scope.definirDRate2 = function(){
	$scope.icon1DRate = 'ion-android-star'
	$scope.icon2DRate = 'ion-android-star'
	$scope.icon3DRate = 'ion-android-star-outline'
	$scope.icon4DRate = 'ion-android-star-outline'
	$scope.icon5DRate = 'ion-android-star-outline'
	$scope.jogo.ratingDiversao = 2;
}
$scope.definirDRate3 = function(){
	$scope.icon1DRate = 'ion-android-star'
	$scope.icon2DRate = 'ion-android-star'
	$scope.icon3DRate = 'ion-android-star'
	$scope.icon4DRate = 'ion-android-star-outline'
	$scope.icon5DRate = 'ion-android-star-outline'
	$scope.jogo.ratingDiversao = 3;
}
$scope.definirDRate4 = function(){
	$scope.icon1DRate = 'ion-android-star'
	$scope.icon2DRate = 'ion-android-star'
	$scope.icon3DRate = 'ion-android-star'
	$scope.icon4DRate = 'ion-android-star'
	$scope.icon5DRate = 'ion-android-star-outline'
	$scope.jogo.ratingDiversao = 4;
}
$scope.definirDRate5 = function(){
	$scope.icon1DRate = 'ion-android-star'
	$scope.icon2DRate = 'ion-android-star'
	$scope.icon3DRate = 'ion-android-star'
	$scope.icon4DRate = 'ion-android-star'
	$scope.icon5DRate = 'ion-android-star'
	$scope.jogo.ratingDiversao = 5;
}

$scope.definirAudioRate = function(data){
	switch (data.ratingAudio) {
	case 1:
		$scope.definirARate1();
		break;
	case 2:
		$scope.definirARate2()
		break;
	case 3:
		$scope.definirARate3()
		break;
	case 4:
		$scope.definirARate4()
		break;
	case 5:
		$scope.definirARate5()
		break;
	default:
		$scope.icon1ARate = 'ion-android-star'
		$scope.icon2ARate = 'ion-android-star'
		$scope.icon3ARate = 'ion-android-star'
		$scope.icon4ARate = 'ion-android-star-outline'
		$scope.icon5ARate = 'ion-android-star-outline'
	}
}

$scope.definirARate1 = function(){
	$scope.icon1ARate = 'ion-android-star'
	$scope.icon2ARate = 'ion-android-star-outline'
	$scope.icon3ARate = 'ion-android-star-outline'
	$scope.icon4ARate = 'ion-android-star-outline'
	$scope.icon5ARate = 'ion-android-star-outline'
	$scope.jogo.ratingAudio = 1;
}
$scope.definirARate2 = function(){
	$scope.icon1ARate = 'ion-android-star'
	$scope.icon2ARate = 'ion-android-star'
	$scope.icon3ARate = 'ion-android-star-outline'
	$scope.icon4ARate = 'ion-android-star-outline'
	$scope.icon5ARate = 'ion-android-star-outline'
	$scope.jogo.ratingAudio = 2;
}
$scope.definirARate3 = function(){
	$scope.icon1ARate = 'ion-android-star'
	$scope.icon2ARate = 'ion-android-star'
	$scope.icon3ARate = 'ion-android-star'
	$scope.icon4ARate = 'ion-android-star-outline'
	$scope.icon5ARate = 'ion-android-star-outline'
	$scope.jogo.ratingAudio = 3;
}
$scope.definirARate4 = function(){
	$scope.icon1ARate = 'ion-android-star'
	$scope.icon2ARate = 'ion-android-star'
	$scope.icon3ARate = 'ion-android-star'
	$scope.icon4ARate = 'ion-android-star'
	$scope.icon5ARate = 'ion-android-star-outline'
	$scope.jogo.ratingAudio = 4;
}
$scope.definirARate5 = function(){
	$scope.icon1ARate = 'ion-android-star'
	$scope.icon2ARate = 'ion-android-star'
	$scope.icon3ARate = 'ion-android-star'
	$scope.icon4ARate = 'ion-android-star'
	$scope.icon5ARate = 'ion-android-star'
	$scope.jogo.ratingAudio = 5;
}

$scope.definirImersaoRate = function(data){
	switch (data.ratingImersao) {
	case 1:
		$scope.definirIRate1();
		break;
	case 2:
		$scope.definirIRate2()
		break;
	case 3:
		$scope.definirIRate3()
		break;
	case 4:
		$scope.definirIRate4()
		break;
	case 5:
		$scope.definirIRate5()
		break;
	default:
		$scope.icon1IRate = 'ion-android-star'
		$scope.icon2IRate = 'ion-android-star'
		$scope.icon3IRate = 'ion-android-star'
		$scope.icon4IRate = 'ion-android-star-outline'
		$scope.icon5IRate = 'ion-android-star-outline'
	}
}

$scope.definirIRate1 = function(){
	$scope.icon1IRate = 'ion-android-star'
	$scope.icon2IRate = 'ion-android-star-outline'
	$scope.icon3IRate = 'ion-android-star-outline'
	$scope.icon4IRate = 'ion-android-star-outline'
	$scope.icon5IRate = 'ion-android-star-outline'
	$scope.jogo.ratingImersao = 1;
}
$scope.definirIRate2 = function(){
	$scope.icon1IRate = 'ion-android-star'
	$scope.icon2IRate = 'ion-android-star'
	$scope.icon3IRate = 'ion-android-star-outline'
	$scope.icon4IRate = 'ion-android-star-outline'
	$scope.icon5IRate = 'ion-android-star-outline'
	$scope.jogo.ratingImersao = 2;
}
$scope.definirIRate3 = function(){
	$scope.icon1IRate = 'ion-android-star'
	$scope.icon2IRate = 'ion-android-star'
	$scope.icon3IRate = 'ion-android-star'
	$scope.icon4IRate = 'ion-android-star-outline'
	$scope.icon5IRate = 'ion-android-star-outline'
	$scope.jogo.ratingImersao = 3;
}
$scope.definirIRate4 = function(){
	$scope.icon1IRate = 'ion-android-star'
	$scope.icon2IRate = 'ion-android-star'
	$scope.icon3IRate = 'ion-android-star'
	$scope.icon4IRate = 'ion-android-star'
	$scope.icon5IRate = 'ion-android-star-outline'
	$scope.jogo.ratingImersao = 4;
}
$scope.definirIRate5 = function(){
	$scope.icon1IRate = 'ion-android-star'
	$scope.icon2IRate = 'ion-android-star'
	$scope.icon3IRate = 'ion-android-star'
	$scope.icon4IRate = 'ion-android-star'
	$scope.icon5IRate = 'ion-android-star'
	$scope.jogo.ratingImersao = 5;
}
}])