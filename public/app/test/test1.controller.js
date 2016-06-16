(function(){
    'use strict';
    angular.module('app.test')
        .controller('test1Ctrl', test1Ctrl);
    
    test1Ctrl.$inject=['$scope', '$http'];
    
   function test1Ctrl($scope, $http){
       var vm = this;
       var maxHeight = 100
       var maxWidth = 75
       var scaleFactor
       var imagePosition
       
       $scope.canvasArray = [];
       $scope.picOrder = [1, 2 , 3, 4];
       $scope.inputText ='';
       $scope.inputTextArray = ['Select a Main Image', 'Select a Second Image', 'Select a Third Image', 'Select a Fourth Image', ''];
       $scope.inputTag = {show: true};
       $scope.test = 'testing'
       
       
       
       $scope.add = function(){
           //processFunction1();
           var fileList = document.getElementById('file').files
           console.log(fileList);
           processFunction2();

       }
       
       $scope.setMain = function(obj){
           console.log(obj.target.attributes.id.value);
           //getCanvasArrayPosition
           imagePosition = Number(obj.currentTarget.getAttribute('data-position'));
           console.log($scope.canvasArray);
           //redraw main image
           onLoadFile2();
           
       }
       
       $scope.downloadImages = function(){
           console.log('downloading images');
           $http.get('/images/getImages')
            .then(function(data){
            //     console.log(response);
            //   var img = new Image();
            //   img.onload = onLoadImage2;
            //   img.src = response.data;
            
            // console.log(data);
            // var arrayBufferView = new Uint8Array( data );
            // var blob = new Blob( [ arrayBufferView ], { type: "image/png" });
            // console.log(blob);
            // var urlCreator = window.URL || window.webkitURL;
            // var imageUrl = urlCreator.createObjectURL( blob );
            // var img = document.querySelector( "#imageReview");
            // img.src = imageUrl;
            
            var img = new Image(); 
            img.onload = function(){
                var ctx = document.querySelector( "#canvas05");
                var width = 600;
                var height = 900;
                ctx.width = width;
                ctx.height = height;
                ctx.getContext('2d').drawImage(this, 0, 0, this.width, this.height); 
            };
            
            img.src = "http://localhost:3000/34b1ccd71bfbf26c7efae5c16cfc51a0";
            
           }).catch(function(err, status){
               console.log(status);
               console.log(err);
           });
       }
       
       $scope.getCachedImage = function(){
            var img = new Image(); 
            img.onload = function(){
                var ctx = document.querySelector( "#canvas06");
                var width = 600;
                var height = 900;
                ctx.width = width;
                ctx.height = height;
                ctx.getContext('2d').drawImage(this, 0, 0, this.width, this.height); 
            };
            
            img.src = "http://localhost:3000/34b1ccd71bfbf26c7efae5c16cfc51a0";
       }

       function onLoadImage2(){
           var width, height, ctx;
           ctx = document.getElementById('canvas01');
           scaleFactor = 3;
           if (this.width < this.height) {
                
                width = (this.width/this.width) * maxWidth * scaleFactor;
                height = this.height/this.width * maxWidth * scaleFactor;
           } else {
               width = this.width/this.height * maxHeight * scaleFactor;
               height = this.height/this.height * maxHeight * scaleFactor;
           }
           ctx.width = width;
           ctx.height = height;
           console.log(height);
           console.log(width);
           ctx.getContext('2d').drawImage(this, 0, 0, width, height);
       }
       
       function onLoadFile2() {
           var img = new Image();
           img.onload = onLoadImage2;
           img.src = $scope.canvasArray[imagePosition].src;
       }

       function processFunction1(){
            var f = document.getElementById('file').files[0],
               r = new FileReader();
            r.onloadend = function(e){
               var data = e.target.result;
               
           }
           r.readAsBinaryString(f);
               
       }

       function processFunction2(){
           var data = document.getElementById('file').files[0];
           var reader = new FileReader();
           reader.onload = onLoadFile;
           reader.readAsDataURL(data);
       }
       
       function onLoadFile(event){
           var img = new Image();
           img.onload = onLoadImage;
           img.src = event.target.result;
           $scope.canvasArray.push(img);
           updateControls();

       }
       
       
       function onLoadImage() {
           var width, height, details, canvas, ctx;
           details = getCanvasDetails();
           canvas = "canvas0" + details.position.toString() 
           ctx = document.getElementById(canvas);
           
           //Check if image is main or secondary
           (details.position == 1) ? (scaleFactor = 3): (scaleFactor = 1);
           //Re portion image size    
           if (this.width < this.height) {
                
                width = (this.width/this.width) * maxWidth * scaleFactor;
                height = this.height/this.width * maxWidth * scaleFactor;
           } else {
               width = this.width/this.height * maxHeight * scaleFactor;
               height = this.height/this.height * maxHeight * scaleFactor;
           }
           ctx.width = width;
           ctx.height = height;
           ctx.getContext('2d').drawImage(this, 0, 0, width, height);
       }
       
       function getCanvasDetails(){
           var position = $scope.canvasArray.length;
           var details = {
               position: position
           }
           
           return details
       }
       
       function updateControls(){
           //Reset input field
           document.getElementById('file').value = '';
           // Update input Text Array
           console.log($scope.canvasArray.length);
           if ($scope.canvasArray.length > 3) {
             
             console.log('changing input tag value')
             $scope.$apply(function(){
                 $scope.inputTag = false;
             });  
           }
           //Update input text label
           $scope.inputText = $scope.inputTextArray[$scope.canvasArray.length];
           console.log($scope.inputText);
           $scope.$apply();
       }
       
       $scope.uploadFile = function(event) {
           var files = event.target.files;
           console.log(files);
           console.log('uploadFile called');
       };
       
       
       activate();
       function activate(){
           $scope.inputText = $scope.inputTextArray[0];
           
       }
      
   }
   
   angular.module('app.test')
        .directive('customOnChange', function() {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var onChangeHandler = scope.$eval(attrs.customOnChange);
                    element.bind('change', onChangeHandler);
                }
            };
        });    
    
})();