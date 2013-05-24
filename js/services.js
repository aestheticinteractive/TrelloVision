
var TrelloVisionApp = angular.module('TrelloVision', []).config(['$routeProvider', buildRoutes]);

var TrelloVisionModules = [
	{ name: "Overview", uri: "/overview" },
	{ name: "CSV Export", uri: "/csv" },
	{ name: "Table", uri: "/table" }
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
		.otherwise({
			redirectTo: '/'
		});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('TrelloDataService', function() {
	var model = { data: null, ready: false, display: "none" };
	var svc = {};

	svc.loadData = function(scope, dataSets) {
		trelloAuth(function() {
			Trello.get('/members/me', dataSets, function(data) {
				model.data = data;
				model.ready = true;
				model.display = "inherit";
				scope.$apply();
			});
		});
	};

	svc.model = function () {
		return model;
	};

	return svc;
});
