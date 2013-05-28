
var TrelloVisionApp = angular
	.module('TrelloVision', [])
	.config(['$routeProvider', buildRoutes]);

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
		.when('/cardtable/board', {
			templateUrl: 'views/cardtable.html', 
			controller: CardTableCtrl
		})
		.when('/cardtable/test', {
			templateUrl: 'views/cardtable-board.html', 
			controller: CardTableTestCtrl
		})
		.when('/cardtable/board/:boardId/csv', {
			templateUrl: 'views/cardtable-csv.html', 
			controller: CardTableCsvCtrl
		})
		.when('/cardtable/board/:boardId', {
			templateUrl: 'views/cardtable-board.html', 
			controller: CardTableCtrl
		})
		.otherwise({
			redirectTo: '/'
		});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('TrelloDataService', function() {
	var svc = {};
	
	var model = {
		ready: false,
		data: null,
		error: null
	};
	
	svc.loadData = function(scope, apiCommand, dataSets, onDataSuccess) {
		var onGetSuccess = function(data) {
			model.data = data;
			model.ready = true;
			if ( onDataSuccess ) { onDataSuccess(scope); }
			scope.$apply();
		};
		
		var onGetError = function() {
			model.error = "Trello data access failed.";
			scope.$apply();
		};
		
		var onAuthSuccess = function() {
			Trello.get(apiCommand, dataSets, onGetSuccess, onGetError);
		};
		
		var onAuthError = function() {
			model.error = "Trello authorization failed.";
			scope.$apply();
		};
		
		trelloAuth(onAuthSuccess, onAuthError);
	};

	/*svc.loadMultiData = function(scope, apiRequests, onDataSuccess) {
		if ( !Trello.authorized() ) {
			return;
		}
		
		model.count = apiRequests.length;

		for ( i in apiRequests ) {
			var cmd = apiRequests[i].apiCommand;
			var ds = apiRequests[i].dataSets;
			var prop = apiRequests[i].propertyName;

			var makeOnSuccess = function(prop) {
				return function(data) {
					model[prop] = data;

					if ( --model.count == 0 ) {
						model.ready = true;
						onDataSuccess(scope);
						scope.$apply();
					}
				};
			};

			Trello.get(cmd, ds, makeOnSuccess(prop));
		}
	};*/

	svc.model = function () {
		return model;
	};

	return svc;
});
