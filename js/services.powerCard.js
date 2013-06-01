

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
		
		TrelloDataService.loadData(scope, 'cards/'+cardId, params, function() {
			var text = scope.model.data.desc;
			var pat = scope.hashtagPattern;
			var tags = [];
			var match;
			
			while ( (match = pat.exec(text)) ) {
				tags.push(match[3]);
			}
			
			scope.model.hashtags = tags;
		});
		
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
		
		scope.hashtagPattern = /([\s">\[\{}])(#)([a-zA-Z][\w\-]*)/g;
		
		scope.descToHtml = function(desc, tagClass) {
			if ( desc == null ) {
				return null; 
			}
			
			var mc = new Markdown.Converter();
    		var html = mc.makeHtml(desc);
			
			html = html.replace(scope.hashtagPattern, 
				'$1<span class="'+tagClass+'">'+
					'<a href="#/cardtable/board/'+scope.model.data.board.id+'?ft=$3">'+
						'$2$3'+
					'</a>'+
				'</span>'
			);
			
			return html;
		}
	};
	
	return svc;
});
