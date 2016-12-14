angular
  .module('TPFBOCCASILE')
  .controller('GraficoOfertasCtrl',function($scope,$http,$auth,$state,FactoryPedidoOferta){
        $scope.mostrar = true;
		$scope.contador1 = 0;
        $scope.contador2 = 0;
        $scope.contador3 = 0;
        $scope.ListadoPedidosOfertas = [];

        FactoryPedidoOferta.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoPedidosOfertas = respuesta;
		    	},function(error) {
	     			$scope.ListadoPedidosOfertas= [];
		 	});	
			
		$scope.VentasPorLocal = function(ListadoPedidosOfertas)
		{
        $scope.mostrar = false;

        for(var i=0;i<$scope.ListadoPedidosOfertas.length;i++)
        {
          if($scope.ListadoPedidosOfertas[i].idLocal == "1" && $scope.ListadoPedidosOfertas[i].enviado =="0")
          {
            $scope.contador1++;
          }
          if($scope.ListadoPedidosOfertas[i].idLocal == "2" && $scope.ListadoPedidosOfertas[i].enviado =="0")
          {
            $scope.contador2++;
          }
          if($scope.ListadoPedidosOfertas[i].idLocal == "3" && $scope.ListadoPedidosOfertas[i].enviado =="0")
          {
            $scope.contador3++;
          }
        }


  var barChartData = {
    labels : ["Lanus Oeste","Lomas de Zamora","Avellaneda"],
    datasets : [
      {
        fillColor : "red",
        strokeColor : "black",
        highlightFill: "black",
        highlightStroke: "red",
        data : [$scope.contador1,$scope.contador2,$scope.contador3]
      }
    ]
   
  }
var ctx3 = document.getElementById("chart-area").getContext("2d");
   window.myPie = new Chart(ctx3).Bar(barChartData, {responsive:true});
 }
 
})