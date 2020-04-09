(function(){


	var app = angular.module('myop.ctrl');



	//NAV CONTROL
	app.controller('myopCtrl', ['myopData', '$timeout', '$window', '$location', '$rootScope', function (myopData, $timeout, $window, $location, $rootScope){

		//Init UI
		var vm = this;
		vm.loaded = false;
		vm.myop = {};
		vm.myop.slider = null;
		vm.myop.input = {};



		//Load Calculator
		vm.setCalculator = function(mode){

			vm.myop.input.lang = $rootScope.user.lang;

			//Modes
			switch (mode) {
				case 'slide':
					//Slider input
					vm.myop.input.ctrl = vm.myop.slider;
					break;
			}


			//Get Chart data based in inputs (if they exist);
			myopData.getCalculator(vm.myop.input).then(function(response) {


				vm.myop = response.data;

				$timeout(function() {
					//Delayed slider output
					vm.myop.slider = vm.myop.input.ctrl;
				}, 10, true);


				//Build Chart
				vm.myop.chart = myopData.getChart(vm.myop);

				//console.log(vm.myop.treatment.chart.prog_ci);


				vm.toggleModal();

				//Track input change
				vm.trackView(vm.myop.input, vm.loaded);




				//Reveal
				vm.loaded = true;



			})
			.catch(function(response) {

				//Log
    			console.error('API error', response.status, response.data);

    			//Try again
    			setTimeout(vm.setCalculator, 500);

  			});
		};

		vm.setCalculator();


		//UI Helper functions
		vm.toggleModal = function(mode) {
			if(mode == 'off') {
				vm.showModal = false;
				vm.myop.discText = '';
				vm.myop.input.optin = true;
			}
			else {
				vm.showModal = (vm.myop.discText && vm.myop.discText.length) ? true : false;
			}
		};

		vm.getHtml = function(html, age, ctrl) {
			return 	myopData.cleanHtml(html, age, ctrl);
		};



		vm.trackView = function(data, loaded) {

			if (typeof($window.dataLayer) === 'object') {

				var url = window.location.pathname;
				var qry = window.location.search;
				var pageUser = ($rootScope.user.email ? $rootScope.user.email : 'Unknown');
				var pageURL = '/' + $rootScope.user.lang;

				//Legal pages
				if (url.indexOf('legal') > -1) {
					pageURL += url + qry;
				}
				else if (loaded && $rootScope.user.email) {
					pageURL = myopData.getVirtualPageUrl(data);

				}


				dataLayer.push({
					'event':'VirtualPageView',
					'virtualPageURL': pageURL,
					'virtualPageTitle': pageUser
				});

			}
		}

	}]);




})();
