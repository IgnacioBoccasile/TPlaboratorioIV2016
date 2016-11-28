angular
  .module('SPBOCCASILE')
  .controller('MenuCtrl', function($scope, $state, $auth, jwtHelper) {
  	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;

		if ($scope.usuarioLogeado.perfil == "admin")
			$scope.admin = true;
		else
			$scope.admin = false;
		
		if ($scope.usuarioLogeado.perfil == "encargado")
			$scope.encargado = true;
		else
			$scope.encargado = false;
		
		if ($scope.usuarioLogeado.perfil == "empleado")
			$scope.empleado = true;
		else
			$scope.empleado = false;
		
		if ($scope.usuarioLogeado.perfil == "cliente")
			$scope.cliente = true;
		else
			$scope.cliente = false;
	}

	$scope.Salir = function(){
		$auth.logout();
		$state.go("inicio");
	};
  });
