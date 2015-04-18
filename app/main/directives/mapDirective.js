"use strict";

angular.module('main').directive('androidMap', function($ionicLoading, $compile) {
    return {
        restrict: 'A',
        scope: {
            location: '='
        },
        link: function ($scope, element) {

            var site = new google.maps.LatLng(19.432688, -99.153342);

            var mapOptions = {
                streetViewControl: false,
                center: site,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: false,
                mapTypeControl: false
            };

            var map = new google.maps.Map(element[0], mapOptions),
            markers = [],
            directionsService = new google.maps.DirectionsService(),
            directionsDisplay = new google.maps.DirectionsRenderer();

            var initialize = function () {
                $scope.map = map;
            };

            var setCenter = function (center) {
                $scope.map.setCenter(center);
            };

            var deleteMarker = function (marker) {
                marker.setMap(null);
            };

            $scope.makeMarker = function (latLng, id) {
                
                if (markers[id]) {
                    deleteMarker(markers[id]);
                }

                markers[id] = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: id
                });

                drawRoute();
            };

            var drawRoute = function () {
                if (markers['markerA'] && markers['markerB']) {
                    directions(markers['markerA'].position, markers['markerB'].position);
                }
            }

            var directions = function (origin, destination) {
                directionsDisplay.setMap(null);

                var request = {
                    origin : origin,
                    destination : destination,
                    travelMode : google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setOptions({
                            suppressMarkers: true
                        })
                    }
                });

                directionsDisplay.setMap(map);
            };

            $scope.$watchCollection('location', function (val) {
                console.log(val)
                if (val === undefined) return false;
                var center = new google.maps.LatLng(val.position.lat(), val.position.lng());
                setCenter(center);
                $scope.makeMarker(center, val.id);
            });

            initialize();
        }
    }
});