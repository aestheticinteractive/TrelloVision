
var TrelloVisionApp = angular.module('TrelloVision', []).config(['$routeProvider', buildRoutes]);

var TrelloVisionModules = [
	{ name: 'Overview', uri: '/overview' },
	{ name: 'Card Table', uri: '/cardtable' }
];


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function buildRoutes($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html', 
			controller: HomeCtrl
		})
		.when('/overview', {
			templateUrl: 'views/overview.html', 
			controller: OverviewCtrl
		})
		.when('/cardtable', {
			templateUrl: 'views/cardtable.html', 
			controller: CardTableCtrl
		})
		.when('/cardtable/board/:boardId', {
			templateUrl: 'views/cardtable-board.html', 
			controller: CardTableCtrl
		})
		.when('/cardtable/list/:listId', {
			templateUrl: 'views/cardtable-list.html', 
			controller: CardTableCtrl
		})
		.otherwise({
			redirectTo: '/'
		});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('TrelloDataService', function() {
	var model = { data: null, ready: false };
	var svc = {};

	svc.loadData = function(scope, apiCommand, dataSets) {
		trelloAuth(function() {
			Trello.get(apiCommand, dataSets, function(data) {
				model.data = data;
				model.ready = true;
				scope.$apply();
			});
		});
	};

	svc.model = function () {
		return model;
	};

	return svc;
});
