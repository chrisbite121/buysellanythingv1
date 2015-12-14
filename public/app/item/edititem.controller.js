(function(){
	'use strict';
	
	angular.module('app.edititem')
		.controller('editItemCtrl', editItemCtrl);
		
	function editItemCtrl(){
		var vm = this;
		
		activate();
		
		function activate(){
			console.log('editItemCtrl activated');
		}
		
		
	}
})();