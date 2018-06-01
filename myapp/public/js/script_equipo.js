var aplicacion = angular.module('aplicacion', []);
	aplicacion.controller('Equipos', function($scope, $http) {
	
		$scope.cargarEquipos = function(){
			$http({
				method: 'GET', url: '/listar_equipo'
			}).
			success(function(data) {
				if(typeof(data) == 'object'){
					$scope.equipos = data;
				}else{
					alert('Error al intentar recuperar los equipos de computos.');
				}
			}).
			error(function() {
				alert('Error al intentar recuperar los equipos de computos.');
			});
		};

		
		$scope.recuperarEquipos = function(indice) {
			$http({
				method: 'GET',
				url: '/recuperar_equipo',
				params: {
					_id: indice
				}
			}).
			success(function(data) {
				if(typeof(data) == 'object'){
					$scope._id = data._id;
					$scope.sede = data.sede;
					$scope.nombre_sala = data.nombre_sala;
					$scope.equipo_computo = data.equipo_computo;
					$scope.direccion_mac = data.direccion_mac;
					$scope.serial = data.serial;
					$scope.marca = data.marca;
					$scope.codigo_inventario = data.codigo_inventario;
					$scope.descripcion = data.descripcion;
				}else{
					alert('Error al intentar recuperar los equipos de computos.');
				}            
			}).
			error(function() {
				alert('Error al intentar recuperar los equipos de computos.');
			});
		};
			$scope.eliminarEquipos = function(indice) {
				$http({
					method: 'POST',
					url: '/eliminar_equipo',
					params: {
						_id: indice
					}
				}).
				success(function(data) {
					if(data == 'Ok'){
						//$scope.limpiarDatos();
						$scope.cargarEquipos();
					}else{
						alert('Error al intentar eliminar los equipos de computos.');
					}            
				}).
				error(function() {
					alert('Error al intentar eliminar los equipos de computos.');
				})
			}
			
			$scope.modificarEquipos = function() {
				$http({
					method: 'POST',
					url: '/modificar_equipo',
					params: {
						equipo_computo: $scope.equipo_computo,
						sede: $scope.sede,
						nombre_sala: $scope.nombre_sala,
						equipo_computo: $scope.equipo_computo,
						direccion_mac: $scope.direccion_mac,
						serial: $scope.serial,
						marca: $scope.marca,
						codigo_inventario: $scope.codigo_inventario,
						descripcion: $scope.descripcion,
						_id: $scope._id
					}
				}).
				success(function(data) {
					if(typeof(data) == 'object'){
						$scope.limpiarDatos();
						$scope.cargarEquipos();    
					}else{
						alert('Error al intentar guardar los equipos de computos.');
					}
				}).
				error(function() {
					alert('Error al intentar guardar los equipos de computos.');
				});
			} 
			$scope.limpiarDatos = function() {
				$scope._id = null;
				$scope.sede = '';
				$scope.nombre_sala = '';
				$scope.direccion_mac = '';
				$scope.serial = '';
				$scope.marca = '';
				$scope.codigo_inventario = '';
				$scope.descripcion = '';
				$scope.equipo_computo='';
			};
});
