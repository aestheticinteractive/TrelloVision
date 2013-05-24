


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function LayoutCtrl($scope, $location) {
	for ( i in TrelloVisionModules ) {
		var mod = TrelloVisionModules[i];
		mod.selected = (mod.uri == $location.path() ? "selected" : "");
	}

	$scope.model = {
		modules: TrelloVisionModules
	};
}

/*----------------------------------------------------------------------------------------------------*/
function HomeCtrl($scope) {
}

/*----------------------------------------------------------------------------------------------------*/
function OverviewCtrl($scope, TrelloDataService) {
	buildModel($scope, TrelloDataService, { organizations: "all", boards: "open" });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function buildModel($scope, TrelloDataService, dataSets) {
	TrelloDataService.loadData($scope, dataSets);
	$scope.model = TrelloDataService.model();
}