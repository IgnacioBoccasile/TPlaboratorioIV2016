angular
.module('TPFBOCCASILE')
.controller('LoginCtrl', function($scope, $state, $auth, jwtHelper) {
	$scope.usuario = {};
	$scope.resultado = {};
	$scope.resultado.ver = false;
	$scope.Verificar = function(){
	try{
		$auth.login($scope.usuario)
			.then(function(response){
				if ($auth.isAuthenticated())
				{		
					$state.go("menu");			
				}
				
				else
				{
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORERROR";
					$scope.resultado.mensaje = "Los datos no coinciden o probablemente usted haya sido bloqueado.";
				}
					
				}).catch(function(response){
					console.info("Error", response);
				});
				
				
		}
		catch(error)
		{
			console.info(error);
		}
		
}

	$scope.Acceso = function(nombre, correo, clave, agregado, copiadeclave){
		$scope.usuario.nombre = nombre;
		$scope.usuario.correo = correo;
		$scope.usuario.clave = clave;
		$scope.usuario.agregado = agregado;
		$scope.usuario.copiadeclave = copiadeclave
		if($scope.usuario.nombre == "Cliente")
		{
			$scope.mibandera=true;
		}
		
		else
		{
			$scope.mibandera=false;
		}
	}
})

.controller("RegistroCtrl", function($scope, $auth, $state, $timeout, jwtHelper, FactoryUsuario, FactoryRutas) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.usuario={};
	    $scope.usuario.nombre = "";
	    $scope.usuario.correo = "";
	    $scope.usuario.clave = "";
	    $scope.usuario.perfil = "encargado";

		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		}

	}
	catch(error)
	{
		console.info(error);
	}
	$scope.Guardar = function(){
		try
		{
			FactoryUsuario.Guardar($scope.usuario).then(
				function(respuesta) { 
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "COLORBIEN";
					$scope.resultado.mensaje = "Usuario guardado exitosamente.";
					$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORERROR";
					$scope.resultado.mensaje = "Error al guardar el usuario.";
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

.controller("RegistroECCtrl", function($scope, $auth, $timeout, $state, jwtHelper, FactoryUsuario, FactoryRutas) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.usuario={};
	    $scope.usuario.nombre = "";
	    $scope.usuario.correo = "";
	    $scope.usuario.clave = "";
	    $scope.usuario.perfil = "cliente";

		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		}

	}
	catch(error)
	{
		console.info(error);
	}
	$scope.Guardar = function(){
		try
		{
			FactoryUsuario.Guardar($scope.usuario).then(
				function(respuesta) { 
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "COLORBIEN";
					$scope.resultado.mensaje = "Usuario guardado exitosamente.";
					$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORMAL";
					$scope.resultado.mensaje = "Error al guardar el usuario.";
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

.controller("RegistroEECCtrl", function($scope, $auth, $state, $timeout, jwtHelper, FactoryUsuario, FactoryRutas) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.usuario={};
	    $scope.usuario.nombre = "";
	    $scope.usuario.correo = "";
	    $scope.usuario.clave = "";
	    $scope.usuario.perfil = "empleado";

		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		}

	}
	catch(error)
	{
		console.info(error);
	}
	$scope.Guardar = function(){
		try
		{
			FactoryUsuario.Guardar($scope.usuario).then(
				function(respuesta) { 
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "COLORBIEN";
					$scope.resultado.mensaje = "Usuario guardado exitosamente.";
					$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "COLORMAL";
					$scope.resultado.mensaje = "Error al guardar el usuario.";
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

.controller("UsuarioModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FileUploader, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario = JSON.parse($stateParams.usuario);
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
			FactoryUsuario.Editar($scope.usuario);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Usuario editado exitosamente.";
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

.controller("UsuariosCtrl", function($scope, $state, $auth, $timeout, jwtHelper, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = true;
		$scope.buscarPerfil = "todos";
		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		    $scope.editar = false;
		}
		else
		{
			$state.go("inicio");
		}

	 	FactoryUsuario.BuscarTodos().then(
	 		function(respuesta) {     	
	  			$scope.ListadoUsuarios = respuesta;
	    	},function(error) {
	 			$scope.ListadoUsuarios= [];
	 	});
	}
	catch(error)
	{
		console.info(error);
	}
 	$scope.Modificar = function(usuario){
 		var param = JSON.stringify(usuario);
    	$state.go('login.usuario', {usuario:param});
 	}

 	$scope.Bloquear = function(usuario){
 		try
 		{
 			FactoryUsuario.Bloquear(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Usuario bloqueado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al bloquear un usuario.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
	
	$scope.Eliminar = function(usuario){
 		try
 		{
 			FactoryUsuario.Eliminar(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Usuario eliminado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al eliminar un usuario.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
	
	$scope.Desbloquear = function(usuario){
		try
 		{
 			FactoryUsuario.Desbloquear(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Usuario desbloqueado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al desbloquear un usuario.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
	}
 	$scope.Buscar = function(){
 		try
 		{
 			if ($scope.buscarPerfil == "todos")
 			{
				$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarTodos().then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
 			}
 			else
 			{
	 			$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarPor("usuariosPorPerfil", $scope.buscarPerfil).then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
	 		}
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al bucar por perfil.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
})
.controller("ClientesCtrl", function($scope, $state, $auth, $timeout, jwtHelper, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = true;
		$scope.buscarPerfil = "cliente";
		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		    $scope.editar = false;
		}
		else
		{
			$state.go("inicio");
		}

	 	$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarPor("usuariosPorPerfil", $scope.buscarPerfil).then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
	}
	catch(error)
	{
		console.info(error);
	}
})
.controller("EmpleadosCtrl", function($scope, $state, $auth, $timeout, jwtHelper, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = true;
		$scope.buscarPerfil = "empleado";
		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		    $scope.editar = false;
		}
		else
		{
			$state.go("inicio");
		}

	 	$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarPor("usuariosPorPerfil", $scope.buscarPerfil).then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
	}
	catch(error)
	{
		console.info(error);
	}
	$scope.Modificar = function(usuario){
 		var param = JSON.stringify(usuario);
    	$state.go('login.usuario', {usuario:param});
 	}

 	$scope.Bloquear = function(usuario){
 		try
 		{
 			FactoryUsuario.Bloquear(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Empleado bloqueado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al bloquear un empleado.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
	
	$scope.Eliminar = function(usuario){
 		try
 		{
 			FactoryUsuario.Eliminar(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Empleado eliminado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al eliminar un empleado.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
 	}
	
	$scope.Desbloquear = function(usuario){
		try
 		{
 			FactoryUsuario.Desbloquear(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORBIEN";
			$scope.resultado.mensaje = "Empleado desbloqueado exitosamente.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "COLORMAL";
			$scope.resultado.mensaje = "Error al desbloquear un empleado.";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
	 	}
	}
});
;