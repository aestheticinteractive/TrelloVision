

////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('CardTableService', function() {
	var svc = {};

	svc.loadBoardData = function(TrelloDataService, scope, boardId, afterBuildCardTable) {
		var params = { 
			lists: 'open',
			cards: 'visible',
			card_checklists: 'all',
			members: 'all',
			organization: 'true'
		};
		
		TrelloDataService.loadData(scope, 'boards/'+boardId, params, function(scope) {
			buildCardTable(scope);
			if ( afterBuildCardTable ) { afterBuildCardTable(scope); }
		});
		
		scope.model = TrelloDataService.model();
	};
	
	return svc;
});

/*----------------------------------------------------------------------------------------------------*/
TrelloVisionApp.factory('CardTableCsvService', function() {
	var svc = {};
	
	svc.loadBoardData = function(TrelloDataService, CardTableService, scope, boardId) {
		CardTableService.loadBoardData(TrelloDataService, scope, boardId, function(scope) {
			buildCardTableCsv(scope);
			
			scope.model.saveCsv = function() {
				var blob = new Blob([scope.model.csv], {type: "text/plain;charset=utf-8"});
				saveAs(blob, 'trello.board.'+scope.model.table.board.id+'.csv');
			}
		});
	}
	
	return svc;
});


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function buildCardTable(scope) {
	var board = scope.model.data;
	
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
	
	scope.model.table = table;
	
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

/*----------------------------------------------------------------------------------------------------*/
function buildCardTableCsv(scope) {
	var table = scope.model.table;
	var csv = "";
	var lineBreak = '\n';
	
	csv += '"ID","Short ID","Board ID","Board Name","List ID","List Name","Name","Description","URL",'+
		'"Last Updated","Due Date","Green Label","Yellow Label","Orange Label","Red Label",'+
		'"Purple Label","Blue Label","Member Count","Comment Count","Vote Count","Checklists"';
	
	for ( mi in table.board.members ) {
		var mem = table.board.members[mi];
		csv += ',"'+mem.fullName+' ('+mem.id+')"';
	}
	
	csv += lineBreak;
	
	for ( ci in table.cards ) {
		var card = table.cards[ci];
		
		csv += 
			'"'+card.id+'",'+
			'"'+card.shortId+'",'+
			'"'+table.board.id+'",'+
			'"'+fixCsvString(table.board.name)+'",'+
			'"'+card.listId+'",'+
			'"'+fixCsvString(card.listName)+'",'+
			'"'+fixCsvString(card.name)+'",'+
			'"'+fixCsvString(card.desc)+'",'+
			'"'+fixCsvString(card.url)+'",'+
			'"'+card.updated+'",'+
			'"'+(card.due ? card.due : '')+'",';
		
		for ( li in table.labelColors ) {
			var color = table.labelColors[li];
			var lblName = card[color+'Label'];
			csv += (lblName == null ? ',' : '"'+fixCsvString(lblName)+'",');
		}
		
		csv += 
			'"'+card.memberCount+'",'+
			'"'+card.commentCount+'",'+
			'"'+card.voteCount+'",';
		
		var csvChecks = "";
		
		for ( ci in card.checklists ) {
			var list = card.checklists[ci];
			csvChecks += (csvChecks.length == 0 ? '' : '; ')+list.name+' ('+list.progress+')';
		}
		
		csv += '"'+csvChecks+'"';
		
		for ( mi in table.board.members ) {
			var mem = table.board.members[mi];
			var cardMem = card['member'+mem.id];
			csv += (cardMem == null ? ',' : ',x');
		}
		
		csv += lineBreak;
	}
	
	scope.model.csv = csv;
}

/*----------------------------------------------------------------------------------------------------*/
function fixCsvString(text) {
	return text.replace(/"/g, '""');
}
