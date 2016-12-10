angular
  .module('TPFBOCCASILE')
  .controller("PedidoAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FactoryPedido, FactoryRutas) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		}
		else
		{
			$state.go("inicio");
		}
		
		$scope.pedido={};
	}
 	catch(error)
 	{
 		console.info(error);
 		$scope.resultado.estilo = "COLORERROR";
		$scope.resultado.mensaje = "Error en el controlador pedido.";
		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
 	}
	$scope.Guardar = function(){
		try
		{
			FactoryPedido.Guardar($scope.pedido).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "COLORBIEN";
					$scope.resultado.mensaje = "Pedido guardado exitosamente.";
					$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORERROR";
					$scope.resultado.mensaje = "Error al guardar el pedido.";
					console.log(error);
					$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
			 });
		}
	 	catch(error)
	 	{
	 		console.info(error);
	 	}
	};
  })
  
  .controller("PedidoModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FileUploader, FactoryPedido) {

	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.elpedido = jwtHelper.decodeToken($auth.getToken());
			$scope.pedido = JSON.parse($stateParams.pedido);
		}
		else
		{
			$state.go("inicio");
		}
	}
	catch(error)
	{
		console.info(error);
	}

	
	$scope.Guardar = function(){
		try
		{
			FactoryPedido.Editar($scope.pedido);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Pedido editado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
		catch(error)
		{
			console.info(error);
		}
	};
})
  .controller("PedidosCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryPedido) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
				if($scope.usuarioLogeado.perfil == "cliente")
				{
				    $scope.escliente = true;
				}
				else
				{
				    $scope.escliente = false;
				}	
			}
			else
			{
				$state.go("inicio");
			}

		 	FactoryPedido.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoPedidos = respuesta;
		    	},function(error) {
	     			$scope.ListadoPedidos= [];
		 	});

	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORERROR";
		    $scope.resultado.mensaje = "Error en el controlador pedido.";
			$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 	}
		$scope.Modificar = function(pedido){
 		var param = JSON.stringify(pedido);
    	$state.go('pedido.pedido', {pedido:param});
 	}

	 	$scope.Bloquear = function(pedido){
	 		try
	 		{
	 			FactoryPedido.Bloquear(pedido.id);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORBIEN";
				$scope.resultado.mensaje = "Pedido deshabilitado exitosamente.";

		 		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORERROR";
				$scope.resultado.mensaje = "Error al deshabilitar un pedido.";
				$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
		 	}
	 	}
		
		$scope.Eliminar = function(pedido){
 		try
 		{
 			FactoryPedido.Eliminar(pedido.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Pedido eliminado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al eliminar un pedido.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
		
		$scope.Desbloquear = function(pedido){
		try
 		{
 			FactoryPedido.Desbloquear(pedido.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Pedido habilitado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al habilitar un pedido";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
	}
  });
;