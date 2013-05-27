
$(init);


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function init() {
	if ( Trello.authorized() ) {
		$('#SuccessMsg').show();
		return;
	}
	
	var opt = {
		type: "redirect",
		name: "TrelloVision",
		scope: { read: true },
		success: function() {
			$('#SuccessMsg').show();
		},
		error: function() {
			$('#FailureMsg').show();
			$("#dialogAuthFail").dialog("open");
		}
	};

	Trello.authorize(opt);
}