const Post = require("../models/posts");
const User = require("../models/users");
const FeaturedPost = require("../models/featuredPost");
const cloudinary = require("../cloud");
const { isValidObjectId } = require("mongoose");

const addToFeaturedPost = async (postId) => {

    const isAlreadyExists = await FeaturedPost.findOne({post : postId});

    if(isAlreadyExists){
        return;
    }

    const FEATURED_POSTS_COUNT = 5 ;

    const featuredPost = new FeaturedPost({post : postId});
    await featuredPost.save();

    const featuredPosts = await FeaturedPost.find({}).sort({createdAt : -1});
    featuredPosts.forEach( async (post,index) => {
        if(index >= FEATURED_POSTS_COUNT){
                await FeaturedPost.findByIdAndDelete(post._id);
        }
    });
};

const removeFromFeaturedPost = async (postId) => {
    await FeaturedPost.findOneAndDelete({post : postId});
};

const isFeaturedPost = async (postId) => {
   const post = await FeaturedPost.findOne({post : postId});
   return post ? true : false;
};

exports.createPost = async (req,res) => {
    try {

        const { title , meta , content , slug , tags , category , featured }  = req.body;
        const author = req.User_id;
        const {file} = req;
        
        const isAlreadyExists = await Post.findOne({slug});

        if(isAlreadyExists){
            return res.status(401).json({ error : `Please Use Unique Slug , this Slug is Already Exists` });
        }
        
        const newPost = new Post({title , meta , category ,content , slug , author , tags });

        if(file){
            const {secure_url : url , public_id} =  await cloudinary.uploader.upload(file.path);
            newPost.thumbnail = { url , public_id};
        }
        
        await newPost.save();

        const user = await User.findByIdAndUpdate({_id : author}, {  $push : { blogs : newPost._id }});
        await user.save();

        if(featured){
            await addToFeaturedPost(newPost._id);
        }

        res.json({post : {id : newPost._id,title , category , content , meta , slug , thumbnail : newPost.thumbnail?.url , author : newPost.author}});

    } catch (error) {
        return res.status(500).json({error : error.message});
    }
};

exports.deletePost = async (req,res) => {
    const {postId} = req.params;
    if(!isValidObjectId(postId)){
        return res.status(401).json({error : `Invalid Request !!`});
    }

    const post = await Post.findById(postId).populate("author");

    if(!post){
        return res.status(401).json({error : `Post Not found !!`});
    }

    const user = await User.findOneAndUpdate({_id : post.author._id}, {  $pull : { blogs : postId}});
    await user.save();

    const public_id = post.thumbnail?.public_id;

    if(public_id){
        const {result} = await cloudinary.uploader.destroy(public_id);
        if(result !== "ok"){
            return res.status(404).json({error : `Could not Remove Thumbnail`});
        }
    }

   await Post.findByIdAndDelete(postId);
   await removeFromFeaturedPost(postId);
   res.status(202).json({message : `Post Deleted Succesfully !!`});
};

exports.updatePost = async (req,res) => {

    const { title , meta , content , slug , author , tags , featured}  = req.body;
    const {file} = req;

    const { postId } = req.params;
    if(!isValidObjectId(postId)){
        return res.status(401).json({error : `Invalid Request !!`});
    }

    const post = await Post.findById(postId);
    if(!post){
        return res.status(401).json({error : `Post Not found !!`});
    }

    const public_id = post.thumbnail?.public_id;

    if(public_id && file){
        const {result} = await cloudinary.uploader.destroy(public_id);
        if(result !== "ok"){
            return res.status(404).json({error : `Could not Remove Thumbnail`});
        }
    }

    if(file){
        const { secure_url : url , public_id} = await cloudinary.uploader.upload(
            file.path
        );
        post.thumbnail = {url , public_id};
    }

    post.title = title
    post.meta = meta
    post.slug = slug
    post.content = content
    post.tags = tags
    
    if(featured){
        await addToFeaturedPost(post._id);
    }
    else{
        await removeFromFeaturedPost(post._id);
    }

    await post.save();
    res.status(202).json(
        {post : {id : post._id ,title , content , meta , tags , slug , thumbnail : post.thumbnail?.url , author : post.author,featured}});
};

exports.getSinglePost = async (req,res) => {
    const { postId } = req.params;
    if(!isValidObjectId(postId)){
        return res.status(401).json({error : `Invalid Request !!`});
    }

    const singlePost = await Post.findById(postId).populate('author');

    if(!singlePost){
        return res.status(401).json({error : `Post Not found !!`});
    }

    const featured = await isFeaturedPost(singlePost._id);

    const { title , meta , content , slug , author , tags , createdAt} = singlePost ;

    res.status(200).json({
        Post : {id : singlePost._id , title , content , meta , slug, tags , thumbnail : singlePost.thumbnail?.url , author , featured ,createdAt}
    });
};

exports.getFeturedPosts = async (req,res) => {
    const featuredPosts = await FeaturedPost.find({}).sort({createdAt : -1}).limit(5).populate({path : 'post' , populate: {
        path: "author"
     }});

    res.json({posts : featuredPosts.map(({post}) => {
        return ({
            id : post._id , title : post.title , content : post.content , meta : post.meta , slug : post.slug , tags : post.tags , thumbnail : post.thumbnail?.url , author : post.author
        })
    })
  });
};

exports.getPostByCategory = async (req,res) => {
    const { category } = req.query;
    
    const post = await Post.find({category});

    if(post.length===0){
        return res.status(404).json({error : `Post Not Found`})
    }

    return res.status(200).json({post});
}

exports.getPosts = async (req,res) => {
    const { pageNo = 0 , limit = 10  } = req.query;
    const  posts = await Post.find({}).sort({createdAt : -1}).skip(parseInt(pageNo) * parseInt(limit)).limit(parseInt(limit)).populate("author");
    
    res.status(200).json({posts : posts.map((post) => {
        return ({
            id : post._id , title : post.title , content : post.content , category : post.category , meta : post.meta , slug : post.slug , tags : post.tags , thumbnail : post.thumbnail?.url , author : post.author
        })
    })
  });
};

exports.searchPost = async (req,res) => {
    const { title } = req.query;
    if(!title.trim()){
        return res.status(401).json({error : `Search Querry is Missing !! `});
    }

    const posts = await Post.find({title : {$regex : title , $options : "i"}}).populate("author");

    res.json({posts : posts.map((post) => {
        return ({
            id : post._id , title : post.title , content : post.content , meta : post.meta , slug : post.slug , tags : post.slug , thumbnail : post.thumbnail?.url , author : post.author
        })
      })
    });
};

exports.getRelatedPosts = async (req,res) => {
    try {
        const { postId } = req.params ;

    if(!isValidObjectId(postId)){
        return res.status(401).json({error : `Invalid Request !!`});
    }

    const post = await Post.findById(postId).populate("author");

    if(!post){
        return res.status(401).json({error : `Post Not found !!`});
    }

    const relatedPosts = await Post.find({
        tags : { $in : [...post.tags]},
        _id : { $ne : post._id}
    }).sort({createdAt : -1}).limit(5).populate("author");

    res.json({posts : relatedPosts.map((post) => {
        return ({
            id : post._id , title : post.title , content : post.content , meta : post.meta , slug : post.slug , tags : post.tags , thumbnail : post.thumbnail?.url , author : post.author
        })
      })
    });
    } catch (error) {
        console.log(error);
       return res.status(404).json({error : error}) 
    }
};

exports.uploadImage = async (req,res) => {
    const { file } = req;
    if(!file){
        return res.status(401).json({error : `Image file is Missing !! `});
    }

    const { secure_url : url } = await cloudinary.uploader.upload(file.path);
    res.status(201).json({image : url});
};