(function(){
	'use strict';
	
	angular.module('app.core')
		.factory('messageService', messageService);
		
	messageService.$inject = ['$timeout'];
	
	function messageService($timeout){
		var service = {
			createMessage: function(timeout, content, type, vm){
								if(vm && !vm.message){vm.message={}};
								vm.message.show = true;
								vm.message.type = type;
								vm.message.content = content;
								$timeout(function(){return vm.message.show=false}, timeout);
							}
		}
		
		return service;

		}
		

	
})();