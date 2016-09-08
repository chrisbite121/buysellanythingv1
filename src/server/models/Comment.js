var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Comment Schema
var commentSchema = new Schema({
    discussion_id: {
        type: Schema.Types.ObjectId  
    },
    parent_id: {
        type: Schema.Types.ObjectId
    },
    parent_type: {
      //is parent User object or Item object
      type: 'String'  
    },
    slug: {
        type: String
    },
    full_slug: {
        type: String
    },
    posted: {
        type: Date
    },
    author_id: {
            type: Schema.Types.ObjectId
        },
    author_name: {
            type: String
    },
    text: {
        type: String
    }
}, {
    collection: 'Comment'
});
// Note discussion_id equals the related item_id


var Comment = module.exports = mongoose.model('Comment', commentSchema);

// Add Comment
module.exports.createComment = function(newComment, callback) {
    //convert authorID and discussionID from strings to Object IDs
    if(newComment.discussion_id) { 
        newComment.discussion_id = mongoose.Types.ObjectId(newComment.discussion_id);
    }
    
    if(newComment.parent_id) {
        newComment.parent_id = mongoose.Types.ObjectId(newComment.parent_id);
    }
    newComment.save(callback);    
}

// Update Comment


// Delete Comment
module.exports.removeComment = function(id, callback) {
    Comment.find({_id: id}).remove(callback);
}

//Get Comment Thread
module.exports.getComments = function(discussion_id, pageNumber, pageSize, callback) {
     var pageSkip, pageSizeLimit;
     
     //check if pageSize is specified
     pageSize ? pageSizeLimit = pageSize : pageSizeLimit = 20;
     //check if pageNumber is specified
     pageNumber ? pageSkip = (pageSize*(pageNumber-1)) : pageSkip = 0;
     
     Comment.find()
            .where('discussion_id').equals(discussion_id)
            .skip(pageSkip)
            .limit(pageSizeLimit)
            .sort('full_slug')
            .exec(callback);
}

//Get comments by User
module.exports.findCommentByUser = function(user_id, pageNumber, pageSize, callback){
     var pageSkip, pageSizeLimit;
     
     //check if pageSize is specified
     pageSize ? pageSizeLimit = pageSize : pageSizeLimit = 20;
     //check if pageNumber is specified
     pageNumber ? pageSkip = (pageSize*(pageNumber-1)) : pageSkip = 0;
     
     Comment.find()
            .where('author_id').equals(user_id)
            .skip(pageSkip)
            .limit(pageSizeLimit)
            .sort('full_slug')
            .exec(callback);
}



//Get Single Comment
module.exports.findComment = function(discussion_id, parent_slug, callback) {
    Comment.findOne({ 'discussion_id': discussion_id, 'slug': parent_slug }).exec(callback);
}