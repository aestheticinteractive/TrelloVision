

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