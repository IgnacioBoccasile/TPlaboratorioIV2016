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
  
  .controller("LocalModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FileUploader, FactoryLocal) {

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
  .controller("LocalesCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryLocal) {
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