(function(){
    'use strict';
    
    angular.module('app.test')
        .directive('orangeSection', orangeSection);
        
    function orangeSection($timeout, $compile, $templateCache) {
        var directive = {
            require: 'orangeSection',
            restrict: 'E',
            scope: {
               bread: '='
            },
            transclude: false,
            link: orangeSectionLink,
            controller: orangeSectionCtrl,
            replace: true,
        }
        
        function orangeSectionLink(scope, element, attrs, orangeSectionCtrl){
            scope.$broadcast('testBroadcast');
            console.log(attrs)
            scope.$watch('bread', function(newValue){
                console.log(newValue);
                $timeout(function(){
                    console.log(scope);
                    scope.$apply(function(){
                        scope.bread = "man man man";
                    });
                    console.log(scope);
                }, 5000)
            });

        } 
        
        function orangeSectionCtrl($scope){
             $scope.test = "testing orangeSection directive";
             
             this.setBread = function(data) {
                 $scope.bread = data;
                 $scope.$apply();
             }
        }
        
        return directive;
    }
    
    
    angular.module('app.test')
        .directive('viewOrange', viewOrange);
        
    function viewOrange(){
        var directive = {
            require: ['^orangeSection', 'viewOrange'],
            replace: true,
            restrict: 'E',
            scope: true,
            link: viewOrangeLink,
            controller: viewOrangeCtrl,
            templateUrl: 'app/test/test4_orange.html'
        }
        
        function viewOrangeLink(scope, element, attrs, ctrlArray){
            console.log('viewOrangeLink');
            var orangeSection = ctrlArray[0];
            console.log(orangeSection + ' somethingAWEFUL');
            element.bind('input', function(input){
                orangeSection.setBread(scope.bread);
            })
        }
        
        function viewOrangeCtrl($scope){
            console.log('viewOrangeCtrl');
        }
        
        return directive;
    }
    
    angular.module('app.test')
        .directive('addOrange', addOrange);
        
        
    function addOrange(){
        var directive = {
            require: ['^orangeSection', 'addOrange'],
            restrict: 'E',
            scope: true,
            link: addOrangeLink,
            controller: addOrangeCtrl,
            replace: true
        }
        
        function addOrangeLink(scope, element, attrs, ctrlArray){
            var orangeSectionCtrl = ctrlArray[0]
            console.log(orangeSectionCtrl.test + 'garbage');
        }
        
        function addOrangeCtrl($scope){
            $scope.$on('testBroadcast', function(){
               console.log('GOT IT'); 
            });
        }
        
        
        return directive
    }
    
    
    
    
})();