
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
		.when('/cardtable/list', {
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
	var model = { data: null, ready: false, error: null };
	var svc = {};

	svc.loadData = function(scope, apiCommand, dataSets, onDataSuccess) {
		if ( !Trello.authorized() ) {
			model.error = 'Trello not authorized.';
			return;
		}
		
		Trello.get(apiCommand, dataSets, function(data) {
			model.data = data;
			model.ready = true;
			if ( onDataSuccess ) { onDataSuccess(scope); }
			scope.$apply();
		});
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
