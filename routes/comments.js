var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var Comment = require('../models/Comment.js');
var Q = require('q');

router.get('/', function(req, res, next){
    res.statis('200').send('Welcome to the Comment API');
});

//Add Comment
router.post('/post', function(req, res, next){
    console.log('request to post comment received');
    console.log(req.body);
    var parentSlug = req.body.parentSlug;
    var discussion_id = req.body.discussionId;
    var authorId = req.body.authorId;
    var authorName = req.body.authorName;
    var text = req.body.text;
    var parentId = req.body.parentId;

    var date = new Date();
    var isoDate = date.toISOString();
    var posted = isoDate;
    var slugPart = shortid.generate();
    var slugPartFull = isoDate + ':' + slugPart;

    var slug, fullSlug, parent
    // check if comment is subcomment       
    
    function setSlugValues(){
        var deferred = Q.defer();
        if (parentSlug) {
            Comment.findComment(discussion_id, parentSlug, function(err, response){
                if (err) {
                    deferred.reject(new Error(error));
                } else {
                    deferred.resolve(function(){
                        console.log('creating full slug based off of parent');
                        parent = response;
                        console.log(response);
                        slug = parent['slug'] + '/' + slugPart;
                        fullSlug = parent['full_slug'] + '/' + slugPartFull;
                        console.log(fullSlug);
                        console.log(slug);                        
                    });
                }
            });
        
        } else {
            deferred.resolve(function(){
                slug = slugPart;
                fullSlug = slugPartFull    
            })
            
        }        
    
    return deferred.promise;
}
    


    console.log(fullSlug);
    console.log(slug);     

    Q(setSlugValues)
    .then(function(){
       // Comment Object;    
        var newComment = new Comment({
            discussion_id: discussion_id,
            parent_id: parentId,
            slug: slugPartFull,
            full_slug: fullSlug,
            posted: posted,
            author_id: authorId,
            author_name: authorName,
            text: text
        });
    
        Comment.createComment(newComment, function(err, response){
        if (err){
            console.log(err);
            res.send(err);
        } else {
            res.json(response);
        }
    });   
 
});
        
    })


//get comments by Thread by page
router.get('/:discussionId/:page', function(req, res, next){
   var pageNumber, pageSize, discussionId;
   if (req.query) {
       pageNumber = req.query.pageNumber;
       discussionId = req.query.discussionId;
       // use default pageSize of 20
       pageSize = req.query.pageSize || null;
       Comment.getComments(discussionId, pageNumber, pageSize, function(err, comments){
           if(err) {
               console.log(err);
               res.send(err);
           } else {
               console.log('response received from database');
               res.json(comments);
           }
       });
       
   } else {
       res.send('error, unable to retrieve comments');
   }
}); 
    

// get comments by user by page
router.get('/byUser/:userId', function(req, res, next){
    var pageNumber, pageSize, userId;
    if (req.query) {
        pageNumber = req.query.pageNumber;
        // user default pageSize of 20
        userId = req.query.pageSize || null;
        Comment.findCommentByUser(userId, pageNumber, pageSize, function(err, comments){
           if(err){
               console.log(err);
               res.send(err);
           } else {
               res.json(comments);
           }
        });
    } else {
        res.send('error, unable to retrieve comments');
    }
    
});

//Delete comment
router.delete('/remove/:commentId', function(req, res, next){
   var commentId;
   if (req.query){
       commentId = req.query.commentId;
       Comment.removeComment(commentId, function(err, response){
          if(err){
              console.log(err);
              res.send(err);
          } else {
              console.log(response);
              res.json(response);
          }
       });
   }
    
});

//Update Comment
router.put('/update/:commentId', function(req, res, next){
    var commentId = req.params.commentId;
    var data = req.body.data;
    if(!data.commentId){
        data.commentId = commentId;
    }
    Comment.updateComment(data, function(err, response){
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            console.log(response);
            res.status('200').json(response);
        }
    })
})

module.exports = router;


