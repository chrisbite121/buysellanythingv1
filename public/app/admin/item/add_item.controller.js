(function(){
	angular
		.module('app.manageItems')
		.controller('adminAddItemCtrl', adminAddItemCtrl);
		
	adminAddItemCtrl.$inject = ['$scope', '$timeout', 'itemService', 
       'categoryService', 'geoService', 'messageService'];
	
	function adminAddItemCtrl($scope, $timeout, itemService, 
       categoryService, geoService, messageService) {
			var vm = this;
			vm.message = {};
            vm.picArray = [''];
            vm.editPic = [];
            vm.picFile = [];
 
/*            
			vm.addItem = function(){
				console.log(vm.item);
				var data = vm.item;
				var promise = itemService.addItem(data);
				promise.then(function(response){
					messageService.createMessage(4000, "item created", "success", vm);
					vm.item = '';
				});
			}
*/

            vm.addPicture = function(file) {
                if(file && !file.$error) {
                    vm.picArray.push(file);
                    $scope.$apply();
                    console.log(vm.picArray);
                }
            }            
            
            vm.addItem = function(files, item) {
                console.log('logging files');
                console.log(files);
                files.splice(0,1);
                console.log(files);
                Upload.upload({
                    url: '/item/createItems',
                    arrayKey: '',
                    data: {
                        files: files,
                        data: item
                    }
                }).then(function(response){
                    $timeout(function(){
                        vm.result = response.data;
                        messageService.createMessage(4000, "item created", "success", vm);
                        vm.item = '';
                        vm.picArray = [''];
                    });
                }, function(response) {
                    if (response.status > 0 ){
                        vm.errorMsg = response.status + ':' + response.data;
                    }
                }, function(evt) {
                    vm.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
            
            vm.removePic = function(index){
                vm.picArray.splice(index,1);
            }
            

			activate();
			
			function activate(){
                var promiseA, promiseB;
                
                console.log('admin add item controller activated 555');
                promiseA = categoryService.getCategories();
                promiseA.then(function(response){
                    vm.categories = response;
                });
                
                console.log('calling Promise B');
                promiseB = geoService.getProvinces();
                promiseB.then(function(response){
                    vm.locations = response;
                });
			}
			
		}	
	
})();