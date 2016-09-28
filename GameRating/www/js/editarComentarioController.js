angular.module('app.editarComentarioController', [])
.controller('editarComentRioCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicHistory', '$state','$http','$window','$cordovaImagePicker', '$ionicPlatform',  
function ($scope, $stateParams, $ionicPopup, $ionicHistory, $state, $http, $window, $cordovaImagePicker, $ionicPlatform) {
	$scope.comentario
	$scope.collection = {selectedImage : ''};
	$scope.showInput = false;
	$scope.disableImageButton = false;
	var id = $stateParams.id
	
	$scope.carregarComentario = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = getWebServices() + "/getCommentById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.comentario = data		
			if($scope.comentario.body !== null){
				$scope.showInput = true;
				$scope.disableImageButton = true;
			}
		});
	}
	
	$scope.addLinkPopup = function(comentarioNovo){
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
			            	comentarioNovo.body = comentarioNovo.body + ' ' + $scope.data.link  
			            }
		           }
		        }, ]
		});
	}
	
	$scope.removerPopup = function (){
		var confirmPopup = $ionicPopup.confirm({
		     title: 'Apagar Comentário',
		     template: 'Quer apagar este comentário ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.remover();
				
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.comentarioRemovidoPopup = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Remover Comentário',
			template: 'O comentário foi removido com sucesso'
		});
	}
	
	$scope.remover = function(){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/removeComment"
		$http.post(request, $scope.comentario, headers).success(function(data) {
			$scope.comentarioRemovidoPopup()
			$ionicHistory.nextViewOptions({disableBack: true});
			$state.go('menu.meusComentRios2',{})
		});		
	}
	
	
	
	$scope.adicionarImagem = function(comentario){
		var options = {maximumImagesCount: 1, width: 640, height: 480, quality: 80};
		$cordovaImagePicker.getPictures(options).then(function (results) {
			for (var i = 0; i < results.length; i++) {
		        $scope.collection.selectedImage = results[i];
	            window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){
	            	$scope.comentario.img = base64
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
				$scope.salvar(topicoNovo);
				alteracoesSalvasPopup($ionicPopup)
			} else {
				console.log('Cancelar');
			}
		});
	}
	
	$scope.salvar = function(topicoNovo){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		user = JSON.parse($window.localStorage['userOn'] || '[]');
		$scope.comentario.user = user.login;
		var request = getWebServices() + "/updateComment"
		$http.post(request, $scope.comentario, headers).success(function(data) {});	
	}
}])