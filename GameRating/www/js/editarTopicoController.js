angular.module('app.editarTopicoController', [])
.controller('editarTPicoCtrl', ['$scope', '$stateParams','$ionicPopup', '$state', '$ionicHistory', "$http",
function ($scope, $stateParams, $ionicPopup, $state, $ionicHistory,$http) {
	$scope.topico
	$scope.topicoLocked = "ion-unlocked"
		
	$scope.carregarTopico = function(){
		var id = $stateParams.id
		var headers = {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}};
		var request = "http://localhost:8080/getTopicById?id="+id
		$http.get(request, headers).success(function(data) {
			$scope.topico = data	
			$scope.checkVisibleClass($scope.topico.closed)
		});
	}
	
	$scope.fecharPopup = function (){
		var fechar = "fechar"
			var confirmPopup = $ionicPopup.confirm({
			       title: 'Fechar Topico',
			       template: 'Quer ' + fechar + ' este topico ?'
			     });
			confirmPopup.then(function(res) {
				if(res) {
					$scope.fechar();
				} else {
					console.log('Cancelar');
				}
			});
	}
	
	$scope.fechar = function(){
		console.log("Vou fechar o Tópico")
		$scope.topicoFechadoPopup()
	}
	
	$scope.topicoFechadoPopup = function(){
		var fechar = "fechado"
		var alertPopup = $ionicPopup.alert({
			title: 'Fechar Tópico',
			template: 'O tópico foi '+fechar+' com sucesso'
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
		var remover = "removido"
		var alertPopup = $ionicPopup.alert({
			title: 'Fechar Tópico',
			template: 'O tópico foi '+remover+' com sucesso'
		});
	}
	
	$scope.remover = function(){
		console.log("Vou remover o Tópico")
		$scope.topicoRemovidoPopup()
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.meusTPicos',{})
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
			            	topicoNovo.corpo = topicoNovo.corpo + ' ' + $scope.data.link  
			            	$scope.addLink(topicoNovo)
			            }
		           }
		        }, ]
		});
	}
	
	$scope.addLink = function(topicoNovo){
		console.log("Vou adicionar um link")
		console.log(topicoNovo)
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
		if(topicoNovo.titulo === undefined || topicoNovo.titulo === "" || topicoNovo.corpo === undefined || topicoNovo.corpo === ""){
			return false
		}else{
			return true
		}
	}
	
	$scope.salvar = function(topicoNovo){
		console.log("Vou salvar o Tópico")
		console.log(topicoNovo)
	}
	
	$scope.checkVisibleClass = function(locked){
		if(locked){
			$scope.topicoLocked = "ion-locked"
		}else{
			$scope.topicoLocked = "ion-unlocked"
		}
	}
}])