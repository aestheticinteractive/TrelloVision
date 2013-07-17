

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('PowerCardService', function() {
	var svc = {};

	svc.loadCardData = function(TrelloDataService, scope, cardId) {
		var apiReqs = [
			{
				apiCommand: 'cards/'+cardId,
				dataSets: {
					actions_entities: 'true',
					attachments: 'true',
					members: 'true',
					checklists: 'all',
					board: 'true',
					list: 'true'
				},
				propertyName: 'data'
			},
			{
				apiCommand: 'cards/'+cardId+'/actions',
				dataSets: {
					entities: 'true',
					filters: 'commentCard'
				},
				propertyName: 'actions'
			}
		];

		var onLoadData = function() {
			var text = scope.model.data.desc;
			var tags = [];
			var match;

			while ( (match = HashTagPattern.exec(text)) ) {
				tags.push(match[3]);
			}

			scope.model.hashtags = tags;
			scope.model.listFilter = cleanFilterText(scope.model.data.list.name);
		};

		TrelloDataService.loadMultiData(scope, apiReqs, onLoadData);

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
		};
		scope.getChecklistProg = function(cl, type) {
			var count = cl.checkItems.length;
			var comp = 0;

			for ( var ci in cl.checkItems ) {
				var item = cl.checkItems[ci];
				
				if ( item.state == "complete" ) {
					++comp;
				}
			}

			if ( type == 0 ) {
				return comp+'/'+count;
			}

			return Math.round(comp/count*100);
		};
		scope.descToHtml = function(desc, tagClass) {
			var m = scope.model;

			if ( desc == null || m == null || m.data == null || typeof(m.data.board) === 'undefined' ) {
				return null;
			}

			return descToHtml(desc, scope.model.data.board.id, tagClass);
		};
		scope.getActionDate = function(d) {
			return (d == null ? null : moment(d).format('MMM D, YYYY - h:mm a'));
		};
	};

	return svc;
});