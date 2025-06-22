const express = require("express")
const verifyToken = require("../../MiddleWare/verifytoken")
const {createPost , getAllposts, updatePost, DeletePost} = require("./../postRoutes/route")
require('dotenv').config()

const router = express.Router()

router.post("/",verifyToken,createPost)
router.put("/:id",verifyToken,updatePost)
router.delete("/:id",verifyToken,DeletePost)
router.get("/",getAllposts)

module.exports=router