angular.module('app.editarTopicoController', [])
.controller('editarTPicoCtrl', ['$scope', '$stateParams','$ionicPopup', '$state', '$ionicHistory', "$http",'$window',
function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory,$http,$window) {
	$scope.topico
	$scope.topicoLocked = "ion-unlocked"
	var id = $stateParams.id
		
	$scope.carregarTopico = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getTopicByIdEdit?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.topico = data	
			$scope.checkVisibleClass($scope.topico.closed)
		});
	}
	
	$scope.salvar = function(topicoNovo){
		user = JSON.parse($window.localStorage['userOn'] || '[]');
		$scope.topico.userId = user.id
		var headers = {headers : {'Content-Type' : 'application/json'}};
		$http.post("http://localhost:8080/updateTopic", $scope.topico, headers).success(function(data) {});
	}
	
	$scope.fechar = function(){
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/checkIfCanClose?id="+$scope.topico.id
		$http.get(request, headers).success(function(data) {
			var fechar = data
			if(fechar === 0){
				var headers = {headers : {'Content-Type' : 'application/json'}};
				$http.post("http://localhost:8080/updateCloseStatus", $scope.topico, headers).success(function(data) {
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
		$http.post("http://localhost:8080/removeTopic", $scope.topico, headers).success(function(data) {
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
		console.log("Vou adicionar Imagem o Tópico")
		console.log(topicoNovo)
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