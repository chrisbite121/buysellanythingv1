(function(){
	'use strict';
	
	angular.module('app.home')
		.controller('homeCtrl', homeCtrl);
		
		
	function homeCtrl(){
		var vm = this;
		
		activate();
		
		function activate(){
			console.log('home Ctrl activated');
		}
	}
	
})();