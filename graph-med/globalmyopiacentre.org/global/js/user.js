function newUser() {

	//Detect browser language
	var lang = window.navigator.userlanguage || window.navigator.language;
	lang = lang.toLowerCase();
	lang = lang.substr(0,2);
	//Validate language
	var langs = ['en','zh','es','it','he','pt','vn','jp'];
	if(langs.indexOf(lang) === -1) {
		lang = 'en';
	}

	var user = {
		fname: '',
		lname: '',
		email: '',
		lang: lang
	};



	user.fname = $cookies.get('user_fname');
	user.lnamefname = $cookies.get('user_lname');
	user.email = $cookies.get('user_email');


	/* // Code Updated by Ali Khan to get users inforamtion via cookies
	//Set user
	var user = {
		fname: '',
		lname: '',
		email: '',
		lang: lang
	}

	*/

	return user;

}

