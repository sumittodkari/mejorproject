const express = require("express");
const app = express(); 
const flash = require("connect-flash");
const user =require("./routes/user.js");
const posts=require("./routes/posts.js");
const session = require("express-session");
const sessionOptions = {
    secret:"mysupersecretstring",
    resave:false, saveUninitialized:true};
const path = require("path");


app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views")); 
app.use(session(sessionOptions)); 
app.use(flash());

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    req.flash("success","your register successfully");
    res.redirect("/hello");
    
});
 

app.listen(3000,()=>{
    console.log("server is listening throught 3000");
});

app.get("/hello" ,(req,res) =>{
    
    res.render("page.ejs",{name:req.session.name,message:req.flash("success") } );
    
});

 



// app.get("/test",(req,res)=>{
//     res.send("test successfull");
// });

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//        req.session.count++; 
//     }else{
//          req.session.count = 1;
//     }
    
  
//     res.send(`you send a requist ${req.session.count} times`);
// });
 