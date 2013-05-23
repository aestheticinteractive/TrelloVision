
var app = angular.module('TrelloVision', []);


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
app.factory('RandomService', function ($timeout) {
	var data = [];
    var data2 = [];
	var svc = {};

	svc.async = function () {
		$timeout(function () {
			data.length = 0;

			for (var i = 0; i < 10; i++) {
				data.push({ val: Math.random() });
			}
		}, 1000);
	};

	svc.data = function () {
		return data;
	};

	svc.data2 = function () {
		data2 = []

		for (var i = 0; i < data.length; i++) {
			data2.push({ val: 10 * data[i] });
		};
		
		return data2;
	};

	return svc;
});