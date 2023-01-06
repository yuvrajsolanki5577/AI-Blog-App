const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    content : {
        type : String,
        required : true,
        trim : true
    },
    meta : {
        type : String,
        required : true,
        trim : true
    },
    tags : {
        type : [String],
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    slug : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    thumbnail : {
        type : Object,
        url : {
            type : URL,
            // required : true
        },
        public_id : {
            type : String,
            // required : true
        }
    },   
},{
    timestamps : true
})

const Post = mongoose.model("Post",postSchema);

module.exports = Post ;