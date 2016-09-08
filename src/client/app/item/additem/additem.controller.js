(function(){
	'use strict';
	angular.module('app.additem')
		.controller('addItemCtrl', addItemCtrl)
		
	addItemCtrl.$inject = [
        '$rootScope', '$scope', '$q', '$state', '$http','itemService', 
        'categoryService', 'geoService', 'config','imageService'];
		
	function addItemCtrl($rootScope, $scope, $q, 
            $state, $http, itemService, categoryService, geoService, 
            config, imageService){
                
		$scope.images = [];
        $scope.inputText = config.images.picInputText[0];
        $scope.item = {};
        var galleryPlaceholder =  config.siteRoot + config.images.galleryImageSrc;
        var mainPlaceholder = config.siteRoot + config.images.mainImageSrc;
        $scope.urlObject = {
            main: mainPlaceholder,
            gallery01: galleryPlaceholder,
            gallery02: galleryPlaceholder,
            gallery03: galleryPlaceholder
        }
        $scope.imageObject = {
            gallery01: {
                inputId: 'file01',
                blob: null,
                fileName: 'gallery01',
                main: true,
                canvasName: config.images.canvas01
            },
            gallery02: {
                inputId: 'file02',
                blob: null,
                fileName: 'gallery02',
                main: false,
                canvasName: config.images.canvas02
            },
            gallery03: {
                inputId: 'file03',
                blob: null,
                fileName: 'gallery03',
                main: false,
                canvasName: config.images.canvas03
            }
        };
        $scope.currentPicSelection
        
        $scope.selectPic = function(event){
            console.log(event);
            var id = event.currentTarget.id.slice(-2);
            var fileId = "file" + id;
            var clickedImage = event.currentTarget.currentSrc
            //If clicked image is placeholder 
            if(clickedImage == galleryPlaceholder) {
                $scope.currentPicSelection = event.currentTarget.id;
                $('input[id="'+ fileId + '"]').click();
            // if clicked image is already set as main picture    
            } else if(clickedImage == $scope.urlObject.main) { 
                return
            } else {
                // set clicked image as main image
                $scope.urlObject.main = clickedImage;       
            }
        };

        $scope.addPic = function(event) {
            //Check for necessary html5APIs
            if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
                console.log('ERROR: The File APIs are not fully supported in ths browser.')
            } else {
            var data, reader;
            //Read data from file as convert to ArrayBuffer
            data = event.currentTarget.files[0];
            reader = new FileReader();
            reader.onload = onLoadFile;
            reader.readAsArrayBuffer(data);
            }
        }

		$scope.addItem = function() {
            var fd = new FormData(document.forms[0]);
                        
            fd.append(config.images.canvas01, $scope.imageObject.gallery01.blob, $scope.imageObject.gallery01.fileName);
            fd.append(config.images.canvas02, $scope.imageObject.gallery02.blob, $scope.imageObject.gallery02.fileName);
            fd.append(config.images.canvas03, $scope.imageObject.gallery03.blob, $scope.imageObject.gallery03.fileName);

            itemService.addItem(fd)
            .then(function(response){
                var item = response.data;
                var slugId = item.slug;
                
                console.log(item);
                console.log(slugId);
                
                var messageData = {
                    duration: 4000,
                    content: 'Item Created',
                    type: 'success',
                };
                $state.go('viewitem', {
                    id : slugId,
                    messageData: messageData,
                    item: item                      
                    });
            })
            .catch(function(err){
                console.log(err);
            });
		}

		activate();
		
		function activate(){
			var promiseA, promiseB;
			promiseA = categoryService.getCategories();
			promiseA.then(function(response){
				$scope.categories = response;
                $rootScope.$broadcast('categoriesUpdated');
                
			});
			
            promiseB = geoService.getProvinces();
			promiseB.then(function(response){
                $scope.locations = response;
                $rootScope.$broadcast('locationsUpdated');
                
		    });
            
          
        }	


    function onLoadFile(event) {
        var blob = new Blob([event.target.result]); // Create Blob
        window.URL = window.URL || window.webkitURL;
        var blobURL = window.URL.createObjectURL(blob); // and get it's URL
        drawCanvas(blobURL);

    }
    
    function drawCanvas(blobURL){
        var img = new Image();
        img.src = blobURL;
        img.onload = function() {
            var imageDimensions = imageService.calcDimensions(this.height, this.width, 3)
            // get dimensions of canvas
            var height =  imageDimensions.height;
            var width = imageDimensions.width;
            // get canvas
            console.log('galleryCanvas0' + $scope.currentPicSelection.slice(-1));
            console.log($scope.imageObject.gallery01.canvasName);
            var canvas = document.getElementById('galleryCanvas0' + $scope.currentPicSelection.slice(-1));
            canvas.height = config.images.maxHeight * 3;
            canvas.width = config.images.maxWidth * 3;
            // set dimensions of canvas
            var ctx = canvas.getContext('2d')
            // Draw white rectangle
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // draw image
            var offSetX = (canvas.width - width) / 2;
            var offSetY = (canvas.height - height) / 2;
            canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height, offSetX, offSetY, width, height);
            createOptimisedImage(canvas);
            }
    }
       
    function createOptimisedImage(ctx) {       
        var optimisedImage = ctx.toDataURL("image/jpeg", 0.6);
        // update mian image
        $scope.urlObject.main = optimisedImage;
        // update thumbnail with image
        $scope.urlObject[$scope.currentPicSelection] = optimisedImage;
        var blob = imageService.dataUriToBlob(optimisedImage);
        //update blobarray with blob
        $scope.imageObject[$scope.currentPicSelection].blob = blob;
        $scope.$apply(); 
       }
    
  }
  
})();