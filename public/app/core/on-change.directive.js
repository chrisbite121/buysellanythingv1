(function(){
    angular.module('app.core')
        .directive('onChange', onChange);
        
   function onChange() {
       return {
           restrict: 'A',
           link: function(scope, element, attrs) {
               var onChangeHandler = scope.$eval(attrs.onChange);
               //Do we need to clean this up??
               element.bind('change', onChangeHandler);
           }
       };
   }    
    
    
})();

