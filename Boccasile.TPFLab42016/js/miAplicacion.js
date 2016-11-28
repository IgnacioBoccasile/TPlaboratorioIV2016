var miApp = angular.module('SPBOCCASILE', ['ui.router', 'angularFileUpload','satellizer', 'angular-jwt']);

miApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	//proveedor de autentificacion.
	$authProvider.loginUrl = 'http://localhost/Boccasile.TPFLab42016/ws/jwt/php/auth.php';
	$authProvider.tokenName = 'MiTokenGeneradoEnPHP';
	$authProvider.tokenPrefix = 'Aplicacion';
	//$authProvider.authReader = 'data';

	//aca se genera el ruteo atravez de estados

	$stateProvider
		.state(
			"inicio",
			{
				url:"/inicio",
				cache:false,
				templateUrl:"vistas/inicio.html",
				controller:"InicioCtrl"
			}
		)

		.state(
			"login",
			{
				url:"/login",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/usuario/abstractaLogin.html"
			}
		)

		.state(
			"login.login",
			{
				url:"/login",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/login.html",
					controller:"LoginCtrl"
					}
				}
			}
		)
		
		.state(
			"login.registro",
			{
				url:"/registro",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/registro.html",
					controller:"RegistroCtrl"
					}
				}
			}
		)
		
		.state(
			"login.registroEC",
			{
				url:"/registroEC",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/registroEC.html",
					controller:"RegistroECCtrl"
					}
				}
			}
		)
		
		.state(
			"login.registroEEC",
			{
				url:"/registroEEC",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/registroEEC.html",
					controller:"RegistroEECCtrl"
					}
				}
			}
		)
		
		.state(
			"login.usuario",
			{
				url:"/usuario/:usuario",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/modificarUsuario.html",
					controller:"UsuarioModificarCtrl"
					}
				}
			}
		)

		.state(
			"login.usuarios",
			{
				url:"/usuarios",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/usuarios.html",
					controller:"UsuariosCtrl"
					}
				}
			}
		)
		
		.state(
			"menu",
			{
				url:"/menu",
				cache:false,
				templateUrl:"vistas/menu.html",
				controller:"MenuCtrl"
			}
		)

	$urlRouterProvider.otherwise("/inicio");
});




