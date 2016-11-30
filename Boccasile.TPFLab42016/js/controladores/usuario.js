angular
.module('TPFBOCCASILE')
.controller('LoginCtrl', function($scope, $state, $auth, jwtHelper) {
	$scope.usuario = {};
	$scope.resultado = {};
	$scope.resultado.ver = false;
	$scope.Verificar = function(){
		
		try
		{
			$auth.login($scope.usuario)
				.then(function(response){
					if ($auth.isAuthenticated())
					{
						if($scope.usuario.clave != "bloqueado")
						{
							$state.go("menu");
						}
						
						else
						{
							$scope.resultado.ver = true;
							$scope.resultado.estilo = "alert alert-danger";
							$scope.resultado.mensaje = "Usuario no existente o bloqueado";
							console.log($scope.usuario);
						}							
					}
					
					else
					{
						$scope.resultado.ver = true;
						$scope.resultado.estilo = "alert alert-danger";
						$scope.resultado.mensaje = "Usuario no existente o bloqueado";
						console.log($scope.usuario);
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

	$scope.Acceso = function(nombre, correo, clave, agregado, bloqueado){
		$scope.usuario.nombre = nombre;
		$scope.usuario.correo = correo;
		$scope.usuario.clave = clave;
		$scope.usuario.agregado = agregado;
		$scope.usuario.bloqueado = bloqueado;
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

.controller("RegistroCtrl", function($scope, $auth, $state, jwtHelper, FactoryUsuario, FactoryRutas) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.usuario={};
	    $scope.usuario.nombre = "";
	    $scope.usuario.correo = "";
	    $scope.usuario.clave = "";
	    $scope.usuario.perfil = "admin";

		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			$scope.logeado = true;
			$scope.admin = true;
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
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Usuario guardado exitosamente";
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el usuario";
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
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Usuario guardado exitosamente";
					$timeout(function(){
	 			$state.go('inicio');
	 		}, 2000);
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el usuario";
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 	}
	};
})

.controller("RegistroEECCtrl", function($scope, $auth, $state, jwtHelper, FactoryUsuario, FactoryRutas) {
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
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Usuario guardado exitosamente";
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el usuario";
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
			$scope.logeado = true;
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
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario editado exitosamente";
			$timeout(function(){
	 			$state.go('inicio');
	 		}, 1000);
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
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario bloqueado exitosamente";
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al bloquear un usuario";
	 	}
 	}
	
	$scope.Eliminar = function(usuario){
 		try
 		{
 			FactoryUsuario.Eliminar(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario eliminado exitosamente";
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al eliminar un usuario";
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
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al bucar por perfil";
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
});

;//Cierre modulo

