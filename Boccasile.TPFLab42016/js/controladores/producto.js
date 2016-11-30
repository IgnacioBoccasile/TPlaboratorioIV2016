angular
  .module('TPFBOCCASILE')
  .controller("ProductoAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FactoryProducto, FactoryRutas) {
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
		
		$scope.producto={};
	    $scope.producto.nombre = "";
	    $scope.producto.descripcion = "";
	    $scope.producto.precio = "";
	}
 	catch(error)
 	{
 		console.info(error);
 		$scope.resultado.estilo = "COLORERROR";
		$scope.resultado.mensaje = "Error en el controlador producto.";
		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
 	}
	$scope.Guardar = function(){
		try
		{
			FactoryProducto.Guardar($scope.producto).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "COLORBIEN";
					$scope.resultado.mensaje = "Producto guardado exitosamente";
					$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORERROR";
					$scope.resultado.mensaje = "Error al guardar el producto";
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
  
  .controller("ProductoModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FileUploader, FactoryProducto) {

	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.elproducto = jwtHelper.decodeToken($auth.getToken());
			$scope.producto = JSON.parse($stateParams.producto);
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
			FactoryProducto.Editar($scope.producto);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Producto editado exitosamente";
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
  .controller("ProductosCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryProducto) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());	
			}
			else
			{
				$state.go("inicio");
			}

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
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORERROR";
		    $scope.resultado.mensaje = "Error en el controlador productos.";
			$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 	}
		$scope.Modificar = function(producto){
 		var param = JSON.stringify(producto);
    	$state.go('producto.producto', {producto:param});
 	}

	 	$scope.Bloquear = function(producto){
	 		try
	 		{
	 			FactoryProducto.Bloquear(producto.id);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORBIEN";
				$scope.resultado.mensaje = "Producto inhabilitado exitosamente";

		 		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORERROR";
				$scope.resultado.mensaje = "Error al inhabilitar un producto";
				$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
		 	}
	 	}
		
		$scope.Eliminar = function(producto){
 		try
 		{
 			FactoryProducto.Eliminar(producto.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Producto eliminado exitosamente";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al eliminar un producto";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
		
		$scope.Desbloquear = function(producto){
		try
 		{
 			FactoryProducto.Desbloquear(producto.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Producto habilitado exitosamente";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al habilitar un producto";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
	}
  });

;// cierra modulo
