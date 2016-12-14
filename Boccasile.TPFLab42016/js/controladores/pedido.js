angular
  .module('TPFBOCCASILE')
  .controller("PedidoAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FactoryPedido, FactoryRutas, FactoryProducto, FactoryLocal) {
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
		
		var f = new Date();
		
		var fecha =f.getFullYear() + "-"+(f.getMonth() +1)+"-"+f.getDate();

		$scope.fechahoy =f.getFullYear() + "-"+(f.getMonth() +1)+"-"+f.getDate();
		
		$scope.ListadoProductos=[];
		
		$scope.pedido={};
		
		$scope.pedido.fechaPedido =new Date(f.getFullYear(), f.getMonth(), f.getDate());

		FactoryLocal.BuscarTodos().then(
			function(respuesta) {     	
				$scope.ListadoLocales = respuesta;
			},function(error) {
				$scope.ListadoLocales= [];
		});
		
		FactoryProducto.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoProductos = respuesta;
		    	},function(error) {
	     			$scope.ListadoProductos= [];
		 	});	
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
	
	if($scope.usuario.perfil == "cliente")
	{
		$scope.pedido.idUsuario = $scope.usuario.idUsuario;
	}
	
	for(var i=0;i<$scope.ListadoProductos.length;i++)
   	{
		if($scope.ListadoProductos[i].nombre == $scope.pedido.descripcion)
		{
			$scope.pedido.idProducto = $scope.ListadoProductos[i].idProducto;
			$scope.pedido.precio = $scope.ListadoProductos[i].precio * $scope.pedido.unidades;
		}
    	
    }
	
	//$scope.pedido.enviado = "0";
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
  
  .controller("PedidoModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FactoryPedido, FactoryProducto) {

	try
	{
		$scope.pedido = {};
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
	FactoryProducto.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoProductos = respuesta;
		    	},function(error) {
	     			$scope.ListadoProductos= [];
		 	});	
	
	$scope.Guardar = function(){
		for(var i=0;i<$scope.ListadoProductos.length;i++)
   		{
   			if($scope.ListadoProductos[i].nombre == $scope.pedido.descripcion)
   			{
   				$scope.pedido.idProducto = $scope.ListadoProductos[i].idProducto;
   				$scope.pedido.precio = $scope.ListadoProductos[i].precio * $scope.pedido.unidades;
   			}
    	
    	}
		
		
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
  .controller("PedidosCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryPedido, FactoryProducto, FactoryLocal) {
		try
		{
			var f = new Date();
			$scope.fecha1 =new Date(f.getFullYear(), f.getMonth(), f.getDate());
			$scope.fecha2 =new Date(f.getFullYear(), f.getMonth(), f.getDate());
			
			
			$scope.pedido = {};
			$scope.resultado = {};
			$scope.resultado.ver = false;
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
				if($scope.usuarioLogeado.perfil == "empleado")
				{
				    $scope.modi = false;
					$scope.eli = false;
					$scope.bloq = false;
				}
				if($scope.usuarioLogeado.perfil == "encargado")
				{
				    $scope.modi = true;
					$scope.eli = true;
					$scope.bloq = true;
				}
				

				if($scope.usuarioLogeado.idUsuario == $scope.pedido.idUsuario)
				{
				    $scope.corresponde = true;
				}
				else
				{
				    $scope.corresponde = false;
				}					
			}
			else
			{
				$state.go("inicio");
			}
			
			FactoryLocal.BuscarTodos().then(
			function(respuesta) {     	
				$scope.ListadoLocales = respuesta;
			},function(error) {
				$scope.ListadoLocales= [];
		});

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
	 			FactoryPedido.Bloquear(pedido.idPedido);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORBIEN";
				$scope.resultado.mensaje = "Pedido cerrado exitosamente.";

		 		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORERROR";
				$scope.resultado.mensaje = "Error al cerrar un pedido.";
				$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
		 	}
	 	}
		
		$scope.Eliminar = function(pedido){
 		try
 		{
 			FactoryPedido.Eliminar(pedido.idPedido);
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
  });
;