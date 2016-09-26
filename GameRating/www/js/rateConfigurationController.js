angular.module('app.rateConfigurationController', [])
.controller('calculoDeRateCtrl', ['$scope', '$stateParams','$http','$window', '$ionicPopup', 
function ($scope, $stateParams, $http, $window, $ionicPopup) {
	$scope.rateConfiguraion
	
	$scope.icon1JRate = 'ion-android-star-outline'
	$scope.icon2JRate = 'ion-android-star-outline'
	$scope.icon3JRate = 'ion-android-star-outline'
		
	$scope.icon1DRate = 'ion-android-star-outline'
	$scope.icon2DRate = 'ion-android-star-outline'
	$scope.icon3DRate = 'ion-android-star-outline'
	
	$scope.icon1ARate = 'ion-android-star-outline'
	$scope.icon2ARate = 'ion-android-star-outline'
	$scope.icon3ARate = 'ion-android-star-outline'
			
	$scope.icon1IRate = 'ion-android-star-outline'
	$scope.icon2IRate = 'ion-android-star-outline'
	$scope.icon3IRate = 'ion-android-star-outline'
		
	$scope.carregarConfiguracao = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getRateConfiguration"
		$http.get(request, headers).success(function(data) {
			$scope.rateConfiguraion = data
			$scope.definirJogabilidadeRate(data)
			$scope.definirDiversaoRate(data)
			$scope.definirAudioRate(data)
			$scope.definirImersaoRate(data)
		});
	}
	
	$scope.salvarRatingPopup = function(jogo){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Salvar Rate',
			template: 'Gostaria de salvar os pesos de Rate atual ?'
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
		$scope.rateConfiguraion.userLogin = user.login
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/updateRateConfiguration"
		$http.post(request, $scope.rateConfiguraion, headers).success(function(data) {});
	}
	
	$scope.definirJogabilidadeRate = function(data){
		switch (data.jogability) {
		case 1:
			$scope.definirJRate1();
			break;
		case 2:
			$scope.definirJRate2()
			break;
		case 3:
			$scope.definirJRate3()
			break;
		}
	}

	$scope.definirJRate1 = function(){
		$scope.icon1JRate = 'ion-android-star'
		$scope.icon2JRate = 'ion-android-star-outline'
		$scope.icon3JRate = 'ion-android-star-outline'
		$scope.rateConfiguraion.jogability = 1;
	}
	$scope.definirJRate2 = function(){
		$scope.icon1JRate = 'ion-android-star'
		$scope.icon2JRate = 'ion-android-star'
		$scope.icon3JRate = 'ion-android-star-outline'
		$scope.rateConfiguraion.jogability = 2;
	}
	$scope.definirJRate3 = function(){
		$scope.icon1JRate = 'ion-android-star'
		$scope.icon2JRate = 'ion-android-star'
		$scope.icon3JRate = 'ion-android-star'
		$scope.rateConfiguraion.jogability = 3;
	}

	$scope.definirDiversaoRate = function(data){
		switch (data.fun) {
		case 1:
			$scope.definirDRate1();
			break;
		case 2:
			$scope.definirDRate2()
			break;
		case 3:
			$scope.definirDRate3()
			break;
		}
	}

	$scope.definirDRate1 = function(){
		$scope.icon1DRate = 'ion-android-star'
		$scope.icon2DRate = 'ion-android-star-outline'
		$scope.icon3DRate = 'ion-android-star-outline'
		$scope.rateConfiguraion.fun = 1;
	}
	$scope.definirDRate2 = function(){
		$scope.icon1DRate = 'ion-android-star'
		$scope.icon2DRate = 'ion-android-star'
		$scope.icon3DRate = 'ion-android-star-outline'
		$scope.rateConfiguraion.fun = 2;
	}
	$scope.definirDRate3 = function(){
		$scope.icon1DRate = 'ion-android-star'
		$scope.icon2DRate = 'ion-android-star'
		$scope.icon3DRate = 'ion-android-star'
		$scope.rateConfiguraion.fun = 3;
	}

	$scope.definirAudioRate = function(data){
		switch (data.sound) {
		case 1:
			$scope.definirARate1();
			break;
		case 2:
			$scope.definirARate2()
			break;
		case 3:
			$scope.definirARate3()
			break;
		}
	}

	$scope.definirARate1 = function(){
		$scope.icon1ARate = 'ion-android-star'
		$scope.icon2ARate = 'ion-android-star-outline'
		$scope.icon3ARate = 'ion-android-star-outline'
		$scope.rateConfiguraion.sound = 1;
	}
	$scope.definirARate2 = function(){
		$scope.icon1ARate = 'ion-android-star'
		$scope.icon2ARate = 'ion-android-star'
		$scope.icon3ARate = 'ion-android-star-outline'
		$scope.rateConfiguraion.sound = 2;
	}
	$scope.definirARate3 = function(){
		$scope.icon1ARate = 'ion-android-star'
		$scope.icon2ARate = 'ion-android-star'
		$scope.icon3ARate = 'ion-android-star'
		$scope.rateConfiguraion.sound = 3;
	}


	$scope.definirImersaoRate = function(data){
		switch (data.immersion) {
		case 1:
			$scope.definirIRate1();
			break;
		case 2:
			$scope.definirIRate2()
			break;
		case 3:
			$scope.definirIRate3()
			break;
		}
	}

	$scope.definirIRate1 = function(){
		$scope.icon1IRate = 'ion-android-star'
		$scope.icon2IRate = 'ion-android-star-outline'
		$scope.icon3IRate = 'ion-android-star-outline'
		$scope.rateConfiguraion.immersion = 1;
	}
	$scope.definirIRate2 = function(){
		$scope.icon1IRate = 'ion-android-star'
		$scope.icon2IRate = 'ion-android-star'
		$scope.icon3IRate = 'ion-android-star-outline'
		$scope.rateConfiguraion.immersion = 2;
	}
	$scope.definirIRate3 = function(){
		$scope.icon1IRate = 'ion-android-star'
		$scope.icon2IRate = 'ion-android-star'
		$scope.icon3IRate = 'ion-android-star'
		$scope.rateConfiguraion.immersion = 3;
	}

}])