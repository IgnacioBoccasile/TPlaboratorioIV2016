<?php
require_once"AccesoDatos.php";

class Oferta
{
	public $idOferta;
	
	public $descripcion;
	
 	public $precio;
	
  	public $disponible;
	
  	public $fechaInicio;
	
	public $fechaFin;
	
	public $idLocal;

	public static function Cargar($idOferta) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM oferta WHERE idOferta =:idOferta");
		
		$consulta->bindValue(':idOferta', $idOferta, PDO::PARAM_INT);
		
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
	
	public static function Bloquear($idOferta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE oferta SET disponible=0 WHERE idOferta=:idOferta");
		
		$consulta->bindValue(':idOferta',$idOferta, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();	
	}
	
	public static function Desbloquear($idOferta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE oferta SET disponible=1 WHERE idOferta=:idOferta");
		
		$consulta->bindValue(':idOferta',$idOferta, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Eliminar($idOferta)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM oferta WHERE idOferta=:idOferta");	
		
		$consulta->bindValue(':idOferta',$idOferta, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($oferta)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE oferta SET descripcion=:descripcion, precio=:precio, idLocal=:idLocal WHERE idOferta=:idOferta");
			
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta->bindValue(':idOferta',$oferta->idOferta, PDO::PARAM_INT);
			
			$consulta->bindValue(':descripcion',$oferta->descripcion, PDO::PARAM_STR);
			
			$consulta->bindValue(':precio',$oferta->precio, PDO::PARAM_STR);
			
			$consulta->bindValue(':idLocal',$oferta->idLocal, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

	public static function Guardar($oferta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO oferta (descripcion,precio,disponible,fechaInicio,fechaFin,idLocal) VALUES (:descripcion,:precio,1,:fechaInicio,:fechaFin, :idLocal)");
		
		$consulta->bindValue(':descripcion',$oferta->descripcion, PDO::PARAM_STR);
		
		$consulta->bindValue(':precio',$oferta->precio, PDO::PARAM_STR);
		
		$consulta->bindValue(':fechaInicio', $oferta->fechaInicio, PDO::PARAM_STR);
		
		$consulta->bindValue(':fechaFin', $oferta->fechaFin, PDO::PARAM_STR);
		
		$consulta->bindValue(':idLocal', $oferta->idLocal, PDO::PARAM_STR);
		
		$consulta->execute();	
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	
}