(function(){

	var app = angular.module('myop.data');


	app.factory('myopData', ['$rootScope', '$cookies', '$sce', '$http', function($rootScope, $cookies, $sce, $http) {
		return {
			newUser: function() {

				//Detect browser language
				var lang = window.navigator.userlanguage || window.navigator.language;
				lang = lang.toLowerCase();
				lang = lang.substr(0,2);
				//Validate language
				langs = ['en','zh','es','it','he','pt','vn','jp'];
				if(langs.indexOf(lang) == -1) {
					lang = 'en';
				}
				//Set user
				var user = {
					fname: '',
					lname: '',
					email: '',
					lang: lang
				}
				return user;
			},
			getExpDate: function() {
				// this will set the expiration to 1 month
				var now = new Date();
			    var expiry = new Date(now.getFullYear(), now.getMonth()+12, now.getDate());
    			return expiry;
			},
			setUserProperty: function(property, value) {
				$rootScope.user[property] = value;
				$cookies.putObject('user', $rootScope.user, {'expires': this.getExpDate()});
			},
			saveUser: function() {
				this.updateMailChimp($rootScope.user);
				$cookies.putObject('user', $rootScope.user, {'expires': this.getExpDate()});
			},
			getLegal: function(mode, lang) {
				var url = 'data/' + mode + '_' + lang + '.html';
				return $http.get(url);
			},
			getCalculator: function(data) {
				var url = 'lib/php/api.php';
				return $http.post(url, data);
			},
			getChart: function(data) {
				//start plus half the max range
				//suggMax = data.treatment.chart.prog_re[0] + data.treatment.chart.ctrl_ci[data.treatment.chart.ctrl_ci.length - 1]/2;
				suggMax = 0;
				//end minus half the max range
				suggMin = data.treatment.chart.prog_re[data.treatment.chart.prog_re.length - 1] + (0 - data.treatment.chart.prog_ci[data.treatment.chart.prog_ci.length - 1]);
				var chart = {
					config : {
						responsive: true,
						legend: {
							display: true,
							position: 'top'
						},
						scales: {
							xAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: data.labels.xAxis
								}
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: data.labels.yAxis
								},
								ticks: {
									beginAtZero: false,
									suggestedMax: suggMax,
									suggestedMin: suggMin,
									stepValue: 1,
									stepSize: 1,
									userCallback: function(label, index, labels) {
										return label.toFixed(2);
									},
								}

							}]
						},
						annotation: {
							annotations: [{
								type: "box",
								xScaleID: "x-axis-0",
								xMin: data.gryBox[0],
								xMax: data.gryBox[1],
								backgroundColor: "rgba(0,0,0,0.03)",
								borderWidth: 0,
								borderColor: "rgba(0,0,0,0)",
							}]
						}
					},
					data : {
						labels: data.ageRange,
						datasets: [{
							label: data.labels.legend[0],
							fill: false,
							data: data.treatment.chart.ctrl_re,
							width: data.treatment.chart.ctrl_ci,
							borderColor: "rgba(57, 181, 74, 1)",
							backgroundColor: "rgba(57, 181, 74, 0.4)",

							borderWidth: 1,
							pointRadius: 0
						},
						{
							label: data.labels.legend[1],
							fill: false,
							data: data.treatment.chart.prog_re,
							width: data.treatment.chart.prog_ci,
							borderColor: "rgba(237, 28, 36, 1)",
							backgroundColor: "rgba(237, 28, 36, 0.4)",
							borderWidth: 1,
							pointRadius: 0
						}]
					}
				};
				return chart;
			},
			cleanHtml: function(html, age, ctrl) {
				if(html) {
					if (typeof(age) != 'undefined') {
						html = html.replace('#age#', '<strong>' + age + '</strong>' );
					}
					if (typeof(ctrl) != 'undefined') {
						html = html.replace('#ctrl#', '<strong>' + ctrl + '%</strong>' );
					}
					return $sce.trustAsHtml(html);
				}
			},
			treatmentSlug: function(id){
				var slug = '';
				switch (id) {
					case '1':
						slug = 'multifocal-soft-contact-lenses';
						break;
					case '2':
						slug = 'peripheral-defocus-spectacles';
						break;
					case '3':
						slug = 'executive-bifocals';
						break;
					case '4':
						slug = 'progressive-addition-spectacles';
						break;
					case '5':
						slug = 'orthokeratology';
						break;
					case '6':
						slug = 'low-dose-atropine';
						break;
					case '7':
						slug = 'high-dose-atropine';
						break;
					case '8':
						slug = 'combined-treatment';
						break;
					default:
						slug = 'unknown';
				}
				return slug;
			},
			slugifyRE: function(text){
				return text.toString().toLowerCase().trim()
					.replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
					.replace(/[\s_-]+/g, '') // swap any length of whitespace, underscore, hyphen characters with a single _
					.replace(/^-+|-+$/g, ''); // remove leading, trailing -
			},
			getVirtualPageUrl: function(data) {
				var url = '';
				//No input
				if (angular.equals(data,{})) {
					url = '/';
				}
				else {
					//Language
					url += '/' + data.lang;
					//Ethnicity
					url += '/' + data.ethnic;
					//Treatment
					url += '/' + this.treatmentSlug(data.treatId);
					//Age
					url += '/' + data.age;
					//RE
					url += '/' + this.slugifyRE(data.re);
					//Ctrl
					url += '/' + data.ctrl;
					//Reviewed
					url += '/' + (data.reviewed ? 'reviewed' : 'unreviewed');

				}
				return url;
			},
			updateMailChimp: function(data) {
				var url = '/lib/php/mailchimp.php';
				return $http.post(url, data);
			},
			getUrlParameter:  function(name) {
				name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
				var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
				var results = regex.exec(location.search);
				return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
			}
		};
	}]);

})();