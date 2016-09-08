(function(){
    'use strict';
    angular.module('app.home')
        .controller('homeCtrl', homeCtrl);
        
    homeCtrl.$inject = ['$state', '$stateParams', 'itemService', 
                        'breadCrumbService', 
                        'categoryService', 'config', 'imageService'];
    
    function homeCtrl($state, $stateParams, itemService, 
                     breadCrumbService,
                     categoryService, config, imageService) {
        var vm = this;
        vm.breadCrumbArray = [];
        vm.category = {
            categories: null,
            change: changeCategory,
            currentCategory: 'All Categories',
            categoryArray: []
        };
        vm.items = null;
        vm.page = {
            currentPage: 1,
            previousPage: 1,
            nextPage: 2,
            maxSize: 4,
            totalItems: 500,
            rotate: false,
            pageSize: 10,
            change: changePage
        };
        
        vm.viewItem = function(id){
            console.log('view item called');
            console.log(id);
            var params = {
                id: id
            };
            $state.go('viewitem', params);
        }
        
        function getItems(){
            console.log('getting items...')
            var pageNumber, pageSize, category
            category = getCurrentCategory();
            pageNumber = getCurrentPageNumber();
            pageSize = getCurrentPageSize();
            
            itemService.getItems(pageNumber, pageSize, category)
            .then(function(results){
                vm.items = results;
                getNextPageItems();
                vm.items = imageService.buildThumbUrls(vm.items);
            })
            .catch(function(response){
                console.log(response);
            });   
          }
                
        function getNextPageItems(){
            console.log('getting next page items');
            vm.page.nextPage = (vm.page.currentPage + 1);
            itemService.getItems(vm.page.nextPage, vm.page.pageSize, vm.category.currentCategory);
        }        
        
        function getCategories(){
            console.log('getting categories');
        }
        
        function changeCategory(filter){
            console.log('change category called');
            vm.category.currentCategory = filter;
            var params = getParams();
            $state.go('main.query', params);
        }
        
        function changePage(){
            var params = getParams();
            $state.go('main.query', params)
        }
        
        function getCurrentCategory(){
            var categoryParams = $stateParams.category; 
            buildCategoryArray();
            console.log(vm.category.categoryArray.indexOf(categoryParams));
            if(categoryParams){
                if (categoryParams == ('all' || null)) {
                        vm.category.currentCategory = config.pagination.allCategories;
                } else if (vm.category.categoryArray && vm.category.categoryArray.indexOf(categoryParams) == -1) {
                    //check that category requested is valid 
                    console.log('category not identified.... redirecting to home page');
                    $state.go('main.home');
                } else {
                    vm.category.currentCategory = categoryParams
                }
            }
            return vm.category.currentCategory
          } 
        
        function getCurrentPageSize(){
            return vm.page.pageSize
        }
        
        function getCurrentPageNumber(){
            if ($stateParams.page !== "") {
                    vm.page.currentPage = Number($stateParams.page);
                }
            return vm.page.currentPage
        }
        
        function getParams(){
            var params = {
                page: vm.page.currentPage,
                category: vm.category.currentCategory
            };
            
            return params;
        }
        
        function buildCategoryArray(){
            if (vm.category.categories) {
                for(var i = 0; i < vm.category.categories.length; i++) {
                    vm.category.categoryArray.push(vm.category.categories[i].title);
                }
             }
        }
        
        activate();
        
        function activate(){
            console.log('homeCtrl activated');
            //need to change callback into promise at some point
            categoryService.getCategories()
                .then(function(results){
                    vm.category.categories = results;
                    getItems();
                    })
            }
    }
})();