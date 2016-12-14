<?php
require_once"AccesoDatos.php";

class PedidoOferta
{
	public $idPedidoOferta;
	
	public $descripcion;
	
 	public $precio;
	
  	public $unidades;
	
  	public $enviado;
	
	public $fechaPedidoOferta;
	
	public $idUsuario;
	
	public $idOferta;
	
	public $idLocal;

	public static function Cargar($idPedidoOferta) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedidoOferta WHERE idPedidoOferta =:idPedidoOferta");
		
		$consulta->bindValue(':idPedidoOferta', $idPedidoOferta, PDO::PARAM_INT);
		
		$consulta->execute();
		
		$pedidoOfertaBuscado= $consulta->fetchObject('pedidoOferta');
		
		return $pedidoOfertaBuscado;					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedidoOferta");
		
		$consulta->execute();	
		
		$arrPedidoOferta= $consulta->fetchAll(PDO::FETCH_CLASS, "pedidoOferta");
		
		return $arrPedidoOferta;
	}
	
	public static function Bloquear($idPedidoOferta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedidoOferta SET enviado=0 WHERE idPedidoOferta=:idPedidoOferta");
		
		$consulta->bindValue(':idPedidoOferta',$idPedidoOferta, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();	
	}
	
	public static function Eliminar($idPedidoOferta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM pedidoOferta WHERE idPedidoOferta=:idPedidoOferta");	
		
		$consulta->bindValue(':idPedidoOferta',$idPedidoOferta, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($pedidoOferta)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pedidoOferta SET descripcion=:descripcion, unidades=:unidades, precio=:precio WHERE idPedidoOferta=:idPedidoOferta");
			
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta->bindValue(':idPedidoOferta',$pedidoOferta->idPedidoOferta, PDO::PARAM_INT);
			
			$consulta->bindValue(':descripcion',$pedidoOferta->descripcion, PDO::PARAM_STR);
			
			$consulta->bindValue(':unidades',$pedidoOferta->unidades, PDO::PARAM_STR);
			
			$consulta->bindValue(':precio',$pedidoOferta->precio, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

	public static function Guardar($pedidoOferta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO pedidoOferta (descripcion,precio,unidades,enviado,fechaPedidoOferta,idUsuario,idOferta,idLocal) VALUES (:descripcion,:precio,:unidades,1,:fechaPedidoOferta,:idUsuario,:idOferta,:idLocal)");
		
		$consulta->bindValue(':descripcion',$pedidoOferta->descripcion, PDO::PARAM_STR);
		
		$consulta->bindValue(':precio',$pedidoOferta->precio, PDO::PARAM_STR);
		
		$consulta->bindValue(':unidades', $pedidoOferta->unidades, PDO::PARAM_STR);
		
		$consulta->bindValue(':fechaPedidoOferta', $pedidoOferta->fechaPedidoOferta, PDO::PARAM_STR);
		
		$consulta->bindValue(':idUsuario',$pedidoOferta->idUsuario, PDO::PARAM_STR);
			
		$consulta->bindValue(':idOferta',$pedidoOferta->idOferta, PDO::PARAM_STR);
			
		$consulta->bindValue(':idLocal',$pedidoOferta->idLocal, PDO::PARAM_STR);
		
		$consulta->execute();	
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	
}