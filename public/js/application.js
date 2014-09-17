var aiwfApp = angular.module('AiwfApp', ['ngResource']);

aiwfApp.factory('ListService', ['$resource',
	function ($resource) {
		return $resource('/api/lists', {}, {
			query: {
				method: 'GET',
				params: {
					listId: 'lists'
				},
				isArray: true
			}
		});
}]);

aiwfApp.controller('GiftController', function ($scope, $http, ListService) {
	$scope.lists = ListService.query();
});
