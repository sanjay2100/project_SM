const express=require('express')
const mongoose=require('mongoose')



const File_Schema=new mongoose.Schema({
    Name:String,
    Email:String,
    Desc:String,
    Files: [{
        fieldName: String,
        filename:String,
        originalName: String,
        mimeType: String,
        path: String,
        
      }],
    

})


module.exports=mongoose.model("File",File_Schema)