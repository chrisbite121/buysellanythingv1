var express = require('express');
var router = express.Router();
var Item = require('../models/Item.js');
var multer = require('multer');
var shortid = require('shortid');
var fs = require('fs');
var sharp = require('sharp');
var Q = require('q');
var avatarDest = 'images/avatar/';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'images/');
    }
});
var upload = multer({ storage: storage });

router.get('/', function (req, res, next) {
    res.redirect('/');
});

router.get('/getOneItem/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    Item.getItemById(id, function (err, item) {
        if (err) {
            console.log(err);
        } else {
            res.json(item);
        }
    });
});

router.get('/getAllItems', function (req, res, next) {
    Item.getAllItems(function (err, items) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(items);
        }
    });
});

router.get('/getItems/:category/:page', function (req, res, next) {
    var pageNumber, pageSize, category;
    // Get query params
    if (req.query) {
        pageNumber = Number(req.query.pageNumber);
        pageSize = Number(req.query.pageSize);
        category = req.query.category;
    }
    console.log('looking up pageNumber: ' + pageNumber.toString());
    getItems(pageNumber, pageSize, category, req, res, next);
});

var galleryUpload = upload.fields([{ name: 'galleryCanvas01', maxCount: 1 }, { name: 'galleryCanvas02', maxCount: 1 }, { name: 'galleryCanvas03', maxCount: 1 }]);
router.post('/createItem', galleryUpload, function (req, res, next) {
    console.log('locating REQ.BODY');
    console.log(req.body);
    // Get Form Values
    var title = req.body.title;
    var category = req.body.category;
    var description = req.body.description;
    var price = req.body.price;
    var geolocation = req.body.geolocation;
    //generate url friendly short id
    var slug = shortid.generate();
    // include image data;
    var images = {};
    if (req.files) {
        images = JSON.stringify(req.files);
    }

    // Item Object
    var newItem = new Item({
        title: title,
        category_id: category,
        description: description,
        price: price,
        geolocation: geolocation,
        slug: slug,
        images: images
    });
    // Create Item
    Item.createItem(newItem, function (err, item) {
        if (err) {
            console.log(err);
        } else {
            console.log('item created returning json...')
            
            //Generate thumbnails.  Note due to processing time and asynchronous erros. thumbnails are generated after
            //item is added to database
            if (req.files) {
                createImageArray(item.images, item._id);
            }

            res.json(item);
        }
    });

});

router.delete('/deleteItem/:id', function (req, res, next) {
    // change id to slug
    var id = req.params.id;
    Item.removeItem(id, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            var pageNumber = 1;
            var pageSize = 20;
            var category = 'All Items'
            getItems(pageNumber, pageSize, category, req, res, next);
        }
    });
});

router.put('/updateItem', function (req, res, next) {
    var data = req.body;
    Item.updateItem(data, function (err, category) {
        if (err) {
            console.log(err);
        } else {
            getItems(req, res, next);
        }
    })
});

// router.post('/createItems', upload.array('files'), function (req, res, next) {
//     // Get Form Values
//     console.log('create Items called');
//     if (req.body) {
//         var title = req.body.data.title;
//         var category = req.body.data.category;
//         var description = req.body.data.description;
//         var price = req.body.data.price;
//         var geolocation = req.body.data.geolocation;
//     }

//     if (req.files) {
//         var images = req.files;
//     }
//     console.log(images);

//     // Item Object
//     var newItem = new Item({
//         title: title,
//         category_id: category,
//         description: description,
//         price: price,
//         geolocation: geolocation,
//         images: images
//     });
//     // Create Item
//     Item.createItem(newItem, function (err, item) {
//         if (err) {
//             console.log(err);
//         } else {
//             getItems(req, res, next);
//         }
//     })

// });


function getItems(pageNumber, pageSize, category, req, res, next) {
    Item.getItems(pageNumber, pageSize, category, function (err, items) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
                return res.json(items)
        }
    });
}

function processItemData(currentValue) {
    console.log('processing Item data...')
    if (currentValue._id) {
        currentValue.created = currentValue._id.getTimestamp();    
    }
    if (currentValue.images) {
        //var imageData = JSON.parse(currentValue.images);
        var siteRoot = "http://localhost:3000"
        currentValue.imageData = {
            main: siteRoot + currentValue.images.path,
            gallery01: siteRoot + currentValue.images.path,
            gallery02: siteRoot + currentValue.images.path,
            gallery03: siteRoot + currentValue.images.path,
        };
        currentValue.images = "";
        console.log(currentValue);
        return currentValue;
    }
}

function createImageArray(data, id) {
    // construct array containing image data;
    var imageData = JSON.parse(data);
    console.log(imageData);
    var imageArray = [];
    for (var i = 1; i <= 3; i++) {
        console.log(imageData['galleryCanvas' + i.toString()]);
        if (imageData && (imageData['galleryCanvas0' + i.toString()])) {
            console.log('found imageData object ' + i)
            // extract image data object
            var imgObj = imageData['galleryCanvas0' + i.toString()][0];
            // append slug to the image object
            imgObj.slug = shortid.generate();
            console.log('generating short id Line 281');
            console.log(imgObj.slug);
            // push into imageArray for processed
            imageArray.push(imgObj);
        }
    }
    createItemThumbnails(imageArray, id);
}

function createItemThumbnails(imageArray, id) {
    Q(imageArray)
    .then(function(imageArray){
        return Q.all(imageArray.map(function(currentValue, index, array){
            return createThumbnail(currentValue, index, array)
            })
        );
    })
    .then(function(thumbArray){
        return JSON.stringify(thumbArray);
    })
    .then(function(thumbArray){
            Item.updateImageData(thumbArray, id, function(err, response){
                if(err) {
                    console.log(err);
                } else {
                    console.log('response received..');
                    console.log(response);
                }
            });
    })
    .catch(console.log.bind(console));
}

function createThumbnail(currentValue, index, array) {
    var deferred = Q.defer();
    console.log('creating avatar ' + index);

    var avatarId = shortid.generate();
    var sourceImage = currentValue.destination + '/' + currentValue.filename;
    var destImage = avatarDest + avatarId + '.jpg';
    var placeholderCanvasName = currentValue.fieldname;
    sharp(sourceImage)
        .resize(100, 100)
        .max()
        .jpeg()
        .toFile(destImage, function (err, info) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log(info);
                    var thumbDetails = {
                        canvasName: placeholderCanvasName,
                        imageDest: avatarDest,
                        thumbId: avatarId,
                        source: sourceImage
                    };
                    deferred.resolve(thumbDetails);
                }
            });
        return deferred.promise;
}


module.exports = router;