(function(){


	var app = angular.module('myop.ctrl');



	//User CONTROL
	app.controller('myopUser', ['myopData', '$rootScope', function (myopData, $rootScope){

		//Init UI
		var log = this;
		log.loggedIn = false;
		if ($rootScope.user.email.length) {
			log.loggedIn = true;
		}
		log.error = '';


		//Login
		log.login = function() {
			if ($rootScope.user.fname.length && $rootScope.user.lname.length && $rootScope.user.email.length && $rootScope.user.lang.length) {
				myopData.saveUser();
				log.loggedIn = true;
			}
		};

		log.setLang = function(lang) {
			if (lang) {
				myopData.setUserProperty('lang',lang);
			}
		};

		log.langDir = function(lang) {
			return (lang == 'he') ? 'rtl' : 'ltr';
		}




	}]);




})();
