angular
  .module('TPFBOCCASILE')
  .factory('FactoryProducto', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Producto";
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
      return Servicio.BuscarTodos('productos');
    }

    function Cargar(parametro){
      return Servicio.Cargar('producto', parametro);
    }
	
	function Editar(parametro){
      return Servicio.Editar('producto', JSON.stringify(parametro));
    }    

    function Bloquear(parametro){
      return Servicio.Bloquear('producto', parametro);
    }  

	function Eliminar(parametro){
      return Servicio.Eliminar('productoEliminar', parametro);
    } 	
	
	function Desbloquear(parametro){
      return Servicio.Desbloquear('productoDesbloquear', parametro);
    } 

    function Guardar(parametro){
      return Servicio.Guardar('producto', JSON.stringify(parametro));
    }

    return objeto;
  })//Cierra Factory Producto
