const Post = require("../models/posts");
const User = require("../models/users.js");
const FeaturedPost = require("../models/featuredPost");
const cloudinary = require("../cloud");
const { isValidObjectId } = require("mongoose");

const addToFeaturedPost = async (postId) => {
  const isAlreadyExists = await FeaturedPost.findOne({ post: postId });

  if (isAlreadyExists) {
    return;
  }

  const FEATURED_POSTS_COUNT = 5;

  const featuredPost = new FeaturedPost({ post: postId });
  await featuredPost.save();

  const featuredPosts = await FeaturedPost.find({}).sort({ createdAt: -1 });
  featuredPosts.forEach(async (post, index) => {
    if (index >= FEATURED_POSTS_COUNT) {
      await FeaturedPost.findByIdAndDelete(post._id);
    }
  });
};

const removeFromFeaturedPost = async (postId) => {
  await FeaturedPost.findOneAndDelete({ post: postId });
};

const isFeaturedPost = async (postId) => {
  const post = await FeaturedPost.findOne({ post: postId });
  return post ? true : false;
};

exports.createPost = async (req, res) => {
  try {
    const { title, meta, content, slug, tags, category, featured } = req.body;
    const author = req.User_id;
    const { file } = req;

    const isAlreadyExists = await Post.findOne({ slug });

    if (isAlreadyExists) {
      return res
        .status(400)
        .json({
          error: `Please Use Unique Slug , this Slug is Already Exists`,
        });
    }

    const newPost = new Post({
      title,
      meta,
      category,
      content,
      slug,
      author,
      tags,
    });

    if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path
      );
      newPost.thumbnail = { url, public_id };
    }

    await newPost.save();

    const user = await User.findByIdAndUpdate(
      { _id: author },
      { $push: { blogs: newPost._id } }
    );
    await user.save();

    if (featured) {
      await addToFeaturedPost(newPost._id);
    }

    res.json({
      post: {
        id: newPost._id,
        title,
        category,
        content,
        meta,
        slug,
        thumbnail: newPost.thumbnail?.url,
        author: newPost.author,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isValidObjectId(postId)) {
      return res.status(400).json({ error: `Invalid Request !!` });
    }

    const post = await Post.findById(postId).populate("author");

    if (!post) {
      return res.status(404).json({ error: `Post Not found !!` });
    }

    const user = await User.findOneAndUpdate(
      { _id: post.author._id },
      { $pull: { blogs: postId } }
    );
    await user.save();

    const public_id = post.thumbnail?.public_id;

    if (public_id) {
      const { result } = await cloudinary.uploader.destroy(public_id);
      if (result !== "ok") {
        return res.status(500).json({ error: `Could not Remove Thumbnail` });
      }
    }

    await Post.findByIdAndDelete(postId);
    await removeFromFeaturedPost(postId);
    res.status(200).json({ message: `Post Deleted Succesfully !!` });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, meta, content, slug, author, tags, featured } = req.body;
    const { file } = req;

    const { postId } = req.params;
    if (!isValidObjectId(postId)) {
      return res.status(400).json({ error: `Invalid Request !!` });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: `Post Not found !!` });
    }

    const public_id = post.thumbnail?.public_id;

    if (public_id && file) {
      const { result } = await cloudinary.uploader.destroy(public_id);
      if (result !== "ok") {
        return res.status(500).json({ error: `Could not Remove Thumbnail` });
      }
    }

    if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path
      );
      post.thumbnail = { url, public_id };
    }

    post.title = title;
    post.meta = meta;
    post.slug = slug;
    post.content = content;
    post.tags = tags;

    if (featured) {
      await addToFeaturedPost(post._id);
    } else {
      await removeFromFeaturedPost(post._id);
    }

    await post.save();
    res
      .status(202)
      .json({
        post: {
          id: post._id,
          title,
          content,
          meta,
          tags,
          slug,
          thumbnail: post.thumbnail?.url,
          author: post.author,
          featured,
        },
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!isValidObjectId(postId)) {
      return res.status(400).json({ error: `Invalid Request !!` });
    }

    const singlePost = await Post.findById(postId).populate("author");

    if (!singlePost) {
      return res.status(404).json({ error: `Post Not found !!` });
    }

    const featured = await isFeaturedPost(singlePost._id);

    const { title, meta, content, slug, author, tags, createdAt } = singlePost;

    res.status(202).json({
      Post: {
        id: singlePost._id,
        title,
        content,
        meta,
        slug,
        tags,
        thumbnail: singlePost.thumbnail?.url,
        author,
        featured,
        createdAt,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.getFeturedPosts = async (req, res) => {
  try {
    const featuredPosts = await FeaturedPost.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: "post",
        populate: {
          path: "author",
        },
      });

    res.json({
      posts: featuredPosts.map(({ post }) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          meta: post.meta,
          slug: post.slug,
          tags: post.tags,
          thumbnail: post.thumbnail?.url,
          author: post.author,
        };
      }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.getPostByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const posts = await Post.find({ category }).populate("author");

    if (posts.length === 0) {
      return res.status(404).json({ error: `Post Not Found` });
    }

    res.status(200).json({
      posts: posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          category: post.category,
          meta: post.meta,
          slug: post.slug,
          tags: post.tags,
          thumbnail: post.thumbnail?.url,
          author: post.author,
        };
      }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { pageNo = 0, limit = 10 } = req.query;
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(parseInt(pageNo) * parseInt(limit))
      .limit(parseInt(limit))
      .populate("author");

    res.status(200).json({
      posts: posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          category: post.category,
          meta: post.meta,
          slug: post.slug,
          tags: post.tags,
          thumbnail: post.thumbnail?.url,
          author: post.author,
          date: post.createdAt,
        };
      }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.searchPost = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title.trim()) {
      return res.status(400).json({ error: `Search Querry is Missing !! ` });
    }

    const posts = await Post.find({
      title: { $regex: title, $options: "i" },
    }).populate("author");

    res.json({
      posts: posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          meta: post.meta,
          slug: post.slug,
          tags: post.slug,
          thumbnail: post.thumbnail?.url,
          author: post.author,
        };
      }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.getRelatedPosts = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) {
      return res.status(400).json({ error: `Invalid Request !!` });
    }

    const post = await Post.findById(postId).populate("author");

    if (!post) {
      return res.status(404).json({ error: `Post Not found !!` });
    }

    const relatedPosts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author");

    res.json({
      posts: relatedPosts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          meta: post.meta,
          slug: post.slug,
          tags: post.tags,
          thumbnail: post.thumbnail?.url,
          author: post.author,
        };
      }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: `Image file is Missing !! ` });
    }

    const { secure_url: url } = await cloudinary.uploader.upload(file.path);
    res.status(200).json({ image: url });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error.message,
        message: "Internal Server Error",
        success: false,
      });
  }
};
