var express = require('express');
var router = express.Router();
var Item = require('../models/Item.js');
var multer = require('multer');
var sharp = require('sharp');
var fs = require('fs');
var shortid = require('shortid');

var upload = multer({ dest: 'public/images/test1'});
var avatarDest = 'public/images/test1/avatar/';


router.get('/', function(req, res, next){
    console.log('images API called');
    res.status('200').send('Welcome to the Images API');
});

var galleryUpload = upload.fields([{ name: 'placeholderCanvas1', maxCount: 1}, { name: 'placeholderCanvas2', maxCount: 1 }, { name: 'placeholderCanvas3', maxCount: 1}]);
router.post('/upload', galleryUpload, function(req, res, next) {

    console.log(req.file);
    console.log(req.files);
    
    // Generate thumbnail Image 
    for (var i=1; i<=3; i++) {
        if (req.files && (req.files.placeholderCanvas + i)) {
        console.log('creating avatar ' + i );
        
            var avatarId = shortid.generate();
            var placeholderCanvasName = 'placeholderCanvas' + i;
            sharp(req.files[placeholderCanvasName][0].destination + '/' + req.files[placeholderCanvasName][0].filename)
                    .resize(100, 100)
                    .max()
                    .jpeg()
                    .toFile(avatarDest + avatarId + '.jpg'
                    ,function(err, info){
                        if(err){
                            console.log(err);
                        } else {
                            console.log(info);
                            console.log(avatarId +'.jpg')
                        }
                    });
        }
    }
 
    // //Create thumbnail size
    // if (req.files && req.files.placeholderCanvas1) {
    //     console.log('creating avatar01...');
        
    //         var avatarId1 = shortid.generate();
    //         sharp(req.files.placeholderCanvas1[0].destination + '/' + req.files.placeholderCanvas1[0].filename)
    //                 .resize(100, 100)
    //                 .max()
    //                 .jpeg()
    //                 .toFile(avatarDest + avatarId1 + '.jpg'
    //                 ,function(err, info){
    //                     if(err){
    //                         console.log(err);
    //                     } else {
    //                         console.log(info);
    //                         console.log(avatarId1 +'.jpg')
    //                     }
    //                 });
    //     }
        
    // if (req.files && req.files.placeholderCanvas2) {
    //     console.log('creating avatar02...');

    //         var avatarId2 = shortid.generate();
    //         sharp(req.files.placeholderCanvas2[0].destination + '/' + req.files.placeholderCanvas2[0].filename)
    //                 .resize(100, 100)
    //                 .max()
    //                 .jpeg()
    //                 .toFile(avatarDest + avatarId2 + '.jpg'
    //                 ,function(err, info){
    //                     if(err){
    //                         console.log(err);
    //                     } else {
    //                         console.log(info);
    //                         console.log(avatarId2 +'.jpg')
    //                     }
    //                 });
    //     }

    // if (req.files && req.files.placeholderCanvas3) {
    //     console.log('creating avatar03...');

    //         var avatarId3 = shortid.generate();
    //         sharp(req.files.placeholderCanvas3[0].destination + '/' + req.files.placeholderCanvas3[0].filename)
    //                 .resize(100, 100)
    //                 .max()
    //                 .jpeg()
    //                 .toFile(avatarDest + avatarId3 + '.jpg'
    //                 ,function(err, info){
    //                     if(err){
    //                         console.log(err);
    //                     } else {
    //                         console.log(info);
    //                         console.log(avatarId3 +'.jpg')
    //                     }
    //                 });
    //     }
        // can't use for loop, likely to be an issue running async function inside synchronous for loop
        // for(var i=0; i< req.files.placeholderCanvas.length ; i++) {
        //     var avatarId = shortid.generate();
        //     sharp(req.files['placeholderCanvas'][i].destination + '/' + req.files['placeholderCanvas'][i].filename)
        //             .resize(100, 100)
        //             .max()
        //             .jpeg()
        //             .toFile(avatarDest + avatarId + '.jpg'
        //             ,function(err, info){
        //                 if(err){
        //                     console.log(err);
        //                 } else {
        //                     console.log(info);
        //                     console.log(avatarId+'.jpg')
        //                 }
        //             });
        //     }

    console.log('got something');
    res.send('images/api pinged');
});

router.get('/getImages', function(req, res,next){
    var img = '';
    var fileName = '';
    var mimeType = '';
    var fileExt = '';
    
    console.log('getinng images from server');
    
    fileName = '37ea69425f9ad3ba87f35dccc92ed983';
    mimeType = 'image/jpeg'
    fileExt = 'jpeg'
    
    var file = './public/images/' + fileName;
    
    
    //res.setHeader('Content-disposition',  'attachment; filename=' + fileName);
    //res.setHeader('Content-type', mimeType);
    
    // var filestream = fs.createReadStream(file);
    // filestream.pipe(res);
    
    // res.download(file);
    
    // var options = {
    //     root: __dirname + '../public/images',
    //     dotfiles: 'deny',
    //     headers: {
    //         'x-timestamp' : Date.now(),
    //         'x-sent': true
    //     }
    // };
    
    // res.sendFile(fileName, options, function(err){
    //     if (err) {
    //         console.log(err);
    //         res.status(err.status).end()
    //     }
    //     else {
    //         console.log('Sent:', fileName);
    //     }
    // });
    
    var stat = fs.statSync(file);
    res.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': stat.size
    });
    fs.createReadStream(file).pipe(res);
    
});

module.exports = router;

