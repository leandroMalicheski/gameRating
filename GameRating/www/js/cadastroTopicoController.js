angular.module('app.cadastroTopicoController', [])
.controller('cadastrarTopicoCtrl', ['$scope', '$stateParams', '$state', '$ionicPopup', '$ionicHistory','$http','$window',
function ($scope, $stateParams, $state, $ionicPopup, $ionicHistory, $http, $window) {	
	
$scope.salvar = function(topicoNovo){
	user = JSON.parse($window.localStorage['userOn'] || '[]');
	topicoNovo.gameId = $stateParams.id
	topicoNovo.userId = user.id
	var headers = {headers : {'Content-Type' : 'application/json'}};
	$http.post("http://localhost:8080/addTopic", topicoNovo, headers).success(function(data) {});	
}	
$scope.adicionarImagem = function(topicoNovo){
	console.log("Vou adicionar Imagem o Tópico")
	console.log(topicoNovo)
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