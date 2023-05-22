const mongoose=require('mongoose')
const { find } = require('../Schemas/Like_Schema')
const Likes=require('../Schemas/Like_Schema')
const Like_router=require('express').Router()


Like_router.post('/video',async(req,res)=>{
    const {id,Email}=req.body
    const data=new Likes({
        
        likedId:id,
        Email:Email
    })

    try {
        const existingLike = await Likes.findOne({ likedId: id, Email: Email });
    
        if (existingLike) {
          await Likes.findByIdAndDelete(existingLike._id);
          res.json("Like Removed");
        } else {
          await data.save();
          res.json("Like Added");
        }
      } catch (error) {
        res.json(error);
      }

    
})

Like_router.post('/likedVideos',async(req,res)=>{
    const id=req.body.id
    const Email=req.body.Email
    try{
        const existingLike = await Likes.findOne({ likedId: id, Email: Email });
        const numberOfLikes=await Likes.find({"likedId":id})

        if(existingLike){
            res.json({message:"Liked",Likecount:numberOfLikes.length})
        }
        else{
            res.json("Not Liked")
        }
    }
    catch(error){
        res.json(error)
    }

})

module.exports=Like_router