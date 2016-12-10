<?php
require_once"AccesoDatos.php";

class Pedido
{
	public $id;
	
	public $descripcion;
	
 	public $precio;
	
  	public $unidades;
	
  	public $enviado;
	
	public $fechaPedido;

	public static function Cargar($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedido WHERE id =:id");
		
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		$pedidoBuscado= $consulta->fetchObject('pedido');
		
		return $pedidoBuscado;					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedido");
		
		$consulta->execute();	
		
		$arrPedido= $consulta->fetchAll(PDO::FETCH_CLASS, "pedido");
		
		return $arrPedido;
	}
	
	public static function Bloquear($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido SET enviado=0 WHERE id=:id");
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();	
	}
	
	public static function Desbloquear($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido SET enviado=1 WHERE id=:id");
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Eliminar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM pedido WHERE id=:id");	
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($pedido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido SET descripcion=:descripcion, precio=:precio, unidades=:unidades WHERE id=:id");
			
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta->bindValue(':id',$pedido->id, PDO::PARAM_INT);
			
			$consulta->bindValue(':descripcion',$pedido->descripcion, PDO::PARAM_STR);
			
			$consulta->bindValue(':precio',$pedido->precio, PDO::PARAM_STR);
			
			$consulta->bindValue(':unidades',$pedido->unidades, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

	public static function Guardar($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO pedido (descripcion,precio,unidades,enviado,fechaPedido) VALUES (:descripcion,:precio,:unidades,1,:fechaPedido)");
		
		$consulta->bindValue(':descripcion',$pedido->descripcion, PDO::PARAM_STR);
		
		$consulta->bindValue(':precio',$pedido->precio, PDO::PARAM_STR);
		
		$consulta->bindValue(':unidades', $pedido->unidades, PDO::PARAM_STR);
		
		$consulta->bindValue(':fechaPedido', $pedido->fechaPedido, PDO::PARAM_STR);
		
		$consulta->execute();	
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	
}