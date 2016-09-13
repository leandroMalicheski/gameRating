angular.module('app.topicoController', [])
.controller('tPicoCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$http', '$window',
function ($scope, $stateParams, $ionicPopup, $state, $http, $window) {
	$scope.topico
	$scope.comentarios
	$scope.showComments = false
	var id = $stateParams.id
	
	$scope.carregarTopico = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getTopicById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.topico = data;
		});
		var request = "http://localhost:8080/getCommentsByTopicId?id="+id
		$http.get(request, headers).success(function(data) {
			if(data.length !== 0){
				$scope.comentarios = data
				$scope.showComments = true
			}
		});
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
			            	$scope.addLink(comentario)
			            }
		           }
		        }, ]
		});
	}
}])