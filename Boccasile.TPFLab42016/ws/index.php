<?php
require 'vendor/autoload.php';

require 'clases/usuario.php';

require 'clases/producto.php'; 

require 'clases/oferta.php'; 

require 'clases/pedido.php';

require 'clases/local.php';

require 'clases/pedidoOferta.php';

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

$app->get('/usuario/{idUsuario}', function ($request, $response, $args) 
{
    $usuario=Usuario::Cargar($args['idUsuario']);
	
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

$app->delete('/usuario/{idUsuario}', function ($request, $response, $args)
 {
    Usuario::Bloquear($args['idUsuario']);
	
    return $response;
});

$app->delete('/usuarioEliminar/{idUsuario}', function ($request, $response, $args)
 {
    Usuario::Eliminar($args['idUsuario']);
	
    return $response;
});

$app->delete('/usuarioDesbloquear/{idUsuario}', function ($request, $response, $args)
 {
    Usuario::Desbloquear($args['idUsuario']);
	
    return $response;
});

$app->get('/productos[/]', function ($request, $response, $args) 
{
    $datos=Producto::Buscar();
	
	$response->write(json_encode($datos));
	
    return $response;
});

$app->post('/producto/{producto}', function ($request, $response, $args)
 {
    $producto=json_decode($args['producto']);
	
	$response->write(Producto::Guardar($producto));

    return $response;
});

$app->delete('/productoEliminar/{idProducto}', function ($request, $response, $args)
 {
    Producto::Eliminar($args['idProducto']);
	
    return $response;
});

$app->delete('/productoDesbloquear/{idProducto}', function ($request, $response, $args)
 {
    Producto::Desbloquear($args['idProducto']);
	
    return $response;
});

$app->delete('/producto/{idProducto}', function ($request, $response, $args) 
{
    Producto::Bloquear($args['idProducto']);
	
    return $response;
});

$app->put('/producto/{producto}', function ($request, $response, $args) 
{
    Producto::Editar(json_decode($args['producto']));
	
    return $response;
});



$app->get('/ofertas[/]', function ($request, $response, $args) 
{
    $datos=Oferta::Buscar();
	
	$response->write(json_encode($datos));
	
    return $response;
});

$app->post('/oferta/{oferta}', function ($request, $response, $args)
 {
    $oferta=json_decode($args['oferta']);
	
	$response->write(Oferta::Guardar($oferta));

    return $response;
});

$app->delete('/ofertaEliminar/{idOferta}', function ($request, $response, $args)
 {
    Oferta::Eliminar($args['idOferta']);
	
    return $response;
});

$app->delete('/ofertaDesbloquear/{idOferta}', function ($request, $response, $args)
 {
    Oferta::Desbloquear($args['idOferta']);
	
    return $response;
});

$app->delete('/oferta/{idOferta}', function ($request, $response, $args) 
{
    Oferta::Bloquear($args['idOferta']);
	
    return $response;
});

$app->put('/oferta/{oferta}', function ($request, $response, $args) 
{
    Oferta::Editar(json_decode($args['oferta']));
	
    return $response;
});

$app->get('/pedidos[/]', function ($request, $response, $args) 
{
    $datos=Pedido::Buscar();
    
    $response->write(json_encode($datos));
    
    return $response;
});

$app->post('/pedido/{pedido}', function ($request, $response, $args)
 {
    $pedido=json_decode($args['pedido']);
    
    $response->write(Pedido::Guardar($pedido));

    return $response;
});

$app->delete('/pedidoEliminar/{idPedido}', function ($request, $response, $args)
 {
    Pedido::Eliminar($args['idPedido']);
    
    return $response;
});

$app->delete('/pedidoDesbloquear/{idPedido}', function ($request, $response, $args)
 {
    Pedido::Desbloquear($args['idPedido']);
    
    return $response;
});

$app->delete('/pedido/{idPedido}', function ($request, $response, $args) 
{
    Pedido::Bloquear($args['idPedido']);
    
    return $response;
});

$app->put('/pedido/{pedido}', function ($request, $response, $args) 
{
    Pedido::Editar(json_decode($args['pedido']));
    
    return $response;
});

$app->get('/pedidosOfertas[/]', function ($request, $response, $args) 
{
    $datos=PedidoOferta::Buscar();
    
    $response->write(json_encode($datos));
    
    return $response;
});

$app->post('/pedidoOferta/{pedidoOferta}', function ($request, $response, $args)
 {
    $pedidoOferta=json_decode($args['pedidoOferta']);
    
    $response->write(PedidoOferta::Guardar($pedidoOferta));

    return $response;
});

$app->delete('/pedidoOfertaEliminar/{idPedidoOferta}', function ($request, $response, $args)
 {
    PedidoOferta::Eliminar($args['idPedidoOferta']);
    
    return $response;
});

$app->delete('/pedidoOfertaDesbloquear/{idPedidoOferta}', function ($request, $response, $args)
 {
    PedidoOferta::Desbloquear($args['idPedidoOferta']);
    
    return $response;
});

$app->delete('/pedidoOferta/{idPedidoOferta}', function ($request, $response, $args) 
{
    PedidoOferta::Bloquear($args['idPedidoOferta']);
    
    return $response;
});

$app->put('/pedidoOferta/{pedidoOferta}', function ($request, $response, $args) 
{
    PedidoOferta::Editar(json_decode($args['pedidoOferta']));
    
    return $response;
});

$app->get('/locales[/]', function ($request, $response, $args) 
{
    $datos=Local::Buscar();
    
    $response->write(json_encode($datos));
    
    return $response;
});

$app->post('/local/{local}', function ($request, $response, $args)
 {
    $local=json_decode($args['local']);
    
    $response->write(Local::Guardar($local));

    return $response;
});

$app->delete('/localEliminar/{idLocal}', function ($request, $response, $args)
 {
    Local::Eliminar($args['idLocal']);
    
    return $response;
});

$app->put('/local/{local}', function ($request, $response, $args) 
{
    Local::Editar(json_decode($args['local']));
    
    return $response;
});

$app->run();