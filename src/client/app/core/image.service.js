(function(){
    'use strict';
    angular.module('app.core')
        .factory('imageService', imageService);
        
    imageService.$inject = ['$http', 'config'];
    
    function imageService($http, config){
        var service = {
            processImageData: processImageData,
            dataUriToBlob: dataUriToBlob,
            buildImageUrls: buildImageUrls,
            buildPlaceholderImageUrls: buildPlaceholderImageUrls,
            buildThumbUrls: buildThumbUrls,
            calcDimensions: calcDimensions
        }
        
        return service;
        
       // used in admin 
        function processImageData(itemData){
            var imageArray = [];
            var imageKey = config.imageDataKey
            if (!itemData || itemData.length == 0) {
                return console.log('failed to find Image Data');
            } else {
                var results = iterateData(itemData, imageKey, imageArray);
                return results;
            }
        }
        
        // used in admin
        function iterateData(itemData, imageKey, imageArray){
            for (var key in itemData) 
            {
                console.log(key === imageKey);
                //if property is object or array then recursively iterate through it
                if (typeof itemData[key] == "object" && itemData[key] !== null)
                    iterateData(itemData[key], imageKey, imageArray);
                //check if property is 'images'
                else if (key === imageKey) {
                    //convert string into JSON object
                    key = JSON.parse(itemData[key]);
                    // for each item in 'images' construct url
                      for (var i in key) {
                            var fileExt, fileName, pathName;
                            fileExt = key[i].mimetype.split('/')[1];
                            fileName = key[i].filename;
                            pathName = key[i].destination;
                            
                            imageArray.push(config.siteRoot + pathName + fileName);                                 
                        }
                      }
             }
             return imageArray
        }
        
    // used in addItem
        function dataUriToBlob(dataUri) {
            //convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataUri.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataUri.split(',')[1]);
            else
                byteString = unescape(dataUri.split(',')[1]);
                
                
           // seperate out the mime component
           var mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];
           
           // write the bytes of the string to a type array
           var ia = new Uint8Array(byteString.length);
           for (var i=0; i < byteString.length; i++) {
               ia[i] = byteString.charCodeAt(i);
           }
           
           return new Blob([ia], {type: mimeString} );
        }
    

 // buildImageUrls is uses to extract image urls in viewItemController 
    function buildImageUrls(imageData){
        
        var gallery01 = config.siteRoot + imageData[config.images.canvas01][0].path;
        var gallery02 = config.siteRoot + imageData[config.images.canvas02][0].path;
        var gallery03 = config.siteRoot + imageData[config.images.canvas03][0].path;
        
        var urlObject = {
            main: gallery01,
            gallery01: gallery01,
            gallery02: gallery02,
            gallery03: gallery03
        }
        
        return urlObject
    }
    
    function buildPlaceholderImageUrls(vm) {
        var galleryPlaceholder =  config.siteRoot + config.images.galleryImageSrc;
        var mainPlaceholder = config.siteRoot + config.images.mainImageSrc;
        
        var urlObject = {
                main: mainPlaceholder,
                gallery01: galleryPlaceholder,
                gallery02: galleryPlaceholder,
                gallery03: galleryPlaceholder           
        }
        
        return urlObject

    }
    
        function calcDimensions(currHeight, currWidth, scaleFactor) {
        var height, width, imageDimensions;
        
        if(currHeight < currWidth) {
            width = (currWidth/currWidth) * config.images.maxWidth * scaleFactor;
            height = (currHeight/currWidth) * config.images.maxWidth * scaleFactor;
        } else {
            width = (currWidth/currHeight) * config.images.maxHeight * scaleFactor;
            height = (currHeight/currHeight) * config.images.maxHeight * scaleFactor;
        }
        
        imageDimensions = {
            height: Math.round(height),
            width: Math.round(width)
        }
        
        return imageDimensions;
    }
    
    function buildThumbUrls(itemData){
        itemData.forEach(function(currentValue, index, array){
            if (typeof currentValue.thumb_details == 'string') 
                     currentValue.thumb_details = JSON.parse(currentValue.thumb_details);
            
            if(currentValue.thumb_details 
                && currentValue.thumb_details.length > 0) {
                //Note currently thumbnails of all pictures created.  should be changed 
                //to only contain one thumbnail
                currentValue.thumbUrl =
                                        config.siteRoot 
                                       +currentValue.thumb_details[0]['imageDest']
                                       +currentValue.thumb_details[0]['thumbId']
                                       +'.jpg';
            } else {
                currentValue.thumbUrl = config.siteRoot + config.images.galleryImageSrc;
            }
           
        });
        return itemData;
    }
 }    
    
})();