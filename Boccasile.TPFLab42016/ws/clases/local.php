<?php
require_once"AccesoDatos.php";

class Local
{
	public $idLocal;
	
	public $localidad;
	
 	public $calle;
	
  	public $numero;
	
  	public $latitud;
	
	public $longitud;

	public static function Cargar($idLocal) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM local WHERE idLocal =:idLocal");
		
		$consulta->bindValue(':idLocal', $id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		$localBuscado= $consulta->fetchObject('local');
		
		return $localBuscado;					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM local");
		
		$consulta->execute();	
		
		$arrLocal= $consulta->fetchAll(PDO::FETCH_CLASS, "local");
		
		return $arrLocal;
	}
	
	public static function Eliminar($idLocal)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM local WHERE idLocal=:idLocal");	
		
		$consulta->bindValue(':idLocal',$idLocal, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($local)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE local SET localidad=:localidad, calle=:calle, numero=:numero, latitud=:latitud, longitud=:longitud WHERE idLocal=:idLocal");
			
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			
			$consulta->bindValue(':idLocal',$local->idLocal, PDO::PARAM_INT);
			
			$consulta->bindValue(':localidad',$local->localidad, PDO::PARAM_STR);
			
			$consulta->bindValue(':calle',$local->calle, PDO::PARAM_STR);
			
			$consulta->bindValue(':numero',$local->numero, PDO::PARAM_STR);
			
			$consulta->bindValue(':latitud',$local->latitud, PDO::PARAM_STR);
			
			$consulta->bindValue(':longitud',$local->longitud, PDO::PARAM_STR);
			
			return $consulta->execute();
	}

	public static function Guardar($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO local (localidad,calle,numero,latitud,longitud) VALUES (:localidad,:calle,:numero,:latitud,:longitud)");
		
		$consulta->bindValue(':localidad',$local->localidad, PDO::PARAM_STR);
		
		$consulta->bindValue(':calle',$local->calle, PDO::PARAM_STR);
		
		$consulta->bindValue(':numero',$local->numero, PDO::PARAM_STR);
		
		$consulta->bindValue(':latitud',$local->latitud, PDO::PARAM_STR);
		
		$consulta->bindValue(':longitud',$local->longitud, PDO::PARAM_STR);
		
		$consulta->execute();	
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	
}