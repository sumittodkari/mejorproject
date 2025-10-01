const express =require("express");
const app = express(); 
const ejs = require("ejs");  
const mongoose =require("mongoose");
const Listing=require("./models/listings.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema ,reviewSchema} = require("./schema.js");
const reviews=require("./models/reviews.js");
const listings = require("./routes/listing.js");
const wrapAsync=require("./utils/wrapAsync.js");
const reviews = require("./routes/review.js");

app.use(methodOverride('_method'));
app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("method-Override"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
 



const MANGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(MANGO_URL);
    
};


app.listen(8080,()=>{
    console.log("port is listning throught port 8080");
});
 
app.get ("/",(req,res)=>{
    res.send("working");
}); 






app.use((err,req,res,next)=>{
    let {statuscode=500 ,message="somthing went wrong!"} = err;
    res.status(statuscode).render("error.ejs",{message});

   

});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

 

 


  














// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1200,
//         location:"calengat,goa",
//         country:"india",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfull");
//     });