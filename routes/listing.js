const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const { listingSchema ,reviewSchema} = require("../schema.js");
const Listing=require("../models/listings.js");
const ExpressError=require("../utils/ExpressError.js");



 
const validateListing = (req,res,next) => {
let {error}= listingSchema.validate(req.body);
 
   if(error){
   let errmsg = error.details.map((el) =>el.message).join(",");

    throw new ExpressError(400,errmsg);
   }else{
    next();
   }
};



//index route
router.get("/",wrapAsync(async(req,res)=>{
   let allListings = await Listing.find({}) 
   res.render("listings/index.ejs",{allListings});   
}));
// new route

router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");

});
 
//show route 
router.get("/:id",wrapAsync(async(req,res)=>{
     let {id}=req.params;
     const listing = await Listing.findById(id).populate("reviews");
     res.render("listings/show.ejs",{listing});
}));


// create route
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
   
   const newListing = new Listing (req.body.listing);
     
    await newListing.save();
   res.redirect("/listings"); 
    
}));
// Edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});


}));
// update route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
      
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{ ...req.body.listing});
    res.redirect("/listings");
    
}));

// delete route
router.delete("/:id",wrapAsync(async(req,res)=>{
   let {id}=req.params;
   let deleteListing=await Listing.findByIdAndDelete(id);
   console.log (deleteListing);
   res.redirect("/listings");
}));


module.exports= router;
