(function(){
    'use strict';
    angular.module('app.core')
        .factory('breadCrumbService', breadCrumbService);
        
    breadCrumbService.$inject = ['$state'];
    
    function breadCrumbService($state) {
        var vm = this;
        
        var service = {
            getBreadCrumbs: getBreadCrumbs
        }
        
        return service;
        
        function getBreadCrumbs() {
            // var states = $state.get();
            // var currentState = $state.current.name;
            var breadCrumbArray = [];
            var menuName, stateObject;
            // Get states up the inheritance chain
            var parents = $state.$current.includes || undefined;
            if (parents) {
                  for (var property in parents) {
                      //check that property isn't null
                      if (property !== "") {
                            stateObject = $state.get(property);
                            menuName = stateObject.data.menuName;
                            // we don't want to include abstract states
                            if (stateObject.abstract == true) {
                                
                                //if abstract that construct/redirect to functional home state 
                                try {
                                    var homeState, homeProperty;
                                    // get the home state of parent abstract state
                                    homeState = $state.get(property + '.home') || undefined;

                                    //check that home exists and that it has/will not be included
                                    var includeHomeState
                                    $state.$current.includes[homeState.name] == undefined ? (includeHomeState = true) : (includeHomeState = false);

                                    if ((typeof homeState == 'object') && includeHomeState) {
                                        homeProperty = homeState.name || undefined;
                                        menuName = homeState.data.menuName || undefined;
                                        breadCrumbArray.push({ 
                                            stateName: homeProperty,
                                            menuName: menuName
                                            });
                                    }
                                } 
                                catch (err) {
                                    console.log(err);
                                }
                            } else {
                            breadCrumbArray.push({
                                stateName: property,
                                menuName: menuName
                                });
                            }              
                      }
                  }
            return breadCrumbArray
             
        }
    }
}    
    
})();