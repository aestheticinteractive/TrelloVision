

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('CardTableService', function() {
	var svc = {};

	svc.loadBoardData = function(TrelloDataService, scope, boardId) {
		var params = { 
			lists: 'open',
			cards: 'visible',
			card_checklists: 'all',
			members: 'all',
			organization: 'true'
		};
		
		TrelloDataService.loadData(scope, 'boards/'+boardId, params, buildCardTable);
		scope.model = TrelloDataService.model();
	};
	
	return svc;
});

/*----------------------------------------------------------------------------------------------------*/
function buildCardTable($scope) {
	var board = $scope.model.data;
	
	var table = {
		board: board,
		org: board.organization,
		members: board.members,
		labelColors: ['green', 'yellow', 'orange', 'red', 'purple', 'blue'],
		labelMap: board.labelNames,
		listIds: [],
		listMap: {},
		cards: []
	};
	
	$scope.model.table = table;
	
	for ( li in board.lists ) {
		var list = board.lists[li];
		table.listIds.push(list.id);
		table.listMap[list.id] = list;
	}
	
	for ( ci in board.cards ) {
		var card = board.cards[ci];
		var c = {};
		table.cards.push(c);
		
		c.id = card.id;
		c.shortId = card.idShort;
		c.listId = card.idList;
		c.listName = table.listMap[card.idList].name;
		c.name = card.name;
		c.desc = card.desc;
		c.url = card.url;
		c.updated = moment(card.dateLastActivity).format('MMM D');
		c.due = (card.due == null ? null : moment(card.due).format('MMM D'));
		c.memberCount = card.idMembers.length;
		c.commentCount = card.badges.comments; 
		c.voteCount = card.badges.votes;
		c.checklists = [];
		
		for ( li in card.labels ) {
			var lbl = card.labels[li];
			c[lbl.color+'Label'] = lbl.name;
		}
		
		for ( li in card.checklists ) {
			var list = card.checklists[li];
			var comp = 0;
			
			for ( i in list.checkItems ) {
				if ( list.checkItems[i].state == 'complete' ) {
					++comp;
				}
			}

			c.checklists.push({
				name: list.name,
				progress: comp+'/'+list.checkItems.length
			});
		}
		
		for ( mi in card.idMembers ) {
			var memId = card.idMembers[mi];
			c['member'+memId] = true;
		}
	}
}