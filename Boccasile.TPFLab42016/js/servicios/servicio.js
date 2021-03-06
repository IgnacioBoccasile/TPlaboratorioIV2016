angular
  .module('TPFBOCCASILE')
  .service('Servicio', function ($http, FactoryRutas) {
    this.Nombre = "Servicio";
    this.BuscarTodos = BuscarTodos;
    this.BuscarPor = BuscarPor;
    this.Cargar = Cargar;
    this.Guardar = Guardar;
    this.Editar = Editar;
    this.Bloquear = Bloquear;
	this.Eliminar = Eliminar;
	this.Desbloquear = Desbloquear;
    
    var url = FactoryRutas.UrlWebService;

    function TraerUrl(metodo, parametro){
      if (!parametro)
        return url + "/" + metodo;
      else
        return url + "/" + metodo + "/" + parametro;
    }

    function BuscarTodos(entidad){
      return $http.get(TraerUrl(entidad)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
      );
    }

    function BuscarPor(entidad, parametro){
      return $http.get(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
      );
    }

    function Cargar(entidad, parametro){
      return $http.get(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
      );
    }

    function Bloquear(entidad, parametro){
      return $http.delete(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
      );
    }
	
	function Desbloquear(entidad, parametro){
      return $http.delete(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
      );
    }
	
	function Eliminar(entidad, parametro){
      return $http.delete(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
      );
    }

    function Guardar(entidad, parametro){
      return $http.post(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta;
        },
        function (error){
          return error;
        }
      );
    }

    function Editar(entidad, parametro){
      return $http.put(TraerUrl(entidad, parametro)).then(
        function (respuesta){
          return respuesta.data;
        },
        function (error){
          return error;
        }
      );
    }

  })