(function(){
	'use strict'
	
	angular.module('app.manageItems')
		.controller('app.viewItem', viewItemCtrl)
	
	viewItemCtrl.$inject = ['itemService'];
	
	function viewItemCtrl(itemService) {
		var vm = this;
		
		activate();
		
		function activate() {
			console.log('view item controller activated');
		}
		
	}
	
	
})();