var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Item Schema
var itemSchema = new Schema({
	title: {
		type: String
	},
    id: {
      type: String
    },
    discussion_id: {
      type: Schema.Types.ObjectId,
    },
    created: {
        type: Date,
        default: new Date()
    },
    created_by_id: {
      type: Schema.Types.ObjectId 
    },
    slug: {
      type: String,
    },
	description: {
		type: String,
        default: 'undefined'	
	},
	category_id: {
		type: String,
        default: 'undefined'
	},
	price: {
		type: String,
        default: "0.00"
	},
	geolocation: {
		type: String,
        default: 'undefined'
	},
    images: {
        type: String
    },
    thumb_details: {
      type: String  
    },
    updated: {
        type: Date,
        default: new Date()
	},
    updated_by_id: {
        type: Schema.Types.ObjectId
    }
    }, { 
	collection: 'Item'
	});
	
var Item = module.exports = mongoose.model('Item', itemSchema);

// Get specified Items
module.exports.getItems = function(pageNumber, pageSize, category, callback) {
    var pageSkip, pageSizeLimit, categoryFilter;
    console.log('getting items');

    //Set pageNumber pageSize and Category values
    if (pageNumber && pageSize) {
            pageSkip = (pageSize*(pageNumber-1));
            pageSizeLimit = pageSize; 
        } else {
            pageSkip = 0;
            pageSizeLimit = 10;
    }
    
    if (category && (category == 'all')) {
            console.log(category);
            categoryFilter = null;
        } else if (category) {
            console.log('setting category to category....');
            categoryFilter = category;
        } else {
            console.log('setting category to null');
            categoryFilter = null;
     }
    
    console.log(categoryFilter);
    // Get Items for Page
	if (categoryFilter) {
        Item.find()
            .where('category').equals(categoryFilter)
            .skip(pageSkip)
            .limit(pageSizeLimit)
            .exec(callback);
    
    } else {
        //Get Items all categories
        Item.find()
            .skip(pageSkip)
            .limit(pageSizeLimit)
            .exec(callback);        
    }
}

//Get all Items
module.exports.getAllItems = function(callback) {
    Item.find({}, callback);
}

// Get Item by ID
module.exports.getItemById = function(id, callback) {

    //var docId = mongoose.Types.ObjectId(id);
    //console.log(docId);
	Item.find({slug: id}).exec(callback);
}

// create Item
module.exports.createItem = function(newItem, callback) {
    newItem.discussion_id = mongoose.Types.ObjectId();
	newItem.save(callback);
}

//Update Item
module.exports.updateItem = function(data, callback) {
	var title = data.title;
	var description = data.description;
	var category = data.category;
	var price = data.price;
	var geolocation = data.geolocation;
    var images = data.images;
	var now = new Date();
	
    //var query = {_id:data._id};
	
	Item.findById(data._id, function(err, item){
		if(!item) {
			return next(new Error('Could not load Item'));
		} else {
			//Update
			item.title = title;
			item.description = description;
			item.category = category;
			item.price = price;
			item.geolocation = geolocation;
			item.images = images;
            item.updated = now;
            if(!item.created) {
                item.created = now;
            }
            
			item.save(callback);
		}
	});
}

//Delete Item
module.exports.removeItem = function(id, callback) {
	Item.find({_id:id}).remove(callback);
}

//Get Array of Picture Data
module.exports.getPictureData = function(idArray, callback) {
    //convert arr ay entries into ObjectIds
    // for (var i=0; i <idArray.length; i++) {
    //     idArray[i] = mongoose.Types.ObjectId(idArray[i]);
    // }
    console.log(idArray);
    
    var query = Item.find({'_id': { $in: idArray }}).select('images');
    query.exec(callback);   
};

module.exports.updateImageData = function(thumbArray, id, callback) {
    var objectId = mongoose.Types.ObjectId(id);
    Item.findById(objectId, function(err, item){
        if(err){
            console.log(err);
        } else {
            // Update
            item.thumb_details = thumbArray
        }
            item.save(callback);
        });
}

