angular.module('app.cadastrarJogo', [])
.controller('cadastrarJogoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$http', '$window', '$cordovaImagePicker', '$ionicPlatform', 
function ($scope, $stateParams, $ionicPopup, $http, $window, $cordovaImagePicker, $ionicPlatform) {
		$scope.jogo	= {img:'data:image/png;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAPAAA/+EDLWh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozRkNFMzU3RDg2QUYxMUU1OEM4OENCQkI2QTc0MTkwRSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozRkNFMzU3Qzg2QUYxMUU1OEM4OENCQkI2QTc0MTkwRSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDEwNzlDODNCQThDMTFFMjg5NTlFMDAzODgzMjZDMkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDEwNzlDODRCQThDMTFFMjg5NTlFMDAzODgzMjZDMkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoL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mhNky5fTkBYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=', ratingJogabilidade:1, ratingDiversao:1, ratingAudio:1, ratingImersao:1}
		$scope.collection = {selectedImage : ''};
		
		$scope.icon1Rate = 'ion-android-star'
		$scope.icon2Rate = 'ion-android-star-outline'
		$scope.icon3Rate = 'ion-android-star-outline'
		$scope.icon4Rate = 'ion-android-star-outline'
		$scope.icon5Rate = 'ion-android-star-outline'
		
		$scope.icon1JRate = 'ion-android-star'
		$scope.icon2JRate = 'ion-android-star-outline'
		$scope.icon3JRate = 'ion-android-star-outline'
		$scope.icon4JRate = 'ion-android-star-outline'
		$scope.icon5JRate = 'ion-android-star-outline'
			
		$scope.icon1DRate = 'ion-android-star'
		$scope.icon2DRate = 'ion-android-star-outline'
		$scope.icon3DRate = 'ion-android-star-outline'
		$scope.icon4DRate = 'ion-android-star-outline'
		$scope.icon5DRate = 'ion-android-star-outline'	
		
		$scope.icon1ARate = 'ion-android-star'
		$scope.icon2ARate = 'ion-android-star-outline'
		$scope.icon3ARate = 'ion-android-star-outline'
		$scope.icon4ARate = 'ion-android-star-outline'
		$scope.icon5ARate = 'ion-android-star-outline'
			
		$scope.icon1IRate = 'ion-android-star'
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
		var request = getWebServices() + "/addGame"
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post(request, jogo, headers).success(function(data) {
			$scope.jogoSalvoPopup()			
		});	
	}
	
	$scope.getImageFromGallery = function() {       
        var options = {maximumImagesCount: 1, width: 640, height: 480, quality: 80};
	    $cordovaImagePicker.getPictures(options).then(function (results) {
	    for (var i = 0; i < results.length; i++) {
	    	$scope.collection.selectedImage = results[i];
            window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){ 
            	$scope.jogo.img = base64;
            });
	    }
		}, function(error) {
			console.log('Error: ' + JSON.stringify(error));
		});
	};  
	
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