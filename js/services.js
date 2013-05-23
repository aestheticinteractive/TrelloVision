
var app = angular.module('TrelloVision', []);


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
app.factory('TrelloMeService', function() {
	var me = { data: null };
	var svc = {};

	svc.loadData = function(scope) {
		trelloAuth(function() {
			Trello.get('/members/me', { boards: "open", organizations: "all" }, function(data) {
				me.data = data;
				scope.$apply();
			});
		});
	};

	svc.me = function () {
		return me;
	};

	return svc;
});
