

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('PowerCardService', function() {
	var svc = {};

	svc.loadCardData = function(TrelloDataService, scope, cardId) {
		var params = {
			actions_entities: 'true',
			attachments: 'true',
			members: 'true',
			checklists: 'all',
			board: 'true',
			list: 'true'
		};
		
		TrelloDataService.loadData(scope, 'cards/'+cardId, params);
		
		scope.model = TrelloDataService.model();
		scope.model.ready = false;
	};
	
	return svc;
});
