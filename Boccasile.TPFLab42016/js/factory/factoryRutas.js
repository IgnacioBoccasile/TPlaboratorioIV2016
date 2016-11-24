angular
  .module('SPBOCCASILE')
  .factory('FactoryRutas', function () {
    var objeto = {};
    objeto.Nombre = "Factory Rutas";
    objeto.UrlWebService = "http://localhost/Boccasile.TPFLab42016/ws";
    objeto.UrlArchivos = "http://localhost/Boccasile.TPFLab42016/ws/archivos";

    return objeto;
  })//Cierra Fatory Rutas
