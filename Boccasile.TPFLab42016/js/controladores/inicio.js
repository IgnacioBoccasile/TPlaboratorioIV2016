angular
  .module('TPFBOCCASILE')
  .controller('InicioCtrl', function($scope, $state, $auth) {
  	if ($auth.isAuthenticated())
		$state.go("menu");
  });
