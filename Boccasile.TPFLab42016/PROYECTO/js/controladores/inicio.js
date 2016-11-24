angular
  .module('SPBOCCASILE')
  .controller('InicioCtrl', function($scope, $state, $auth) {
  	if ($auth.isAuthenticated())
		$state.go("menu");
  });
