(function(){
    'use strict';
    angular.module('app.test')
        .controller('test2Ctrl', test2Ctrl);
        
    test2Ctrl.$inject=['$scope'];
    
    function test2Ctrl($scope){
        var scaleFactor;
        var position = 1;
        var maxHeight = 100;
        var maxWidth = 75;
        
        $scope.imageArray = []
        $scope.inputTextArray = ['Select a Main Image', 'Select a Second Image', 'Select a Third Image', 'Select a Fourth Image', ''];
        $scope.inputTag = {show: true};
        $scope.inputText = $scope.inputTextArray[0];
        
        //function triggered when input is selected. See Directive
        $scope.uploadFile = function(event){
            var data, reader;
            data = event.currentTarget.files[0];
            reader = new FileReader();
            reader.onload = onLoadFile;
            reader.readAsDataURL(data);
        }
        
        $scope.setMain = function(obj) {
            var imagePosition;
            //get canvas attribute to be used to identify imageArray position
            imagePosition = Number(obj.currentTarget.getAttribute('data-position'));
            //redraw main image
            setMainImage(imagePosition)
        }
        
        $scope.createCanvas = function() {
            var c = document.createElement('canvas');
            c.setAttribute('id', 'zoomImage');
            document.getElementById('divZoom').appendChild(c);
        }
        
        function setMainImage(imagePosition) {
            var img;
            img = new Image();
            img.onload = drawMainImage;
            img.src = $scope.imageArray[imagePosition].image.src;  
            }
        
        function drawMainImage(that) {
            var imageDimensions, ctx, width, height;
            //Scale Image
            scaleFactor = 3;
            //check if this object has been explicitly passed in or not
            if(this) that = this; 
            imageDimensions = calcDimensions(that.height, that.width, scaleFactor);
            width = imageDimensions.width;
            height = imageDimensions.height;
            
            ctx = document.getElementById('mainImage');
            
            //Resize canvas to match image
            ctx.width = width;
            ctx.height = height;
            //Render Image
            ctx.getContext('2d').drawImage(that, 0, 0, width, height);
        
            //Add Event Listeners
            ctx.addEventListener('mouseout', hideCanvas, false);
            ctx.addEventListener('mousemove', move, false);
        }
        
        function hideCanvas(e) {
            console.log('mouse moved out of canvas');
            var divTag = document.getElementById('divZoom');
            // if(document.getElementById('zoomImage')) {
            //     divTag.removeChild(divTag.childNodes[0]);
            // }
            
            
        }
        function move(e) {
                var ctx, pos;
                console.log(e);
                console.log('mouse moved');
                ctx = document.getElementById('zoomImage');
                pos = getMousePos(e);
                var posX = (this.width - pos.x) / 2;
                var posY = (this.height - pos.y) / 2;
                ctx.width = this.width;
                ctx.height = this.height;
                ctx.getContext('2d').drawImage(this, 0, 0, this.width, this.height, 0, 0, 500, 500);
            
            // drawImage(src, srcOffsetX, srcOffsetY, sourceViewWidth, sourceViewHeight,
            // destOffsetX, destOffsetY, destWidth, destHeight);
            
        }
        function getMousePos(evt){
            var ctx, rect;
            ctx = document.getElementById('mainImage');
            rect = ctx.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            }; 
        }
        
        function onLoadFile(event){
            var position, img;
            img = new Image();
            //Call onLoadImage function when image object instantiated
            img.onload = onLoadImage;
            //set image src to equal input option
            img.src = event.target.result;
            //Add image to Array of Objects for upload
            position = $scope.imageArray.length; 
            $scope.imageArray.push({position: position, image: img});
            // Reset input control
            updateControls();
        }
        
        function onLoadImage() {
            var details, canvas, ctx, imageDimensions;
            details = getCanvasDetails();
            canvas = "image0" + details.position.toString();
            //Get Context for approiate canvas
            ctx = document.getElementById(canvas);

            //Scale Image
            scaleFactor = 1;
            imageDimensions = calcDimensions(this.height, this.width, scaleFactor);
            
            //Resize canvas to match image
            ctx.width = imageDimensions.width;
            ctx.height = imageDimensions.height;
            
            //Render Image
            ctx.getContext('2d').drawImage(this, 0, 0, imageDimensions.width, imageDimensions.height);
            
            //Check if image should also be rendered in main canvas
            if (details.isSelected) {
                //Draw Image
                drawMainImage(this);
                // //Scale Image
                // scaleFactor = 3;
                // imageDimensions = calcDimensions(this.height, this.width, scaleFactor);
                // ctx = document.getElementById('mainImage');
                
                // //Resize canvas to match image
                // ctx.width = imageDimensions.width;
                // ctx.height = imageDimensions.height;
                // //Render Image
                // ctx.getContext('2d').drawImage(this, 0, 0, imageDimensions.width, imageDimensions.height);
            }
        }
        
        function calcDimensions(currHeight, currWidth, scaleFactor){
            var height, width, imageDimensions;
            
            if (currWidth < currHeight) {
                width = (currWidth/currWidth) * maxWidth * scaleFactor;
                height = (currHeight/currWidth) * maxWidth * scaleFactor;
            } else {
                width = currWidth/currHeight * maxHeight * scaleFactor;
                height = currHeight/currHeight * maxHeight * scaleFactor;
            }
            
            imageDimensions = {
                height: height,
                width: width
            }
            
            return imageDimensions
        }
        
        function getCanvasDetails(){
            var position, isSelected, details;
            //check if image is first one to be uploaded.  
            //Note suspect that this may sometimes get incoorect value. 
            //Does $scope.imageArray.push always happend before below line evaluates?
            position = $scope.imageArray.length;
            isSelected = ((position == 1) ? true : false); 
            details = {
                position: position,
                isSelected: isSelected
            }
            return details
        }
        
        function updateControls() {
            //Reset input field
            document.getElementById('addImage').value = '';
            // Update input Text Array
            if ($scope.imageArray.length > 3) {
                $scope.$apply(function(){
                    $scope.inputTag = false;
                });
            }
            //update current position
            $scope.position = $scope.imageArray[-1].position;
            //Update input text label
            $scope.imageArray.length ? 
            ($scope.inputText = $scope.inputTextArray[$scope.imageArray.length]) :
            ($scope.inputText = $scope.inputTextArray[0]) ;
            
            $scope.$apply();
        }
        

    
        activate();
        function activate(){
            console.log('test2Ctrl activated');
        }
        
    }
    
    
    
    angular.module('app.test')
        .directive('customOnChange2', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var onChangeHandler = scope.$eval(attrs.customOnChange2);
                    element.bind('change', onChangeHandler);
                }
            };
        });
    
    
})();