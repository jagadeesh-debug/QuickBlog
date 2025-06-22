const Post = require("../../Model/PostModel");
require('dotenv').config()


const createPost = async (req, res) => {
   console.log("CreatePost controller hit");
  console.log("req.userId:", req.userId);
  console.log("req.body:", req.body);
  try {
    const post = new Post({
      ...req.body,
      user: req.userId,
    });
    await post.save();
   return  res.status(200).json({ message: "Created Successfully", post });
  } catch (err) {
    console.error(err);
   return  res.status(500).json({ message: "Server Error" });
  }
};

const getAllposts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user');
   return res.status(200).json({ message: "Fetched all the posts", posts });
  } catch (err) {
  return  res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const updatePost = async(req,res)=>{
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // only allow updating own posts
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }
    return res.status(200).json({ message: "Post updated", updatedPost });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

// Delete Post by ID
const DeletePost = async(req,res)=>{
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found or unauthorized" });
    }
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
module.exports = { createPost, getAllposts , updatePost , DeletePost };
