var miApp = angular.module('TPFBOCCASILE', ['ui.router', 'ngMap', 'angularFileUpload','satellizer', 'angular-jwt']);

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
			"login.clientes",
			{
				url:"/clientes",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/clientes.html",
					controller:"ClientesCtrl"
					}
				}
			}
		)
		
		.state(
			"login.empleados",
			{
				url:"/empleados",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/usuario/empleados.html",
					controller:"EmpleadosCtrl"
					}
				}
			}
		)
		
		.state(
			"producto",
			{
				url:"/producto",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/producto/abstractaProducto.html"
			}
		)

		.state(
			"producto.alta",
			{
				url:"/alta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/altaProducto.html",
					controller:"ProductoAltaCtrl"
					}
				}
			}
		)

		.state(
			"producto.productos",
			{
				url:"/productos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/productos.html",
					controller:"ProductosCtrl"
					}
				}
			}
		)
		
		.state(
			"producto.producto",
			{
				url:"/producto/:producto",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/modificarProducto.html",
					controller:"ProductoModificarCtrl"
					}
				}
			}
		)
		
		.state(
			"oferta",
			{
				url:"/oferta",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/oferta/abstractaOferta.html"
			}
		)

		.state(
			"oferta.alta",
			{
				url:"/alta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/oferta/altaOferta.html",
					controller:"OfertaAltaCtrl"
					}
				}
			}
		)

		.state(
			"oferta.ofertas",
			{
				url:"/ofertas",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/oferta/ofertas.html",
					controller:"OfertasCtrl"
					}
				}
			}
		)
		
		.state(
			"oferta.oferta",
			{
				url:"/oferta/:oferta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/oferta/modificarOferta.html",
					controller:"OfertaModificarCtrl"
					}
				}
			}
		)
		
		.state(
			"pedido",
			{
				url:"/pedido",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/pedido/abstractaPedido.html"
			}
		)

		.state(
			"pedido.alta",
			{
				url:"/alta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/pedido/altaPedido.html",
					controller:"PedidoAltaCtrl"
					}
				}
			}
		)

		.state(
			"pedido.pedidos",
			{
				url:"/pedidos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/pedido/pedidos.html",
					controller:"PedidosCtrl"
					}
				}
			}
		)
		
		.state(
			"pedido.pedido",
			{
				url:"/pedido/:pedido",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/pedido/modificarPedido.html",
					controller:"PedidoModificarCtrl"
					}
				}
			}
		)
		
		.state(
			"local",
			{
				url:"/local",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/local/abstractaLocal.html"
			}
		)

		.state(
			"local.alta",
			{
				url:"/alta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/local/altaLocal.html",
					controller:"LocalAltaCtrl"
					}
				}
			}
		)

		.state(
			"local.locales",
			{
				url:"/locales",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/local/locales.html",
					controller:"LocalesCtrl"
					}
				}
			}
		)
		
		.state(
			"local.local",
			{
				url:"/local/:local",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/local/modificarLocal.html",
					controller:"LocalModificarCtrl"
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