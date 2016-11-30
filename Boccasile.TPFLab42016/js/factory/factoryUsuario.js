angular
  .module('TPFBOCCASILE')
  .factory('FactoryUsuario', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Usuario";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Cargar = Cargar;
    objeto.Bloquear = Bloquear;
	objeto.Eliminar = Eliminar;
	objeto.Desbloquear = Desbloquear;
    objeto.Editar = Editar;    

    function BuscarPor(entidad, parametro){
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(){
      return Servicio.BuscarTodos("usuarios");
    }

    function Cargar(parametro){
      return Servicio.Cargar("usuario", parametro);
    }

    function Editar(parametro){
      return Servicio.Editar('usuario', JSON.stringify(parametro));
    }    

    function Bloquear(parametro){
      return Servicio.Bloquear('usuario', parametro);
    } 
	
	function Eliminar(parametro){
      return Servicio.Eliminar('usuarioEliminar', parametro);
    } 
	
	function Desbloquear(parametro){
      return Servicio.Desbloquear('usuarioDesbloquear', parametro);
    } 

    function Guardar(parametro){
      return Servicio.Guardar("usuario", JSON.stringify(parametro));
    }

    return objeto;
  })//Cierra Factory Usuario
