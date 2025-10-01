const express = require("express");
const router = express.Router();

//index 
router.get("/",(req,res)=>{
    res.send("get for posts");
});

//show
router.get("/:id",(req,res)=>{
    res.send("get for posts id");
});

//post 
router.post("/:id",(req,res)=>{
    res.send("post for posts");
});

//delete 
router.delete("/:id",(req,res)=>{
    res.send("delete for post id");
});
module.exports= router;
