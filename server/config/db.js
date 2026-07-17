const mongoose =require("mongoose");

const connectdb=async()=>{
    try
    {
        await mongoose.connect("mongodb://localhost:27017/qwendb");
        console.log("mongdb connected");
    }
    catch(err)
    {
       console.log(err);
    }
}
module.exports=connectdb;