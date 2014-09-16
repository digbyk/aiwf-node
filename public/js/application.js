var aiwfApp = angular.module('AiwfApp', []);

aiwfApp.controller('GiftController', function ($scope, $http) {
	$http.get('/api/lists').success(function (data) {
		$scope.lists = data;
	});
	$http.get('/api/gifts').success(function (data) {
		$scope.gifts = data;
	});
});
