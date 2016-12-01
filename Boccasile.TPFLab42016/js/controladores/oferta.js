angular
  .module('TPFBOCCASILE')
  .controller("OfertaAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FactoryOferta, FactoryRutas) {
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
		
		$scope.oferta={};
	}
 	catch(error)
 	{
 		console.info(error);
 		$scope.resultado.estilo = "COLORERROR";
		$scope.resultado.mensaje = "Error en el controlador oferta.";
		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
 	}
	$scope.Guardar = function(){
		try
		{
			FactoryOferta.Guardar($scope.oferta).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "COLORBIEN";
					$scope.resultado.mensaje = "Oferta guardada exitosamente.";
					$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORERROR";
					$scope.resultado.mensaje = "Error al guardar la oferta.";
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
  
  .controller("OfertaModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FileUploader, FactoryOferta) {

	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.laoferta = jwtHelper.decodeToken($auth.getToken());
			$scope.oferta = JSON.parse($stateParams.oferta);
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
			FactoryOferta.Editar($scope.oferta);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Oferta editada exitosamente.";
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
  .controller("OfertasCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryOferta) {
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
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORERROR";
		    $scope.resultado.mensaje = "Error en el controlador oferta.";
			$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 	}
		$scope.Modificar = function(oferta){
 		var param = JSON.stringify(oferta);
    	$state.go('oferta.oferta', {oferta:param});
 	}

	 	$scope.Bloquear = function(oferta){
	 		try
	 		{
	 			FactoryOferta.Bloquear(oferta.id);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORBIEN";
				$scope.resultado.mensaje = "Oferta deshabilitada exitosamente.";

		 		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "COLORERROR";
				$scope.resultado.mensaje = "Error al deshabilitar una oferta.";
				$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
		 	}
	 	}
		
		$scope.Eliminar = function(oferta){
 		try
 		{
 			FactoryOferta.Eliminar(oferta.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Oferta eliminada exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al eliminar una oferta.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
		
		$scope.Desbloquear = function(oferta){
		try
 		{
 			FactoryOferta.Desbloquear(oferta.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Oferta habilitada exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al habilitar una oferta";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
	}
  });
;