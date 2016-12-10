angular
  .module('TPFBOCCASILE')
  .directive('miTitulo', function() {
    return {
      scope:{
        titulo: '@titulo'
      },
      replace: true,
      restrict: "EA", 
      templateUrl: "vistas/directivas/titulo.html"
    };
  })
  ;//cierra modulo