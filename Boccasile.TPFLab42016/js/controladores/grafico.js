angular
  .module('TPFBOCCASILE')
  .controller('GraficoCtrl',function($scope,$http,$auth,$state,FactoryLocal,FactoryPedido){
        $scope.mostrar = true;
		$scope.contador1 = 0;
        $scope.contador2 = 0;
        $scope.contador3 = 0;
        $scope.ListadoPedidos = [];

        FactoryPedido.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoPedidos = respuesta;
		    	},function(error) {
	     			$scope.ListadoPedidos= [];
		 	});	
			
		$scope.VentasPorLocal = function(ListadoPedidos)
		{
        $scope.mostrar = false;

        for(var i=0;i<$scope.ListadoPedidos.length;i++)
        {
          if($scope.ListadoPedidos[i].idLocal == "1" && $scope.ListadoPedidos[i].enviado =="0")
          {
            $scope.contador1++;
          }
          if($scope.ListadoPedidos[i].idLocal == "2" && $scope.ListadoPedidos[i].enviado =="0")
          {
            $scope.contador2++;
          }
          if($scope.ListadoPedidos[i].idLocal == "3" && $scope.ListadoPedidos[i].enviado =="0")
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