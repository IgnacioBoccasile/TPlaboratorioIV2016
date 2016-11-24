<?php
require 'vendor/autoload.php';

require 'clases/usuario.php';

$app = new Slim\App();

$app->get('/', function ($request, $response, $args) 
{
    $response->write("Esta no es la carpeta del proyecto :(");
	
    return $response;
});

$app->get('/usuarios[/]', function ($request, $response, $args) 
{
    $listado=Usuario::Buscar();
	
    $response->write(json_encode($listado));
    
    return $response;
});

$app->get('/usuariosPorPerfil/{perfil}', function ($request, $response, $args)
 {
    $listado=Usuario::BuscarPorPerfil($args['perfil']);
	
    $response->write(json_encode($listado));
    
    return $response;
});

$app->get('/usuario/{id}', function ($request, $response, $args) 
{
    $usuario=Usuario::Cargar($args['id']);
	
    $response->write(json_encode($usuario));
	
    return $response;
});

$app->post('/usuario/{usuario}', function ($request, $response, $args)
 {
    $usuario=json_decode($args['usuario']);
	
    $usuario->foto=explode(';',$usuario->foto);
	
    $arrayFoto = array();
	
    if(count($usuario->foto) > 0)
	{
        for ($i = 0; $i < count($usuario->foto); $i++ )
		{
            $rutaVieja="fotos/".$usuario->foto[$i];
			
            $rutaNueva=$usuario->correo. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
			
            copy($rutaVieja, "fotos/".$rutaNueva);
			
            unlink($rutaVieja);
			
            $arrayFoto[]=$rutaNueva;
        } 
		
        $usuario->foto=json_encode($arrayFoto); 
    }
 
    return $response->write(Usuario::Guardar($usuario));
});

$app->put('/usuario/{usuario}', function ($request, $response, $args) 
{
    Usuario::Editar(json_decode($args['usuario']));
	
    return $response;
});

$app->delete('/usuario/{id}', function ($request, $response, $args)
 {
    Usuario::Borrar($args['id']);
	
    return $response;
});

$app->run();