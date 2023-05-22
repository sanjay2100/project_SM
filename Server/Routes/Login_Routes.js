const mongoose=require('mongoose')
const User=require('../Schemas/Login_Schema')
const express=require('express')
const cookie=require('cookie-parser')
const jwt=require('jsonwebtoken')
const { findById } = require('../Schemas/Files_Schema')






const Authrouter=require('express').Router()


Authrouter.use(cookie())

const CreateToken=(id)=>{
return jwt.sign({id},"SanjayMediaSecret@mysecret&&yoursecret")
}

const CreateToken2=(id)=>{
    return jwt.sign({id},"SanjayMediaSecret@mysecret&&yoursecret")
    }



Authrouter.post('/Register',async(req,res)=>{
    const{Email,Password,userName}=req.body
    const user= await User.findOne({"Email":Email})
    if(!user){
        {try{
            console.log(Email+" "+Password);
            const data=await  User.create({
            Email,
            Password,
            userName
        })
        const Token=CreateToken(data._id)
        res.cookie('jwt1',Token,{httpOnly:false})
    
        res.json("User added")
    }
    catch(error){
        res.json(error)
        
    }}
    }
    else{
        res.json("User already exist")
    }
})

Authrouter.post('/Login',async(req,res)=>{
    const{Email,Password}=req.body
   try{
    const user=await User.login(Email,Password)
    //console.log("data from auth"+user);
    const Token=CreateToken2(user._id)
    res.cookie("jwt1",Token)
    res.json("Login success")
   }
   catch(error){
    res.json(error.message)
   }
})

Authrouter.get('/user/:id',async(req,res)=>{
    const id=req.params.id
    try{
        const data=await User.findById(id)
        res.json(data)
    }
    catch(error){
        res.json(error)
    }
})


module.exports=Authrouter;