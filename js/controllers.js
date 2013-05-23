


////////////////////////////////////////////////////////////////////////////////////////////////////////
/*----------------------------------------------------------------------------------------------------*/
function Home($scope, RandomService) {
	RandomService.async();
	$scope.data = RandomService.data();
	$scope.data2 = RandomService.data2;
	//$scope.data = Trello.get('/members/me', { boards: "open", organizations: "all" });
}