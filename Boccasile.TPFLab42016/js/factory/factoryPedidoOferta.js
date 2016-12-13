angular
  .module('TPFBOCCASILE')
  .factory('FactoryPedidoOferta', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory PedidoOferta";
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
      return Servicio.BuscarTodos('pedidosOfertas');
    }

    function Cargar(parametro){
      return Servicio.Cargar('pedidoOferta', parametro);
    }
	
	function Editar(parametro){
      return Servicio.Editar('pedidoOferta', JSON.stringify(parametro));
    }    

    function Bloquear(parametro){
      return Servicio.Bloquear('pedidoOferta', parametro);
    }  

	function Eliminar(parametro){
      return Servicio.Eliminar('pedidoOfertaEliminar', parametro);
    } 	
	
	function Desbloquear(parametro){
      return Servicio.Desbloquear('pedidoOfertaDesbloquear', parametro);
    } 

    function Guardar(parametro){
      return Servicio.Guardar('pedidoOferta', JSON.stringify(parametro));
    }

    return objeto;
  })