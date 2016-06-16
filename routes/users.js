var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var User = require("../models/User.js");


router.get('/', function(req, res, next){
    console.log('users API called');
    res.status('200').send('Welcome to the Users API');

});

router.get('/getUser/:slug', function(req, res, next){
   var userId;
   if (req.query) {
       userId = req.query.userSlug;
       User.getUser(userId, function(err, user){
           if(err) {
               console.log(err);
               res.send(err);
           } else {
               console.log(user);
               res.json(user);
           }
       });
   } else {
       res.send('error, unable to retrieve user data');
   }
});

router.post('/add', function(req, res, next){

    var userDetail = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address1: req.body.address1,
        address2: req.body.address2,
        postCode: req.body.postCode,
        dob: req.body.dob,
        slug: shortid.generate(),
        updated: new Date(),
        updated_by_name: req.body.updatedBy,
        updated_by_id: req.body.updatedById
     }
     
     Comment.createUser(userDetail, function(err, response){
         if (err){
             console.log(err);
             res.send(err);
         } else {
             console.log(response);
             res.json(response);
         }
     });
    
});

router.put('/update/:slug', function(req, res, next){
        
    var userDetail = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        address1: req.body.address1,
        address2: req.body.address2,
        postCode: req.body.postCode,
        dob: req.body.dob,
        slug: req.params.slug,
    }
    
    Comment.updateUser(userDetail, function(err, response){
        if (err){
             console.log(err);
             res.send(err);
         } else {
             //check if this return updated user. otherwise need to call get user
             console.log(response);
             res.json(response);
         }
    });
});

router.delete('/delete/:slug', function(req, res, next){
    var slug = req.params.slug;
    User.delteUser(slug, function(err, response){
       if(err){
           console.log(err);
           res.json(err);
       } else {
           console.log(response);
           res.json(err);
       }
    });
});

router.get('/users/:pageNumber', function(req, res, next){
   var pageNumber, pageSize;
   pageNumber = req.params.pageNumber;
   if (req.query)  {
   pageSize = req.query.pageSize || null
   }
   User.getUsers(pageNumber, pageSize, function(err, users){
       if (err) {
           console.log(err);
           res.json(err);
       } else {
           res.status('200').json(users);
       }
   }); 
});

module.exports = router;