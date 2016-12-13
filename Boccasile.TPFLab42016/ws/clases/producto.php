<?php
require_once"AccesoDatos.php";

class Producto
{
	public $idProducto;
	
	public $nombre;
	
 	public $descripcion;
	
  	public $precio;
	
  	public $vigente;

	public static function Cargar($idProducto) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM producto WHERE idProducto =:idProducto");
		
		$consulta->bindValue(':idProducto', $idProducto, PDO::PARAM_INT);
		
		$consulta->execute();
		
		$producoBuscado= $consulta->fetchObject('producto');
		
		return $productoBuscado;					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM producto");
		
		$consulta->execute();	
		
		$arrProducto= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");
		
		return $arrProducto;
	}
	
	public static function Bloquear($idProducto)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE producto SET vigente=0 WHERE idProducto=:idProducto");
		
		$consulta->bindValue(':idProducto',$idProducto, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();	
	}
	
	public static function Desbloquear($idProducto)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE producto SET vigente=1 WHERE idProducto=:idProducto");
		
		$consulta->bindValue(':idProducto',$idProducto, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Eliminar($idProducto)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM producto WHERE idProducto=:idProducto");	
		
		$consulta->bindValue(':idProducto',$idProducto, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE producto SET nombre=:nombre, descripcion=:descripcion, precio=:precio WHERE idProducto=:idProducto");
			
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta->bindValue(':idProducto',$producto->idProducto, PDO::PARAM_INT);
			
			$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
			
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			
			$consulta->bindValue(':precio',$producto->precio, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

	public static function Guardar($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO producto (nombre,descripcion,precio,vigente) VALUES (:nombre,:descripcion,:precio,1)");
		
		$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
		
		$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
		
		$consulta->bindValue(':precio',$producto->precio, PDO::PARAM_STR);
		
		$consulta->execute();	
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	
}