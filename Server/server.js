const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const Register=require('./Routes/Login_Routes')
const cookieParser=require('cookie-parser')
const FileUpload=require('./Routes/Files_route')
const Youtube=require('./Routes/Youtube_Route')
const Like_router = require('./Routes/Like_route')

const app=express()


app.use(express.static('Uploads')); // serve files from the 'public' directory



mongoose.connect('mongodb://0.0.0.0:27017/SM_Db',console.log("connected to DB"))



app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST","PUT","DELETE","PATCH"],
      credentials: true
    })
  );
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/Auths',Register)
app.use('/Upload',FileUpload)
app.use('/YoutubeUpload',Youtube)
app.use('/Like',Like_router)





app.listen(3001,console.log("Port connected through 3001"))