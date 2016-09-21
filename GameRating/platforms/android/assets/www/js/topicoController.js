angular.module('app.topicoController', [])
.controller('tPicoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $state, $http, $window) {
	$scope.topico
	$scope.comentarios = []
	$scope.showComments = false
	$scope.showDisable = false
	$scope.linkComment = true
	$scope.topicDisable = "ion-eye";
	var id = $stateParams.id
	
	$scope.carregarTopico = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var user = JSON.parse($window.localStorage['userOn'] || '[]');
		var parameters = {params:{'userId': user.id, 'topicId' : id}}
		$http.get("http://localhost:8080/getTopicById",parameters, headers).success(function(data) {
			$scope.topico = data;
			$scope.checkVisibleClass($scope.topico.visible)
		});
		var request = "http://localhost:8080/getCommentsByTopicId?id="+id
		$http.get(request, headers).success(function(data) {
			if(data.length !== 0){
				$scope.comentarios = data
				$scope.showComments = true
			}
		});
		if(user.profile !== 2){
			$scope.showDisable = true
			$scope.linkComment = false
		}
	}
	
	$scope.gravarComentario = function(comentario){
		if(comentario.body === undefined || comentario.body === ""){
			preenchaCamposPopup($ionicPopup)
		}else{
			user = JSON.parse($window.localStorage['userOn'] || '[]');
			comentario.userId = user.id
			comentario.topicId = id
			var headers = {headers : {'Content-Type' : 'application/json'}};
			$http.post("http://localhost:8080/addComment", comentario, headers).success(function(data) {
				$scope.comentarios.push(data)
				$scope.showComments = true;
				comentario.body = "";
			});
			$scope.comentarioAdicionado()
			$state.go('menu.tPico',$stateParams.id)
		}
	}
	
	$scope.adicionarImagem = function(topicoNovo){
		console.log("Vou adicionar Imagem o Tópico")
		console.log(topicoNovo)
	}
	
	$scope.comentarioAdicionado = function(){
		var alertPopup = $ionicPopup.alert({
			title: 'Comentário Adicionado',
			template: 'Seu Comentário foi adicionado com sucesso'
		});
	}
	
	$scope.checkVisibleClass = function(visibility){
		if(visibility){
			$scope.topicDisable = "ion-eye"
		}else{
			$scope.topicDisable = "ion-eye-disabled"
		}
	}
	
	$scope.ocultarPopup = function(){
		var ocultar = "remover a ocultação"
		if($scope.topico.visible){
			ocultar = "ocultar"
		}
		var confirmPopup = $ionicPopup.confirm({
		       title: 'Ocultar Tópico',
		       template: 'Gostaria de ' + ocultar + ' este Tópico ?'
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
		$http.post("http://localhost:8080/updateTopicVisibility", $scope.topico, headers).success(function(data) {
			$scope.topico = data
			$scope.checkVisibleClass($scope.topico.visible)
			alteracoesSalvasPopup($ionicPopup)
		});
	}
	
	$scope.addLinkPopup = function(comentario){
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
			            	comentario.body = comentario.body + ' ' + $scope.data.link  
			            }
		           }
		        }, ]
		});
	}
}])