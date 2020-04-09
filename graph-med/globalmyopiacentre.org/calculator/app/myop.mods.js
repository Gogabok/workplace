(function(){

	var app = angular;
	app.module('myop.data',[]);
	app.module('myop.ctrl',[]);
	app.module('myop',['tc.chartjs','ngAnimate', 'ngCookies', 'ngMaterial', 'myop.data','myop.ctrl'])
	.config(['$mdGestureProvider', function($mdGestureProvider) {
		$mdGestureProvider.skipClickHijack();
	}])
	.run(['myopData', '$rootScope', '$cookies', function (myopData, $rootScope, $cookies) {


		if (myopData.getUrlParameter('reset') != '') {
			$cookies.remove('user');
			$rootScope.user = {};
		}

		$rootScope.user = $cookies.getObject('user') || myopData.newUser();



	}]);




})();

