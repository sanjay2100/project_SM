const mongoose=require('mongoose')


const LikeSchema=new mongoose.Schema({
    
    likedId:String,
    Email:String
})


module.exports=mongoose.model("Likes",LikeSchema)