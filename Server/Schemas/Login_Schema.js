const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


const UserSchema=new mongoose.Schema({
    Email:String,
    Password:String,
    userName:String
})

//Pwd hashing


UserSchema.pre("save", async function(next){
const salt= await bcrypt.genSalt()
this.Password = await bcrypt.hash(this.Password,salt)
next()
})



UserSchema.statics.login=async function (Email,Password,next){
    const data= await this.findOne({Email});
    //console.log(data);
    if(data){
        const Auth= await bcrypt.compare(Password,data.Password)
            if(Auth){
                
                return data
            
            }
            else{
                throw Error("Incorrect Password")
        }
    
        
    }
    else{
        throw Error("No such user")
    }
}



module.exports=mongoose.model("Register",UserSchema)