const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - meta
 *         - content
 *         - tags
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Auto Generated, Id of the Post
 *         title:
 *           type: string
 *           description: title of Blog Post
 *         meta:
 *           type: string
 *           description: Short meta decription of Blog
 *         content:
 *           type: string
 *           description: Content of Blog Post
 *         tags:
 *           type: string
 *           description: Comma Seprated strings for Blog Post
 *         category:
 *           type: string
 *           description: Category of Blog Post
 *       example:
 *         id: 45sfsdfs548sfd42s4s21s3
 *         title: Top 3 Backend Technologies
 *         meta: famouse technologies to learn !!
 *         content: Node js ,Java SpringBoot, Python Django
 *         tags: node, java, python, Golang
 *         category: technology
 */

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
    category : {
        type : String,
        lowercase : true,
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