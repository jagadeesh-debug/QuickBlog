const express = require("express")
const verifyToken = require("../../MiddleWare/verifytoken")
const {createPost , getAllposts, updatePost, DeletePost, getMyPosts,SearchPost} = require("./../postRoutes/route")
require('dotenv').config()

const router = express.Router()

router.post("/create",verifyToken,createPost)
router.put("/:id",verifyToken,updatePost)
router.get("/search",SearchPost)
router.delete("/:id",verifyToken,DeletePost)
router.get("/read",getAllposts)
router.get("/mine",verifyToken,getMyPosts);
module.exports=router