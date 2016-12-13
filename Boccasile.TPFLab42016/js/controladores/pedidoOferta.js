angular
  .module('TPFBOCCASILE')
  .controller("PedidoOfertaAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FactoryPedidoOferta, FactoryRutas, FactoryOferta, FactoryLocal) {
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
		
		$scope.ListadoOfertas=[];
		
		$scope.pedidoOferta={};
		
		$scope.pedidoOferta.fechaPedidoOferta =new Date(f.getFullYear(), f.getMonth(), f.getDate());

		FactoryLocal.BuscarTodos().then(
			function(respuesta) {     	
				$scope.ListadoLocales = respuesta;
			},function(error) {
				$scope.ListadoLocales= [];
		});
		
		FactoryOferta.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoOfertas = respuesta;
		    	},function(error) {
	     			$scope.ListadoOfertas= [];
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
		$scope.pedidoOferta.idUsuario = $scope.usuario.idUsuario;
	}
	
	for(var i=0;i<$scope.ListadoOfertas.length;i++)
   	{
		if($scope.ListadoOfertas[i].descripcion == $scope.pedidoOferta.descripcion)
		{
			$scope.pedidoOferta.idOferta = $scope.ListadoOfertas[i].idOferta;
			$scope.pedidoOferta.precio = $scope.ListadoOfertas[i].precio * $scope.pedidoOferta.unidades;
		}
    	
    }
	
	//$scope.pedido.enviado = "0";
		try
		{
			FactoryPedidoOferta.Guardar($scope.pedidoOferta).then(
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
  
  .controller("PedidoOfertaModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FactoryPedidoOferta, FactoryOferta) {

	try
	{
		$scope.pedidoOferta = {};
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.elpedidoOferta = jwtHelper.decodeToken($auth.getToken());
			$scope.pedidoOferta = JSON.parse($stateParams.pedidoOferta);
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
	FactoryOferta.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoOfertas = respuesta;
		    	},function(error) {
	     			$scope.ListadoOfertas= [];
		 	});	
	
	$scope.Guardar = function(){
		for(var i=0;i<$scope.ListadoOfertas.length;i++)
   		{
   			if($scope.ListadoOfertas[i].descripcion == $scope.pedidoOferta.descripcion)
   			{
   				$scope.pedidoOferta.idOferta = $scope.ListadoOfertas[i].idOferta;
   				$scope.pedidoOferta.precio = $scope.ListadoOfertas[i].precio * $scope.pedidoOferta.unidades;
   			}
    	
    	}
		
		
		try
		{
			FactoryPedidoOferta.Editar($scope.pedidoOferta);
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
  .controller("PedidosOfertasCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryPedidoOferta, FactoryOferta, FactoryLocal) {
		try
		{
			var f = new Date();
			$scope.fecha1 =new Date(f.getFullYear(), f.getMonth(), f.getDate());
			$scope.fecha2 =new Date(f.getFullYear(), f.getMonth(), f.getDate());
			
			
			$scope.pedidoOferta = {};
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
					$scope.des = false;
				}
				if($scope.usuarioLogeado.perfil == "encargado")
				{
				    $scope.modi = true;
					$scope.eli = true;
					$scope.bloq = true;
					$scope.des = true;
				}
				

				if($scope.usuarioLogeado.idUsuario == $scope.pedidoOferta.idUsuario)
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

		 	FactoryPedidoOferta.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoPedidosOfertas = respuesta;
		    	},function(error) {
	     			$scope.ListadoPedidosOfertas= [];
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
		$scope.Modificar = function(pedidoOferta){
 		var param = JSON.stringify(pedidoOferta);
    	$state.go('pedidoOferta.pedidoOferta', {pedidoOferta:param});
 	}

	 	$scope.Bloquear = function(pedidoOferta){
	 		try
	 		{
	 			FactoryPedidoOferta.Bloquear(pedidoOferta.idPedidoOferta);
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
		
		$scope.Eliminar = function(pedidoOferta){
 		try
 		{
 			FactoryPedidoOferta.Eliminar(pedidoOferta.idPedidoOferta);
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
		
		$scope.Desbloquear = function(pedidoOferta){
		try
 		{
 			FactoryPedidoOferta.Desbloquear(pedidoOferta.idPedidoOferta);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Ahora el pedido se encuentra pendiente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al volver pendiente el pedido.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
	}
  });
;