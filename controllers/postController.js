const Post = require("../models/postModel");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "success",

      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.createPost = async (req, res, next) => {
  const { title, body } = req.body;
  try {
    const savedPost = await new Post({
      title: title,
      body: body,
    }).save();

    res.status(201).json({
      status: "success",

      data: {
        savedPost,
      },
    });
  } catch (error) {
    res.status(422).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res, next) => {
  const { title, body } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",

      data: {
        updatedPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
