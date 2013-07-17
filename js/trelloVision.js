
var TrelloVisionVersion = "0.2.0.cc3bf7a";
var HashTagPattern = /([\s">\[\{}])(#)([a-zA-Z][\w\-]*)/g;


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function trelloAuth(onSuccess, onError) {
	var opt = {
		type: "popup",
		name: "TrelloVision",
		scope: { read: true },
		success: onSuccess,
		error: onError
	};

	Trello.authorize(opt);
}

/*----------------------------------------------------------------------------------------------------*/
function isTrelloAuthRequired(err) {
	return (err.responseText.indexOf('invalid token') == 0);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function descToHtml(desc, boardId, tagClass) {
	if ( desc == null ) {
		return null;
	}

	var mc = new Markdown.Converter();
	var html = mc.makeHtml(desc);

	html = html.replace(HashTagPattern,
		'$1<span class="'+tagClass+'">'+
			'<a href="#/cardtable/board/'+boardId+'?ft=$3">'+
				'$2$3'+
			'</a>'+
		'</span>'
	);

	return html;
}

/*----------------------------------------------------------------------------------------------------*/
function cleanFilterText(text) {
	return text.replace(/[^\w]/g, ' ');
}

/*----------------------------------------------------------------------------------------------------*/
function isTextMatch(text, search) {
	var tokens = search.split(' ');

	for ( ti in tokens ) {
		var token = tokens[ti];

		if ( text.toLowerCase().indexOf(token.toLowerCase()) == -1 ) {
			return false;
		}
	}

	return true;
}