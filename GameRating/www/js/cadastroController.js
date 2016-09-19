angular.module('app.cadastroController', [])
.controller('cadastroCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$http', '$cordovaImagePicker',
function ($scope, $stateParams, $ionicPopup, $state, $http, $cordovaImagePicker) {
	$scope.usuario = {img:'../img/defaultImage.jpg'}
	$scope.cadastrar = function(usuario){
		if(usuario === undefined){
			preenchaCamposPopup($ionicPopup)
		}else if($scope.validaCampos(usuario)){
			var headers = {headers : {'Content-Type' : 'application/json'}};
			$http.post("http://localhost:8080/addUser", usuario, headers).success(function(data) {
				$scope.usuarioCadastradoPopup()																	
			});
		}
	}
	
	$scope.getImageSaveContact = function() {       
        var options = {
	        maximumImagesCount: 1, 
	        width: 800,
	        height: 800,
	        quality: 80            
	    };
	 
	    $cordovaImagePicker.getPictures(options).then(function (results) {
	        for (var i = 0; i < results.length; i++) {
	            console.log('Image URI: ' + results[i]);
	        }
	    }, function(error) {
	        console.log('Error: ' + JSON.stringify(error));
	    });
	};  
	
	$scope.usuarioCadastradoPopup = function(){
		var myPopup = $ionicPopup.show({
		       title: 'Usuario Cadastrado',
		       template: 'Usuario cadastrado com sucesso',
		       buttons: [{
		           text: '<b>Ok</b>',
		            type: 'button-positive',
		            onTap: function(e) {
		            	$state.go("login", {})  
		           }
		        }, ]
		});
	}
	
	$scope.validaCampos = function(usuario){
		var validade = true
		if(usuario.name === undefined){
			preenchaCamposPopup($ionicPopup)
			validade = false
		}else if (!validaEmail(usuario.email, $ionicPopup)){
			validade = false
		}else if (validaUsuario(usuario.login, $ionicPopup, $http)){
			validade = false
		}else if (!validaSenha(usuario, $ionicPopup)){
			validade = false
		}else if (usuario.passwordTip === undefined){
			preenchaCamposPopup($ionicPopup)
			validade = false
		}
		return validade
	}	
}])