angular
  .module('TPFBOCCASILE')
  .factory('FactoryPedido', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Pedido";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Cargar = Cargar;
    objeto.Bloquear = Bloquear;
	objeto.Eliminar = Eliminar;
	objeto.Editar = Editar;

    function BuscarPor(entidad, parametro){
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(){
      return Servicio.BuscarTodos('pedidos');
    }

    function Cargar(parametro){
      return Servicio.Cargar('pedido', parametro);
    }
	
	function Editar(parametro){
      return Servicio.Editar('pedido', JSON.stringify(parametro));
    }    

    function Bloquear(parametro){
      return Servicio.Bloquear('pedido', parametro);
    }  

	function Eliminar(parametro){
      return Servicio.Eliminar('pedidoEliminar', parametro);
    } 	

    function Guardar(parametro){
      return Servicio.Guardar('pedido', JSON.stringify(parametro));
    }

    return objeto;
  })