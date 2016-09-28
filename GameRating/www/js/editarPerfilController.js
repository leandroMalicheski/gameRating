angular.module('app.editarPerfilController', [])
.controller('editarPerfilCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$window','$http', '$cordovaImagePicker', '$ionicPlatform',
function ($scope, $stateParams, $ionicPopup, $state, $window, $http, $cordovaImagePicker, $ionicPlatform) {
	$scope.perfil
	$scope.collection = {selectedImage : ''};
	$scope.carregarPerfil = function(){
		$scope.perfil = JSON.parse($window.localStorage['userOn'] || '[]');
	}
	
	$scope.salvarPopup = function(perfil){
			var confirmPopup = $ionicPopup.confirm({
			       title: 'Salvar',
			       template: 'Quer salvar suas alterações ?'
			     });
			confirmPopup.then(function(res) {
				if(res) {
					if($scope.validaCampos(perfil)){
						alteracoesSalvasPopup($ionicPopup)
						$scope.salvar(perfil);	
						$state.go('menu.editarPerfil',{})
					}
				} else {
					console.log('Cancelar');
				}
			});
	}
	
	$scope.validaCampos = function(perfil){
		if(perfil.name === undefined || perfil.name === ""){
			preenchaCamposPopup($ionicPopup)
		}else if (validaEmail(perfil.email, $ionicPopup)){
			return true
		}else if (perfil.passwordTip === undefined || perfil.passwordTip === ""){
			preenchaCamposPopup($ionicPopup)
		}else{
			return true
		}
	}
	
	$scope.alterarSenhaPopup = function(){
		$scope.data = {}
		var myPopup = $ionicPopup.show({
		       title: 'Alterar a senha',
		       template: 'Nova Senha:<input type="password" ng-model="data.senha"> <br> Confirmar Nova Senha:<input type="password" ng-model="data.confirmarSenha" > <br> Antiga Senha:<input type="password" ng-model="data.senhaAntiga" > ',
		       scope: $scope,
		       buttons: [{
		           text: 'Cancel'
		        }, {
		        	text: '<b>Salvar</b>',
		            type: 'button-positive',
		            onTap: function(e) {
			            if (!$scope.data.senha) {
			            	e.preventDefault();
			            } else {
			            	$scope.validaSenhas($scope.data)
			            }
		           }
		        }, ]
		});
	}
	
	$scope.validaSenhas = function(object){
		var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
		if(object.senha === undefined || object.senha === "" || object.confirmarSenha === undefined || object.confirmarSenha === "" || object.senhaAntiga === undefined || object.senhaAntiga === ""){
			preenchaCamposPopup($ionicPopup)
		}else if (object.senha === object.confirmarSenha ){
			var util = {}
			util.passwordEncrypted = object.senhaAntiga;
			var headers = {headers : {'Content-Type' : 'application/json'}};
			var request = getWebServices() + "/encryptPassword"
			$http.post(request, util, headers).success(function(data) {
				if(data.passwordEncrypted === $scope.perfil.password){
					if(mediumRegex.test(object.senha)){
						$scope.alterarSenha($scope.data)			            		
	            		alteracoesSalvasPopup($ionicPopup)
					}else{
						$scope.senhaFracaPopup($ionicPopup)
					}	
				}else{
					$scope.senhaAntigaInvalidaPopup($ionicPopup)
				}
			});
		}else{
			senhasDiferentesPopup($ionicPopup)
		}
	}
	
	$scope.senhaAntigaInvalidaPopup = function(ionicPopup){
		var alertPopup = ionicPopup.alert({
			title: 'Senha Antiga Inválida',
			template: 'A senha antiga encontra-se incorreta'
		});
	}
	
	$scope.alterarSenha = function(data){
		$scope.perfil.password = data.senha
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/updateUserPassword"
		$http.post(request, $scope.perfil, headers).success(function(data) {});
	}
	
	$scope.salvar = function(perfil){
		var headers = {headers : {'Content-Type' : 'application/json'}};
		var request = getWebServices() + "/updateUser"
		$http.post(request, perfil, headers).success(function(data) {
			$scope.perfil = perfil
			$window.localStorage['userOn'] = JSON.stringify(perfil);
		});
		
		
	}
	
	$scope.carregarImagem = function(){
		var options = {
		        maximumImagesCount: 1, 
		        width: 640,
		        height: 480,
		        quality: 80            
		    };
		 
		    $cordovaImagePicker.getPictures(options).then(function (results) {
		        for (var i = 0; i < results.length; i++) {
		            console.log('Image URI: ' + results[i]);
		            $scope.collection.selectedImage = results[i];
		            
	                window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){ 
	                    $scope.perfil.img = "data:image/png;base64,"+base64;
	                });
		        }
		    }, function(error) {
		        console.log('Error: ' + JSON.stringify(error));
		    });
	}

}])