(function(){
	angular.module('app.viewitem')
		.controller('viewItemCtrl', viewItemCtrl);
		
    viewItemCtrl.$inject = ['$rootScope', '$state', '$stateParams', 
        '$scope', '$q', 'itemService', 'imageService', 
        'messageService', 'categoryService', 'config', '$timeout'];
        
	function viewItemCtrl($rootScope, $state, $stateParams, 
        $scope, $q, itemService, imageService, messageService, categoryService,
        config, $timeout) {
		var vm = this;
        var galleryPlaceholder = config.siteRoot + config.images.galleryImageSrc;
        vm.item = null;
        vm.commentDetails = {
            discussionId: null,
            discussionType: 'item',
            parentId: null,
        };
        
        vm.cancelView = function(){
            console.log('cancel view called');
            cancelView();
        }
        
        vm.urlObject = {
            main: null,
            gallery01: null,
            gallery02: null,
            gallery03: null
        }
        
        vm.selectPic = function(event){
            var clickedImage = event.currentTarget.currentSrc
            //If clicked image is placeholder 
            if(clickedImage == galleryPlaceholder) {
                return
            // if clicked image is already set as main picture    
            } else if(clickedImage == vm.urlObject.main) { 
                return
            } else {
                // set clicked image as main image
                vm.urlObject.main = clickedImage;      
            }
        };
        
        
		activate();
		
		function activate() {
            if ($stateParams.item) {
                vm.item = $stateParams.item;
                additionalDetails();  
            } else {
                // if item not included then look to the url for item id 
                var promise = itemService.getOneItem($stateParams.id);
                promise.then(function(data) {
                  vm.item = data[0];
                  console.log(vm.item);
                  //get additional details
                  additionalDetails();
                }); 
            }
            
        }

        function additionalDetails(){
             if($stateParams.messageData) {
				var messageData = $stateParams.messageData;
				messageService.createMessage(messageData.duration, messageData.content, messageData.type, vm);
			}
            
            // extract image urls
            if (vm.item && vm.item.images) {
                vm.item.images = JSON.parse(vm.item.images);
                vm.urlObject = imageService.buildImageUrls(vm.item.images);
            } else {
                vm.urlObject = imageService.buildPlaceholderImageUrls();
            }
            
            if(vm.item && vm.item.category_id){
                //get category name
                vm.item.categoryName = categoryService.getCategoryById(vm.item.category_id);
            }
            
            if(vm.item && vm.item.discussion_id && vm.item._id) {
                vm.commentDetails.parentId = vm.item._id;
                vm.commentDetails.discussionId = vm.item.discussion_id;
            } else {
                console.log('unable to request comments...');
            }
        }
        
        function cancelView() {
            if($rootScope.previousState) {
                $state.go($rootScope.previousState);
            } else {
                $state.go('main.home');
            }
            
        }
  		
	}
	
})();