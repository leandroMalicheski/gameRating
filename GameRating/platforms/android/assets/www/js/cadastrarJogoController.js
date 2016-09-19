angular.module('app.cadastrarJogo', [])
.controller('cadastrarJogoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $http, $window) {
		$scope.jogo	= {}
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
	
	
	$scope.cadastrar = function(jogo){
		if(validaJogo($scope.jogo, $ionicPopup)){
			$scope.salvar(jogo);					
		}else{
			preenchaCamposPopup($ionicPopup)
		}
	}
	
	$scope.salvar = function(jogo){
		user = JSON.parse($window.localStorage['userOn'] || '[]');
		jogo.userTempId = user.id
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/addGame", jogo, headers).success(function(data) {
			alteracoesSalvasPopup($ionicPopup)
		});	
		$scope.jogoSalvoPopup()
	}
	
	$scope.jogoSalvoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Jogo Adicionado',
			template: 'O jogo foi adicionado com sucesso'
		});
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