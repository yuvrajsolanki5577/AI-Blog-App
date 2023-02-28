const express = require("express");
const { createPost, deletePost, updatePost, getSinglePost, getFeturedPosts, getPosts, searchPost, getRelatedPosts, uploadImage, getPostByCategory } = require("../controllers/post");
const { parseData } = require("../middlewares");
const { verify } = require("../middlewares/Authentication");
const multer = require("../middlewares/multer");
const { postValidators, validate } = require("../middlewares/postValidator");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs API
 *   description: Blog Managing API
 * /api/post/create:
 *   post:
 *     summary: Create New Post
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/Users.js'
 *     responses:
 *       200:
 *         description: User Registration Successfull !!.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../models/Users.js'
 *       500:
 *         description: Some server error
 * /api/post/{id}:
 *   get:
 *     summary: Get Post By Id
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Get Post By Id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No Post Found
 *   put:
 *    summary: Update Post by id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Blog of Id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The blog was updated Successfull
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Delete Post by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
*
 *     responses:
 *       200:
 *         description: The blog was deleted Successfull
 *       404:
 *         description: The blog was not found
 * /api/post/posts:
 *   get:
 *     summary: Get All Posts
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Get All Posts
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No Post Found
 * /api/post/featured-post:
 *   get:
 *     summary: Get featured Post 
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Get featured Post By Id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No Post Found
 * /api/post/category/{category Name}:
 *   get:
 *     summary: Get Post By Category Name
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Get Post By Category Name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No Post Found
 * /api/post/search:
 *   get:
 *     summary: Search Post By Name
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Get Post By Name
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No Post Found
 * /api/post/related-post/{id}:
 *   get:
 *     summary: Get Related Post By Id
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Get Realated Post By Id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No Post Found
 * /api/post/upload-image:
 *   post:
 *     summary: Upload Image and get Cloudinary URL
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Upload Image and get Cloudinary URL
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: No Post Found
 */

router.post("/create", verify , multer.single('thumbnail'), parseData , postValidators , validate , createPost);
router.put("/:postId",verify ,multer.single('thumbnail'), parseData , postValidators , validate ,updatePost);
router.delete("/:postId" ,verify , deletePost);
router.get("/single/:postId",getSinglePost);
router.get("/featured-posts",getFeturedPosts);
router.get("/category/:category",getPostByCategory);
router.get("/posts",getPosts);
router.get("/search",searchPost);
router.get("/related-posts/:postId",getRelatedPosts);
router.post("/upload-image",verify , multer.single('profile'),uploadImage);

module.exports = router;