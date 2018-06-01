var aplicacion = angular.module('aplicacion', []);
	aplicacion.controller('novedad', function($scope, $http) {
	
		$scope.cargarNovedad = function(){
			$http({
				method: 'GET', url: '/listar'
			}).
			success(function(data) {
				if(typeof(data) == 'object'){
					$scope.novedades = data;
				}else{
					alert('Error al intentar recuperar las novedades.');
				}
			}).
			error(function() {
				alert('Error al intentar recuperar las novedades.');
			});
		};

		
		$scope.recuperarNovedad = function(indice) {
			$http({
				method: 'GET',
				url: '/recuperar',
				params: {
					_id: indice
				}
			}).
			success(function(data) {
				if(typeof(data) == 'object'){
					$scope._id = data._id;
					$scope.nombre = data.nombre;
					$scope.sede = data.sede;
					$scope.latitud = data.latitud;
					$scope.longitud = data.longitud;
					$scope.fecha_hora = data.fecha_hora;
					$scope.tipo_novedad = data.tipo_novedad;
				}else{
					alert('Error al intentar recuperar la Novedad.');
				}            
			}).
			error(function() {
				alert('Error al intentar recuperar la Novedad.');
			});
		};
			$scope.eliminarNovedad = function(indice) {
				$http({
					method: 'POST',
					url: '/eliminar',
					params: {
						_id: indice
					}
				}).
				success(function(data) {
					if(data == 'Ok'){
						//$scope.limpiarDatos();
						$scope.cargarNovedad();
					}else{
						alert('Error al intentar eliminar la Novedad.');
					}            
				}).
				error(function() {
					alert('Error al intentar eliminar la Novedad.');
				})
			}
			
			$scope.modificar = function() {
				$http({
					method: 'POST',
					url: '/modificar',
					params: {
						nombre: $scope.nombre,
						sede: $scope.sede,
						latitud: $scope.latitud,
						longitud: $scope.longitud,
						fecha_hora: $scope.fecha_hora,
						tipo_novedad: $scope.tipo_novedad,
						_id: $scope._id
					}
				}).
				success(function(data) {
					if(typeof(data) == 'object'){
						$scope.limpiarDatos();
						$scope.cargarNovedad();    
					}else{
						alert('Error al intentar guardar la Novedad.');
					}
				}).
				error(function() {
					alert('Error al intentar guardar la Novedad.');
				});
			} 
			$scope.limpiarDatos = function() {
				$scope._id = null;
				$scope.nombre = '';
				$scope.sede = '';
				$scope.latitud = '';
				$scope.longitud = '';
				$scope.fecha_hora = '';
				$scope.tipo_novedad = '';
				
			};	
});
