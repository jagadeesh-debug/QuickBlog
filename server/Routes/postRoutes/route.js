const Post = require("../../Model/PostModel");
require('dotenv').config()


const createPost = async (req, res) => {
  try {  
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required fields" });
    }
    
    const postData = {
      ...req.body,
      user: req.userId,
    };
    
    if (typeof req.body.tags === 'string' && req.body.tags.trim()) {
      postData.tags = req.body.tags.split(',').map(tag => tag.trim());
    }
    
    const post = new Post(postData);
    const savedPost = await post.save();
    
    return res.status(201).json({ 
      success: true,
      message: "Post created successfully", 
      id: savedPost._id,
      post: savedPost 
    });
  } catch (err) {
    console.error("Post creation error details:", err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: Object.values(err.errors).map(e => e.message)
      });
    }
    
    return res.status(500).json({ 
      message: "Server Error", 
      error: err.message 
    });
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
//get my posts
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user');
    return res.status(200).json({ message: "User's posts fetched", posts });
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};
//search posts
const SearchPost = async(req,res)=>{
  
    const {q}= req.query;
    if(!q)  
      return res.status(400).json({error:"please enter any thing to proceed search"})
    try{
          const post = await Post.find({
            title:{$regex:q , $options:"i" },
          })
          res.status(200).json(post)
    }
    catch(err){
      return res.status(500).json({error:"Server Error"});
    }
}
module.exports = { createPost, getAllposts , updatePost , DeletePost ,  getMyPosts  , SearchPost};
