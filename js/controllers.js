


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function LayoutCtrl($scope, $location) {
	for ( i in TrelloVisionModules ) {
		var mod = TrelloVisionModules[i];
		mod.selected = (mod.uri == $location.path() ? 'selected' : '');
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
	buildModel($scope, TrelloDataService, 'members/me', { organizations: 'all', boards: 'open' });
}

/*----------------------------------------------------------------------------------------------------*/
function CardTableCtrl($scope, $routeParams, TrelloDataService) {
	if ( $routeParams.boardId ) {
		buildModel($scope, TrelloDataService, 'boards/'+$routeParams.boardId, { 
			lists: 'open',
			cards: 'visible',
			card_checklists: 'all'
		});
	}
	else if ( $routeParams.listId ) {
		var reqs = [
			{
				propertyName: 'list',
				apiCommand: 'lists/'+$routeParams.listId,
				dataSets: { cards: 'none' }
			},
			{
				propertyName: 'cards',
				apiCommand: 'lists/'+$routeParams.listId+'/cards',
				dataSets: { cards: 'open', card_checklists: 'all' }
			}
		];

		TrelloDataService.loadMultiData($scope, reqs);
		$scope.model = TrelloDataService.model();
	}
	else {
		$scope.model = { mode: 'none' };
	}

	////

	$scope.model.getDateFmt = function(dateString, format) {
		if ( dateString == null ) {
			return '';
		}

		return moment(dateString).format(format);
	};

	$scope.model.getList = function(idList) {
		var lists = $scope.model.data.lists;

		for ( i in lists ) {
			if ( lists[i].id == idList ) {
				return lists[i];
			}
		}

		return null;
	};

	$scope.model.getChecklistString = function(checklist) {
		var comp = 0;

		for ( i in checklist.checkItems ) {
			if ( checklist.checkItems[i].state == 'complete' ) {
				++comp;
			}
		}

		return comp+'/'+checklist.checkItems.length;
	};
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function buildModel($scope, TrelloDataService, apiCommand, dataSets) {
	TrelloDataService.loadData($scope, apiCommand, dataSets);
	$scope.model = TrelloDataService.model();
}