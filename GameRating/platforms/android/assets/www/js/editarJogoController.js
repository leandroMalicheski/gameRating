angular.module('app.editarJogoController', [])
.controller('editarJogoCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$http', '$window', '$cordovaImagePicker', '$ionicPlatform', 
function ($scope, $stateParams, $state, $ionicPopup, $http, $window, $cordovaImagePicker, $ionicPlatform) {	
	$scope.jogo
	var id = $stateParams.id
	$scope.icon1Rate = 'ion-android-star-outline'
	$scope.icon2Rate = 'ion-android-star-outline'
	$scope.icon3Rate = 'ion-android-star-outline'
	$scope.icon4Rate = 'ion-android-star-outline'
	$scope.icon5Rate = 'ion-android-star-outline'
	
	$scope.getImageFromGallery = function() {       
        var options = {
	        maximumImagesCount: 1, 
	        width: 640,
	        height: 480,
	        quality: 80            
	    };
	 
	    $cordovaImagePicker.getPictures(options).then(function (results) {
	        for (var i = 0; i < results.length; i++) {
	            console.log('Image URI: ' + results[i]);
	            $scope.collection.selectedImage = results[i];
	            
                window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){ 
                    $scope.jogo.img = "data:image/png;base64,"+base64;
                });
	        }
	    }, function(error) {
	        console.log('Error: ' + JSON.stringify(error));
	    });
	}; 
		
	$scope.carregarJogo = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getJogoById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.jogo = data
			$scope.definirRate(data)
		});					
	}
	
	$scope.getImageFromGallery = function() {       
        var options = {
	        maximumImagesCount: 1, 
	        width: 640,
	        height: 480,
	        quality: 80            
	    };
	 
	    $cordovaImagePicker.getPictures(options).then(function (results) {
	        for (var i = 0; i < results.length; i++) {
	            console.log('Image URI: ' + results[i]);
	            $scope.collection.selectedImage = results[i];   
	            
                window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){
                    $scope.jogo.img = "data:image/png;base64,"+base64;
                });
	        }
	    }, function(error) {
	        console.log('Error: ' + JSON.stringify(error));
	    });
	}; 
	
	$scope.salvarPopup = function(jogo){
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Salvar Alterações',
		       template: 'Gostaria de salvar suas Alterações ?'
		     });
		confirmPopup.then(function(res) {
			if(res) {
				if(validaJogo($scope.jogo, $ionicPopup)){
					$scope.salvar(jogo);					
				}else{
					preenchaCamposPopup($ionicPopup)
				}
				
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.salvar = function(jogo){
		user = JSON.parse($window.localStorage['userOn'] || '[]');
		jogo.userTempId = user.id;
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/updateGame"
		$http.post(request, jogo, headers).success(function(data) {
			alteracoesSalvasPopup($ionicPopup)
		});
	}
	
	$scope.definirRate = function(data){
		switch (data.ratingMedio) {
		case 1:
			$scope.definirRate1()
			break;
		case 2:
			$scope.definirRate2()
			break;
		case 3:
			$scope.definirRate3()
			break;
		case 4:
			$scope.definirRate4()
			break;
		case 5:
			$scope.definirRate5()
			break;
		}
	}
	
	$scope.definirRate1 = function(){
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star-outline'
		$scope.icon3Rate = 'ion-android-star-outline'
		$scope.icon4Rate = 'ion-android-star-outline'
		$scope.icon5Rate = 'ion-android-star-outline'
		$scope.jogo.ratingMedio = 1;
	}
	$scope.definirRate2 = function(){
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star-outline'
		$scope.icon4Rate = 'ion-android-star-outline'
		$scope.icon5Rate = 'ion-android-star-outline'
		$scope.jogo.ratingMedio = 2;
	}
	$scope.definirRate3 = function(){
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star'
		$scope.icon4Rate = 'ion-android-star-outline'
		$scope.icon5Rate = 'ion-android-star-outline'
		$scope.jogo.ratingMedio = 3;
	}
	$scope.definirRate4 = function(){
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star'
		$scope.icon4Rate = 'ion-android-star'
		$scope.icon5Rate = 'ion-android-star-outline'
		$scope.jogo.ratingMedio = 4;
	}
	$scope.definirRate5 = function(){
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star'
		$scope.icon3Rate = 'ion-android-star'
		$scope.icon4Rate = 'ion-android-star'
		$scope.icon5Rate = 'ion-android-star'
		$scope.jogo.ratingMedio = 5;
	}
}])