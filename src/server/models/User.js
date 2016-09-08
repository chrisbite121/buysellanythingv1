var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//User Schema
var userSchema = new Schema({
    username: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    postCode: {
        type: String
    },
    dob: {
        type: Date 
    },
    slug: {
        type: String,
        unique: true
    },
    updated: {
        type: Date
    },
    updated_by_name: {
        type: String
    },
    updated_by_id: {
        type: Schema.Types.ObjectId
    }
    },{
     collection: 'User'
    });
    
var User = module.exports = mongoose.model('User', userSchema);

//Get User
module.exports.getUser = function(slug, callback) {
    User.findOne({slug: slug}).exec(callback);
}

//Delete User
module.exports.deleteUser = function(slug, callback) {
    User.find({slug: slug}).exec(callback);
}

//Update User
module.exports.updateUser = function(userDetails, callback) {
        //add updated date
        userDetails.updated = new Date();
        //add updated By
        userDetails.updated_by_name = '';
        userDetails.updated_by_id = '';
        
        User.findbyId(userDetails.id, function(err, user){
            if(!user) {
                return next(new Error('Could not update User'));
            } else {
                // Update
                user.username = userDetails.username;
                user.firstName = userDetails.firstName;
                user.lastName = userDetails.lastName;
                user.email = userDetails.email;
                user.password = userDetails.password;
                user.address1 = userDetails.address1;
                user.address2 = userDetails.address2;
                user.postCode = userDetails.postCode;
                user.dob = userDetails.dob;
                user.slug = userDetails.slug;
            }
        })
}

//Create User
module.exports.createUser = function(userDetails, callback){
    userDetails.save(callback);
}



//Get Users    
module.exports.getUsers = function(pageNumber, pageSize, callback) {
    var pageSkip, pageSizeLimit;
    
    //chec if pageSize is specified
    pageSize ? pageSizeLimit = pageSize : pageSizeLimit = 50;
    //check if pageNumber is specified
    pageNumber ? pageSkip = (pageSize * (pageNumber-1)) : pageSkip = 0;
    
    User.find()
        .skip(pageSkip)
        .limit(pageSizeLimit)
        .exec(callback);
}