angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Home!")
	var showJogos = false;
	$scope.jogos = {};
	$scope.search = function(){		
		console.log("Chamei a Busca")
		console.log($scope.search.value)
		showJogos = true;
		$scope.jogos = [{id:1,titulo:"Hardline"},{id:2,titulo:"Hardline 2"}]
	}

}])
   
.controller('buscarUsuRioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Tela de buscar usuario!")
	$scope.search = function(){		
		console.log("Chamei a Busca")
		console.log($scope.search.value)
	}

}])
      
.controller('loginCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {
	console.log("Carreguei o Login")
	
	$scope.login = function(usuario){
		console.log("Vou validar o usuario abaixo:")
		console.log(usuario)	
		$state.go("menu.home", {});
	}

}])
   
.controller('cadastroCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Tela de Cadastro")
	
	$scope.cadastrar = function(usuario){
		console.log("Vou cadastrar esse usuario:")
		console.log(usuario)
	}
}])
   
.controller('perfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	
	console.log("Carreguei o Perfil do usuario")
	$scope.perfilMock = {nome:"leandro",email:"leandro.Malicheski@gmail.com",usuario:"leandroMalicheski",resposta:"Bob",imagePath:"teste"}
	console.log($scope.perfilMock)
	$scope.disable = function(){
		console.log("Vou Desabilitar Você!!")
	}
	
	
}])
   
.controller('perfilUsuRioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	

}])
   
.controller('editarPerfilCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a tela de editar o Perfil")
	$scope.perfil = {nome:"leandro",email:"leandro.Malicheski@gmail.com",usuario:"leandroMalicheski",resposta:"Bob",imagePath:"teste",senha:"123",senhaI:"123"}
	console.log($scope.perfilAtualMock)
	
	$scope.salvar = function(perfil){
		console.log("vou Salvar esse cara!")
		console.log($scope.perfil)
	}

}])
   
.controller('esqueceuASenhaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("carreguei a Tela de Esqueci minha senha")
	
	$scope.solicitarSenha = function(resposta) {
		console.log("Vou enviar uma senha, a resposta foi:")
		console.log(resposta)
	}

}])
   
.controller('meusTPicosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a Tela de Topicos")
	console.log($scope.topicosMock)
}])
   
.controller('tPicosOcultosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var id = $stateParams.id
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a Tela de Topicos Ocultos")
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)
}])
   
.controller('meusComentRiosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var id = $stateParams.id
	$scope.comentariosMock = [{id:1,corpo:"Corpo do comentario 1"},{id:2,corpo:"Corpo do comentario 2"},{id:3,corpo:"Corpo do comentario 3"}]
	console.log("Carreguei a Tela de Comentarios")
	console.log("cheguei e estou com id abaixo:")
	console.log($stateParams.id)

}])
   
.controller('comentRiosOcultosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var id = $stateParams.id
	$scope.comentariosMock = [{id:1,corpo:"Corpo do comentario 1",checked:true},{id:2,corpo:"Corpo do comentario 2",checked:false},{id:3,corpo:"Corpo do comentario 3",checked:false}]
	console.log("Carreguei a Tela de Comentarios Ocultos")
	console.log("cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.ocultar = function(){
		console.log("Vou ocultar o comentario")
	}
	
	$scope.remover = function(){
		console.log("Vou remover o comentario")
	}
}])
   
.controller('meusComentRios2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a Tela dos meus topicos/comentarios")
	console.log($scope.topicosMock)
}])
   
.controller('comentRiosOcultos2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.topicosMock = [{titulo:"Topico1",checked:true,id:1},{titulo:"Topico2",checked:true,id:2},{titulo:"Topico3",checked:true,id:3}]
	console.log("Carreguei a tela de Comentarios Ocultos")
	console.log($scope.topicosMock)
}])
   
.controller('editarTPicoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var id = $stateParams.id
	$scope.topicoMock = {id:1,titulo:"Titulo do Topico",corpo:"Corpo do tópico"}
	console.log("Carreguei a Tela de Editar Topico")
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)
	
	$scope.fechar = function(){
		console.log("Vou fechar o Tópico")
	}
	$scope.addLink = function(topicoNovo){
		console.log("Vou adicionar um link")
		console.log(topicoNovo)
	}
	$scope.remover = function(){
		console.log("Vou remover o Tópico")
	}
	$scope.adicionarImagem = function(topicoNovo){
		console.log("Vou adicionar Imagem o Tópico")
		console.log(topicoNovo)
	}
	$scope.salvar = function(topicoNovo){
		console.log("Vou salvar o Tópico")
		console.log(topicoNovo)
	}

}])
   
.controller('editarComentRioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	var id = $stateParams.id
	$scope.cometarioMock = {id:1,corpo:"Corpo do Comentario"}
	console.log("Carreguei a Tela de editar comentarios")
	console.log("Cheguei e estou com id abaixo:")
	console.log($stateParams.id)

	$scope.ocultar = function(){
		console.log("Vou ocultar o Comentario")
	}
	$scope.addLink = function(topicoNovo){
		console.log("Vou adicionar um link")
		console.log(topicoNovo)
	}
	$scope.remover = function(){
		console.log("Vou remover o Comentario")
	}
	$scope.adicionarImagem = function(topicoNovo){
		console.log("Vou adicionar Imagem o Comentario")
		console.log(topicoNovo)
	}
	$scope.salvar = function(topicoNovo){
		console.log("Vou salvar o Comentario")
		console.log(topicoNovo)
	}
}])
   
.controller('cadastrarJogoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Tela de Cadastro de Jogo")
	
	$scope.cadastrar = function(jogo){
		console.log("Recebi este jogo:")
		console.log(jogo)
	}

}])
   
.controller('jogoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('jogo2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('jogo3Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('configuraEsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
}])
   
.controller('tempoDeFechamentoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	console.log("Carreguei a Tela de Tempo de Fechamento Minimo")
	
	$scope.salvar = function(tempo){
		console.log("Recebi esse tempo:")
		console.log(tempo)
	}

}])
   
.controller('calculoDeRateCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('relatRiosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tPicoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 