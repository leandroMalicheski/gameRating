angular.module('app.cadastroTopicoController', [])
.controller('cadastrarTopicoCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$ionicHistory','$http','$window',  '$cordovaImagePicker', '$ionicPlatform',
function ($scope, $stateParams, $state, $ionicPopup, $ionicHistory, $http, $window, $cordovaImagePicker, $ionicPlatform) {	
	
$scope.collection = {selectedImage : ''};
	
$scope.salvar = function(topicoNovo){
	user = JSON.parse($window.localStorage['userOn'] || '[]');
	topicoNovo.gameId = $stateParams.id
	topicoNovo.userId = user.id
	var request = getWebServices() + "/addTopic"
	var headers = {headers : {'Content-Type' : 'application/json'}};
	$http.post(request, topicoNovo, headers).success(function(data) {});	
}	

$scope.adicionarImagem = function(topicoNovo){
	var options = {maximumImagesCount: 1, width: 640, height: 480, quality: 80};
	$cordovaImagePicker.getPictures(options).then(function (results) {
		for (var i = 0; i < results.length; i++) {
	        $scope.collection.selectedImage = results[i];
	        window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){ 
            	topicoNovo.img = base64;
	        });
		}
	}, function(error) {
		console.log('Error: ' + JSON.stringify(error));
	});
}
	
$scope.addLinkPopup = function(topicoNovo){
	$scope.data = {}
	var myPopup = $ionicPopup.show({
	       title: 'Adicionar Link',
	       template: 'Link:<input type="text" ng-model="data.link" placeholder="cole o link aqui">',
	       scope: $scope,
	       buttons: [{
	           text: 'Cancel'
	        }, {
	        	text: '<b>Adicionar</b>',
	            type: 'button-positive',
	            onTap: function(e) {
		            if (!$scope.data.link) {
		            	e.preventDefault();
		            } else {
		            	topicoNovo.body = topicoNovo.body + ' ' + $scope.data.link  
		            }
	           }
	        }, ]
	});
}
	
$scope.salvarPopup = function (topicoNovo){
	var confirmPopup = $ionicPopup.confirm({
	     title: 'Salvar Alterações',
	     template: 'Salvar suas alterações ?'
	});
	confirmPopup.then(function(res) {
		if(res) {
			if($scope.validaCampos(topicoNovo)){
				$scope.salvar(topicoNovo);
				$scope.topicoAdicionadoPopup()
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$state.go('menu.jogo3',{id:topicoNovo.gameId})
			}else{
				preenchaCamposPopup($ionicPopup)
			}
		} else {
			console.log('Cancelar');
		}
	});
}
	
$scope.topicoAdicionadoPopup = function(){
	var alertPopup = $ionicPopup.alert({
		title: 'Tópico Adicionado',
		template: 'Seu tópico foi adicionado com sucesso'
	});
}
	
$scope.validaCampos = function(topico){
	if(topico === undefined){
		return false
	}else{
		if(topico.title === undefined || topico.title === "" || topico.body === "" || topico.body === undefined){
			return false
		}else{
			return true
		}			
	}
}
}])