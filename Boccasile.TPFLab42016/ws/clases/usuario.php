<?php
require_once"AccesoDatos.php";

class Usuario
{
	public $id;
	
 	public $correo;
	
  	public $clave;
	
  	public $nombre;
	
  	public $perfil;
	
  	public $activo;

	public static function Cargar($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE id =:id");
		
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		
		$consulta->execute();
		
		$usuarioBuscado= $consulta->fetchObject('usuario');
		
		return $usuarioBuscado;	
	}

	public static function Verificar($correo, $clave, $nombre) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE correo =:correo AND clave =:clave AND nombre =:nombre AND agregado = 1");
		
		$consulta->bindValue(':correo', $correo, PDO::PARAM_STR);
		
		$consulta->bindValue(':clave', $clave, PDO::PARAM_STR);
		
		$consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
		
		$consulta->execute();
		
		$usuarioBuscado= $consulta->fetchObject('usuario');
		
		return $usuarioBuscado;	
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE agregado = 1");
		
		$consulta->execute();
		
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		
		return $arrUsuarios;
	}

	public static function BuscarPorPerfil($perfil)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE perfil=:perfil AND agregado = 1");
		
		$consulta->bindValue(':perfil',$perfil, PDO::PARAM_STR);
		
		$consulta->execute();
		
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		
		return $arrUsuarios;
	}

	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuario SET agregado=0 WHERE id=:id");	
		
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		
		$consulta->execute();
		
		return $consulta->rowCount();
	}
	
	public static function Editar($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuario SET nombre=:nombre, correo=:correo, agregado=:agregado WHERE id=:id");
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
		
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		
		$consulta->bindValue(':correo',$usuario->correo, PDO::PARAM_STR);
		
		$consulta->bindValue(':agregado',$usuario->agregado, PDO::PARAM_INT);
		
		return $consulta->execute();
	}

	public static function Guardar($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuario (nombre,correo,clave,perfil,agregado) VALUES (:nombre,:correo,:clave,:perfil,1)");
		
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		
		$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
		
		$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
		
		$consulta->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
		
		$consulta->execute();
		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	
}