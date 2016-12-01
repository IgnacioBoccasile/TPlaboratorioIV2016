<?php
require_once"AccesoDatos.php";

class Oferta
{
	public $id;
	
	public $descripcion;
	
 	public $precio;
	
  	public $disponible;
	
  	public $fechaInicio;
	
	public $fechaFin;

	public static function Cargar($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM oferta WHERE id =:id");
		
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		$ofertaBuscada= $consulta->fetchObject('oferta');
		
		return $ofertaBuscada;					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM oferta");
		
		$consulta->execute();	
		
		$arrOferta= $consulta->fetchAll(PDO::FETCH_CLASS, "oferta");
		
		return $arrOferta;
	}
	
	public static function Bloquear($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE oferta SET disponible=0 WHERE id=:id");
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();	
	}
	
	public static function Desbloquear($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE oferta SET disponible=1 WHERE id=:id");
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Eliminar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM oferta WHERE id=:id");	
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($oferta)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE oferta SET descripcion=:descripcion, precio=:precio, fechaInicio=:fechaInicio, fechaFin=:fechaFin WHERE id=:id");
			
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta->bindValue(':id',$oferta->id, PDO::PARAM_INT);
			
			$consulta->bindValue(':descripcion',$oferta->descripcion, PDO::PARAM_STR);
			
			$consulta->bindValue(':precio',$oferta->precio, PDO::PARAM_STR);
			
			$consulta->bindValue(':fechaInicio',$oferta->fechaInicio, PDO::PARAM_STR);
			
			$consulta->bindValue(':fechaFin',$oferta->fechaFin, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

	public static function Guardar($oferta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO oferta (descripcion,precio,vigente,fechaInicio,fechaFin) VALUES (:descripcion,:precio,1,:fechaInicio,:fechaFin)");
		
		$consulta->bindValue(':descripcion',$oferta->descripcion, PDO::PARAM_STR);
		
		$consulta->bindValue(':precio',$oferta->precio, PDO::PARAM_STR);
		
		$consulta->bindValue(':fechaInicio', $oferta->fechaInicio, PDO::PARAM_STR);
		
		$consulta->bindValue(':fechaFin', $oferta->fechaFin, PDO::PARAM_STR);
		
		$consulta->execute();	
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	
}