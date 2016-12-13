<?php
require_once"AccesoDatos.php";

class Pedido
{
	public $idPedido;
	
	public $descripcion;
	
 	public $precio;
	
  	public $unidades;
	
  	public $enviado;
	
	public $fechaPedido;
	
	public $idUsuario;
	
	public $idProducto;
	
	public $idLocal;

	public static function Cargar($idPedido) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedido WHERE idPedido =:idPedido");
		
		$consulta->bindValue(':idPedido', $idPedido, PDO::PARAM_INT);
		
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
	
	public static function Bloquear($idPedido)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido SET enviado=0 WHERE idPedido=:idPedido");
		
		$consulta->bindValue(':idPedido',$idPedido, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();	
	}
	
	public static function Desbloquear($idPedido)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido SET enviado=1 WHERE idPedido=:idPedido");
		
		$consulta->bindValue(':idPedido',$idPedido, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Eliminar($idPedido)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM pedido WHERE idPedido=:idPedido");	
		
		$consulta->bindValue(':idPedido',$idPedido, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($pedido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedido SET descripcion=:descripcion, unidades=:unidades WHERE idPedido=:idPedido");
			
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta->bindValue(':idPedido',$pedido->idPedido, PDO::PARAM_INT);
			
			$consulta->bindValue(':descripcion',$pedido->descripcion, PDO::PARAM_STR);
			
			$consulta->bindValue(':unidades',$pedido->unidades, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

	public static function Guardar($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO pedido (descripcion,precio,unidades,enviado,fechaPedido,idUsuario,idProducto,idLocal) VALUES (:descripcion,:precio,:unidades,1,:fechaPedido,:idUsuario,:idProducto,:idLocal)");
		
		$consulta->bindValue(':descripcion',$pedido->descripcion, PDO::PARAM_STR);
		
		$consulta->bindValue(':precio',$pedido->precio, PDO::PARAM_STR);
		
		$consulta->bindValue(':unidades', $pedido->unidades, PDO::PARAM_STR);
		
		$consulta->bindValue(':fechaPedido', $pedido->fechaPedido, PDO::PARAM_STR);
		
		$consulta->bindValue(':idUsuario',$pedido->idUsuario, PDO::PARAM_STR);
			
		$consulta->bindValue(':idProducto',$pedido->idProducto, PDO::PARAM_STR);
			
		$consulta->bindValue(':idLocal',$pedido->idLocal, PDO::PARAM_STR);
		
		$consulta->execute();	
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	
}