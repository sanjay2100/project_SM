const mongoose=require('mongoose')
const express=require('express')


const Youtube=new mongoose.Schema({
    Name:String,
    Desc:String,
    views:Number,
    filename:String,
    originalname:String,
    mimetype:String,
    path:String,
    Link:String,
})


module.exports=mongoose.model("YTvideos",Youtube)