
var app = angular.module('TrelloVision', []);


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
app.factory('TrelloMeService', function() {
	var me = [];
	var svc = {};
	
	var onData = function(data) {
		me.push('c');
		me.push(data);
		me.push('d');
		alert(me);
	};

	svc.loadData = function () {
		me.push('a');
		trelloAuth(function() {
			me.push('b');
			Trello.get('/members/me', { boards: "open", organizations: "all" }, onData);
			me.push('e');
		});
		me.push('f');
		
		//setInterval(function() { me.push("x"); alert(me); }, 2000);
	};

	svc.me = function () {
		return me;
	};

	return svc;
});
