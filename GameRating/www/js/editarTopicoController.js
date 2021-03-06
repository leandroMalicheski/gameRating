angular.module('app.editarTopicoController', [])
.controller('editarTPicoCtrl', ['$scope', '$stateParams','$ionicPopup', '$state', '$ionicHistory', "$http",'$window', '$cordovaImagePicker', '$ionicPlatform',
function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory,$http,$window,$cordovaImagePicker,$ionicPlatform) {
	$scope.topico
	$scope.topicoLocked = "ion-unlocked"
	$scope.collection = {selectedImage : ''};
	var id = $stateParams.id
	$scope.showTopicImage = false;
	
	$scope.carregarTopico = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getTopicByIdEdit?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.topico = data	
			$scope.checkVisibleClass($scope.topico.closed)
			if($scope.topico.img !== null){
				$scope.showTopicImage = true
			}
		});
	}
	
	$scope.salvar = function(topicoNovo){
		user = JSON.parse($window.localStorage['userOn'] || '[]');
		$scope.topico.userId = user.id
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/updateTopic"
		$http.post(request, $scope.topico, headers).success(function(data) {});
	}
	
	$scope.fechar = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/checkIfCanClose?id="+$scope.topico.id
		$http.get(request, headers).success(function(data) {
			var fechar = data
			if(fechar === 0){
				var headers = {headers : {'Content-Type' : 'application/json'}};
				var request = getWebServices() + "/updateCloseStatus"
				$http.post(request, $scope.topico, headers).success(function(data) {
					$scope.topico = data;
					$scope.checkVisibleClass($scope.topico.closed)
					$scope.topicoFechadoPopup()
				});
			}else{
				$scope.topicoNaoFechadoPopup();
			}
		});
		
	}

	$scope.remover = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/removeTopic"
		$http.post(request, $scope.topico, headers).success(function(data) {
			$scope.topicoRemovidoPopup()
			$ionicHistory.nextViewOptions({disableBack: true});
			$state.go('menu.meusTPicos',{})
		});
	}
	
	$scope.removerPopup = function (){
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Apagar Topico',
		     template: 'Quer apagar este topico ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.remover();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.topicoRemovidoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Fechar Tópico',
			template: 'O tópico foi removido com sucesso'
		});
	}
	
	$scope.topicoNaoFechadoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Fechar Tópico',
			template: 'Não foi possivel fechar o tópico, este ainda foi criado recentemente'
		});
	}
	
	$scope.fecharPopup = function (){
		var fechar = "fechar"
		if($scope.topico.closed){
			fechar = "reabrir"
		}
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Fechar Topico',
		       template: 'Gostaria de ' + fechar + ' este topico ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.fechar();
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.topicoFechadoPopup = function(){
		var	fechar = "reaberto"
		if($scope.topico.closed){
			fechar = "fechado"
		}
		var alertPopup = $ionicPopup.alert({
			title: 'Fechar Tópico',
			template: 'O tópico foi '+fechar+' com sucesso'
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
	
	$scope.adicionarImagem = function(topicoNovo){
		var options = {maximumImagesCount: 1, width: 640, height: 480, quality: 80};
		$cordovaImagePicker.getPictures(options).then(function (results) {
			for (var i = 0; i < results.length; i++) {
		        $scope.collection.selectedImage = results[i];
	            window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){
	            	$scope.topico.img = base64
	            });
			}
	    }, function(error) {
	    	console.log('Error: ' + JSON.stringify(error));
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
					alteracoesSalvasPopup($ionicPopup)
				}else{
					preenchaCamposPopup($ionicPopup)
				}
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.validaCampos = function(topicoNovo){
		if(topicoNovo.title === undefined || topicoNovo.title === "" || topicoNovo.body === undefined || topicoNovo.body === ""){
			return false
		}else{
			return true
		}
	}
	
	$scope.checkVisibleClass = function(locked){
		if(locked){
			$scope.topicoLocked = "ion-locked"
		}else{
			$scope.topicoLocked = "ion-unlocked"
		}
	}
}])