

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function LayoutCtrl($scope, $location) {
	for ( i in TrelloVisionModules ) {
		var mod = TrelloVisionModules[i];
		mod.selected = (mod.uri == $location.path() ? 'selected' : '');
	}
	
	$scope.model = { modules: TrelloVisionModules };
}

/*----------------------------------------------------------------------------------------------------*/
function HomeCtrl($scope) {
}

/*----------------------------------------------------------------------------------------------------*/
function OverviewCtrl($scope, TrelloDataService) {
	TrelloDataService.loadData($scope, 'members/me', { organizations: 'all', boards: 'open' });
	$scope.model = TrelloDataService.model();
}

/*----------------------------------------------------------------------------------------------------*/
function CardTableCtrl($scope, $routeParams, CardTableService, TrelloDataService) {
	CardTableService.loadBoardData(TrelloDataService, $scope, $routeParams.boardId);
	$scope.model = TrelloDataService.model();
}

/*----------------------------------------------------------------------------------------------------*/
function CardTableCsvCtrl($scope, $routeParams, CardTableCsvService, 
																CardTableService, TrelloDataService) {
	CardTableCsvService.loadBoardData(
		TrelloDataService, CardTableService, $scope, $routeParams.boardId);
	$scope.model = TrelloDataService.model();
}

/*----------------------------------------------------------------------------------------------------*/
function CardTableTestCtrl($scope, $http, CardTableService, TrelloDataService) {
	$scope.model = { ready: true };
	
	$http.get('data/trelloDev.json').success(function(data) {
		$scope.model.data = data;
		buildCardTable($scope);
	});
}
