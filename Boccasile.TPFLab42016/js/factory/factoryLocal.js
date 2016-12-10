angular
  .module('TPFBOCCASILE')
  .factory('FactoryLocal', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Local";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Cargar = Cargar;
	objeto.Eliminar = Eliminar;
	objeto.Editar = Editar;

    function BuscarPor(entidad, parametro){
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(){
      return Servicio.BuscarTodos('locales');
    }

    function Cargar(parametro){
      return Servicio.Cargar('local', parametro);
    }
	
	function Editar(parametro){
      return Servicio.Editar('local', JSON.stringify(parametro));
    }    

	function Eliminar(parametro){
      return Servicio.Eliminar('localEliminar', parametro);
    } 	

    function Guardar(parametro){
      return Servicio.Guardar('local', JSON.stringify(parametro));
    }

    return objeto;
  })