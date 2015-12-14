(function(){
	'use strict';
	
	angular.module('app.signup')
		.controller('signUpCtrl', signUp);
	
	function signUp(){
		var vm = this;
		
		activate();
		
		function activate(){
			console.log('signUp Ctrl activated');
		}
	}
})();