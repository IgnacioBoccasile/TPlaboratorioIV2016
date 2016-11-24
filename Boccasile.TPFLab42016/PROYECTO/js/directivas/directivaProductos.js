angular
  .module('SPBOCCASILE')
  .directive('utnListaProductos', function() {

    return {
      scope:{
        producto: '=producto'
      },
      replace: true,
      restrict: "EA", 
      templateUrl: "templates/listaProductos.html"
    };

  })
  ;//cierra modulo