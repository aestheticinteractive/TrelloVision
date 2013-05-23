
$(init);


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function init() {
	setupUi();
	//$("#dialogAuthStart").dialog("open");
	trelloAuth();
}

/*----------------------------------------------------------------------------------------------------*/
function setupUi() {
	var btnCancel = {
		text: "Cancel",
		click: function () {
			$(this).dialog("close");
		}
	};
	
	$("#dialogAuthStart").dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Continue",
				click: function () {
					$(this).dialog("close");
					trelloAuth
				}
			},
			btnCancel
		]
	});

	$("#dialogAuthFail").dialog({
		autoOpen: false,
		width: 400,
		buttons: [
			{
				text: "Try Again",
				click: function () {
					$(this).dialog("close");
					trelloReAuth();
				}
			},
			btnCancel
		]
	});
}


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function trelloAuth() {
	var opt = {
		type: "redirect",
		name: "TrelloVision",
		scope: { read: true },
		success: this.trelloAuthSuccess,
		error: this.trelloAuthError
	};

	Trello.authorize(opt);
}

/*----------------------------------------------------------------------------------------------------*/
function trelloReAuth() {
	Trello.deauthorize();
	trelloAuth();
}

/*----------------------------------------------------------------------------------------------------*/
function trelloAuthCheck() {
	if ( !Trello.authorized() ) {
		trelloAuthError();
		return false;
	}

	return true;
}

/*----------------------------------------------------------------------------------------------------*/
var trelloAuthSuccess = function() {
	if ( !trelloAuthCheck() ) {
		return;
	}
};

/*----------------------------------------------------------------------------------------------------*/
function trelloAuthError() {
	$("#dialogAuthFail").dialog("open");
}