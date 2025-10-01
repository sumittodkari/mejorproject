const mongoose = require("mongoose");
const initData = require("./data.js");
const  Listing=require("../models/listings.js");

const MANGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(MANGO_URL);
    
}
const initDB =async () =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();
