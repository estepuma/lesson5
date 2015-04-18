'use strict';
angular.module('main')
.controller('StartCtrl', function ($scope, Start, Config) {
  console.log('Hello from your Controller: StartCtrl in module main:. This is your scope:', $scope);

  // bind data from service
  $scope.someData = Start.someData;
  $scope.env = Config.ENV;

  // TODO: do your controller thing
});

angular.module('main')
.controller('MapCtrl', function ($scope, Start, Config, $cordovaGeolocation) {
	var posOptions = {timeout: 10000, enableHighAccuracy: true};
	$cordovaGeolocation
	.getCurrentPosition(posOptions)
	.then(function (position) {
		$scope.location = {
			position: {
				lat: function () {
					return position.coords.latitude;
				},
				lng: function () {
					return position.coords.longitude;
				}
			},
			id: 'markerA'
		}
	}, function(err) {});
});
