

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function LayoutCtrl($scope, $location, $window) {
	for ( i in TrelloVisionModules ) {
		var mod = TrelloVisionModules[i];
		mod.selected = (mod.uri == $location.path() ? 'selected' : '');
	}

	$scope.model = {
		modules: TrelloVisionModules,
		version: TrelloVisionVersion,
		ready: true
	};

	$scope.$on('$viewContentLoaded', function(event) {
		$window.ga('send', 'pageview', $location.path()); //is $window necessary?
	});
}

/*----------------------------------------------------------------------------------------------------*/
function HomeCtrl() {}

/*----------------------------------------------------------------------------------------------------*/
function OverviewCtrl($scope, TrelloDataService) {
	TrelloDataService.loadData($scope, 'members/me', { organizations: 'all', boards: 'open' });
	$scope.model = TrelloDataService.model();
	$scope.model.ready = false;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function CardTableCtrl($scope, $routeParams, CardTableService, TrelloDataService) {
	if ( !$routeParams.boardId ) {
		$scope.model = { ready: true };
		return;
	}

	CardTableService.loadBoardData(TrelloDataService, $scope, $routeParams);
	$scope.model = TrelloDataService.model();
}

/*----------------------------------------------------------------------------------------------------*/
function CardTableCsvCtrl($scope, $routeParams, CardTableCsvService,
																CardTableService, TrelloDataService) {
	CardTableCsvService.loadBoardData(
		TrelloDataService, CardTableService, $scope, $routeParams);
	$scope.model = TrelloDataService.model();
}

/*----------------------------------------------------------------------------------------------------* /
function CardTableTestCtrl($scope, $http, CardTableService, TrelloDataService) {
	$scope.model = { ready: true };
	
	$http.get('data/trelloDev.json').success(function(data) {
		$scope.model.data = data;
		buildCardTable($scope);
	});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function PowerCardCtrl($scope, $routeParams, PowerCardService, TrelloDataService) {
	if ( !$routeParams.cardId ) {
		$scope.model = { ready: true };
		return;
	}

	PowerCardService.loadCardData(TrelloDataService, $scope, $routeParams.cardId);
	$scope.model = TrelloDataService.model();
}