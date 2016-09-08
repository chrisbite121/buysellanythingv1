(function (){
	'use strict';
	
	var core = angular.module('app.core');
	
	var config = {
		appTitle: 'HotThaiDeals',
		menuType: {
			admin: 'admin',
			user: 'user',
			main: 'main'
		},
        imageDataKey: 'images',
        siteRoot: 'http://localhost:3000/',
        images: {
            picInputText: ['Select a Main Image', 'Select a Second Image', 'Select a Third Image', 'Select a Fourth Image', ''],
            maxHeight: 150,
            maxWidth:  150,
            mainImageSrc: 'images/assets/mainimage.jpg',
            galleryImageSrc: 'images/assets/add.jpg',
            canvas01: 'galleryCanvas01',
            canvas02: 'galleryCanvas02',
            canvas03: 'galleryCanvas03'  
        },
        pagination: {
            allCategories: 'all'
        }
        
	}
	
	core.value('config', config);
	

	
})();