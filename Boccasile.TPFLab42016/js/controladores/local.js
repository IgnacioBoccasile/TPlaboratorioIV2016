angular
  .module('TPFBOCCASILE')
  .controller("LocalAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FactoryLocal, FactoryRutas) {
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
		
		$scope.local={};
	}
 	catch(error)
 	{
 		console.info(error);
 		$scope.resultado.estilo = "COLORERROR";
		$scope.resultado.mensaje = "Error en el controlador local.";
		$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
 	}
	$scope.Guardar = function(){
		try
		{
			FactoryLocal.Guardar($scope.local).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "COLORBIEN";
					$scope.resultado.mensaje = "Local guardado exitosamente.";
					$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORERROR";
					$scope.resultado.mensaje = "Error al guardar el local.";
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
  
  .controller("LocalModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FactoryLocal) {

	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.ellocal = jwtHelper.decodeToken($auth.getToken());
			$scope.local = JSON.parse($stateParams.local);
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
			FactoryLocal.Editar($scope.local);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Local editado exitosamente.";
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
  .controller("LocalesCtrl", function($scope, $http, $state, $auth, NgMap, $timeout, jwtHelper, FactoryLocal, FactoryOferta) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			$scope.LocalVer = 0;
			$scope.VerOfertas = 0;
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
				if($scope.usuarioLogeado.perfil == "cliente")
				{
				    $scope.mod = false;
					$scope.elm = false;
				}
				if($scope.usuarioLogeado.perfil == "encargado")
				{
					$scope.mod = true;
					$scope.elm = false;
				}
				if($scope.usuarioLogeado.perfil == "admin")
				{
					$scope.mod = false;
					$scope.elm = true;
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

	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORERROR";
		    $scope.resultado.mensaje = "Error en el controlador local.";
			$timeout(function(){
		 			$state.go('inicio');
		 		}, 2000);
	 	}
		$scope.Modificar = function(local){
 		var param = JSON.stringify(local);
    	$state.go('local.local', {local:param});
 	}
	
	$scope.Mapa = function(latitud,longitud,id)
	    {
	    $scope.LocalVer = 1;
	    $scope.latitud = latitud;
   		$scope.longitud = longitud;
   		$scope.LocalId = id;

	    }
	    $scope.Ocultar = function()
	    {
	    $scope.LocalVer = 0;
	    }
		
		$scope.OcultarOfertas = function()
	    {
	     $scope.VerOfertas = 0;
	    }
	    $scope.Ofertas = function(id)
	    {
	    $scope.VerOfertas = 1;
	    $scope.IDLOCAL = id;
		
		FactoryOferta.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoOfertas = respuesta;
		    	},function(error) {
	     			$scope.ListadoOfertas= [];
		 	});
	    }
		
	$scope.Eliminar = function(local){
		try
		{
			FactoryLocal.Eliminar(local.idLocal);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Local eliminado exitosamente.";
			$timeout(function(){
				$state.go('inicio');
			}, 2000);
		}
		catch(error)
		{
			console.info(error);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al eliminar un local.";
			$timeout(function(){
				$state.go('inicio');
			}, 2000);
		}
 	}
});
;