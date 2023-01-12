const express = require("express");
const { createPost, deletePost, updatePost, getSinglePost, getFeturedPosts, getPosts, searchPost, getRelatedPosts, uploadImage } = require("../controllers/post");
const { parseData } = require("../middlewares");
const { verify } = require("../middlewares/Authentication");
const multer = require("../middlewares/multer");
const { postValidators, validate } = require("../middlewares/postValidator");
const router = express.Router();

router.post("/create", verify , multer.single('thumbnail'), parseData , postValidators , validate , createPost);
router.put("/:postId",verify ,multer.single('thumbnail'), parseData , postValidators , validate ,updatePost);
router.delete("/:postId" ,verify , deletePost);
router.get("/single/:postId",getSinglePost);
router.get("/featured-posts",getFeturedPosts);
router.get("/posts",getPosts);
router.get("/search",searchPost);
router.get("/related-posts/:postId",getRelatedPosts);
router.post("/upload-image",verify , multer.single('image'),uploadImage);

module.exports = router;