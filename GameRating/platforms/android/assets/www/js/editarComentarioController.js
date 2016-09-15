angular.module('app.editarComentarioController', [])
.controller('editarComentRioCtrl', ['$scope', '$stateParams', '$ionicPopup', '$ionicHistory', '$state','$http',  
function ($scope, $stateParams, $ionicPopup, $ionicHistory, $state, $http) {
	$scope.comentario
	var id = $stateParams.id
	
	$scope.carregarComentario = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getCommentById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.comentario = data			
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
		$http.post("http://localhost:8080/removeComment", $scope.comentario, headers).success(function(data) {
			$scope.comentarioRemovidoPopup()
			$ionicHistory.nextViewOptions({disableBack: true});
			$state.go('menu.meusComentRios2',{})
		});		
	}
	
	
	
	$scope.adicionarImagem = function(topicoNovo){
		console.log("Vou adicionar Imagem o Comentario")
		console.log(topicoNovo)
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
		$http.post("http://localhost:8080/updateComment", $scope.comentario, headers).success(function(data) {});	
	}
}])