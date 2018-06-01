var sampleApp= angular.module('mapsApp', []);
sampleApp.controller('MapCtrl',function($scope, $http){
   $scope.markerLat= 3.333087;
    $scope.markerLng= -76.524260;
    $scope.infoTitle= 'Ingresa Nombre De La Sede';
    var cali= new google.maps.LatLng($scope.markerLat,$scope.markerLng);
    var mapOptions={
        zoom: 15,
        center: cali,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        //mapTypeId: google.maps.MapTypeId.HYBRID
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    var infoWindow = new google.maps.InfoWindow();
    $scope.addMarker= function(lat, lng, title){
        var latLang= new google.maps.LatLng(lat, lng)
        var marker= new google.maps.Marker({
            map: $scope.map,
            position: latLang,
            title: title
        });
        marker.content='<div class="infoWindwContent">'+marker.title+'</div>';
        google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h2>'+marker.title+'</h2>'+marker.content);   
        infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
        $scope.map.setCenter(latLang);
    };
    $scope.openInfoWindow= function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click')  
    }
////////////////////////////////////////////////////////////////////////////////////////

});