(function(){


	var app = angular.module('myop.ctrl');

	//User CONTROL
	app.controller('myopLegal',  ['myopData', '$rootScope', function (myopData, $rootScope){

		//Init UI
		var legal = this;
		legal.mode = myopData.getUrlParameter('text') || 'terms';
		legal.code = '';
		legal.getLegal = function() {

			myopData.getLegal(legal.mode, $rootScope.user.lang).then(function(response) {
				legal.code = myopData.cleanHtml(response.data);
			});

		}
		legal.getLegal();
	}]);
})();
