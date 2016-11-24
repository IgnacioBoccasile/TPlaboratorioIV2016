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
	}

	$scope.Salir = function(){
		$auth.logout();
		$state.go("inicio");
	};
  });
