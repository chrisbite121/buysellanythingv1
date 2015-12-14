(function(){
	angular.module('app.viewitem')
		.controller('viewItemCtrl', viewItemCtrl);
		
	function viewItemCtrl() {
		var vm = this;
		
		activate();
		
		function activate() {
			console.log('viewItem controller activated');
		}
		
	}
	
})();