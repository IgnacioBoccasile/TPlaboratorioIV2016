angular
  .module('TPFBOCCASILE')
  .factory('FactoryOferta', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Oferta";
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
      return Servicio.BuscarTodos('ofertas');
    }

    function Cargar(parametro){
      return Servicio.Cargar('oferta', parametro);
    }
	
	function Editar(parametro){
      return Servicio.Editar('oferta', JSON.stringify(parametro));
    }    

    function Bloquear(parametro){
      return Servicio.Bloquear('oferta', parametro);
    }  

	function Eliminar(parametro){
      return Servicio.Eliminar('ofertaEliminar', parametro);
    } 	
	
	function Desbloquear(parametro){
      return Servicio.Desbloquear('ofertaDesbloquear', parametro);
    } 

    function Guardar(parametro){
      return Servicio.Guardar('oferta', JSON.stringify(parametro));
    }

    return objeto;
  })