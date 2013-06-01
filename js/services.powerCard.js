

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

		scope.getDueShort = function(d) {
			return (d == null ? null : moment(d).format('MMM D [at] h:mm a'));
		};

		scope.getDueFull = function(d) {
			return (d == null ? null : moment(d).format('dddd, MMM D, YYYY [at] h:mma'));
		};
		
		scope.getLabelTextColor = function(c) {
			return (c == "yellow" ? "#555" : "#fff");
		}
		
		scope.getChecklistProg = function(cl, type) {
			var count = cl.checkItems.length;
			var comp = 0;
			
			for ( ci in cl.checkItems) {
				var item = cl.checkItems[ci];
				
				if ( item.state == "complete" ) {
					++comp;
				}
			}
			
			if ( type == 0 ) {
				return comp+'/'+count;
			}
			
			return Math.round(comp/count*100);
		}
	};
	
	return svc;
});
