import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
let userschema=mongoose.Schema({
    googleId:{
        type:String
    },
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:false,
    },
    imgUrl:{
        type:String,
        require:false
    },
    phone:{
        type:String,
        require:false
    }
},{timestamps:true});
userschema.pre("save",async function(next){
    if(!this.isModified('password')){
        return next();
    }
    let salt=await bcrypt.genSalt(10);
    let hashedPassword=await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
    
})
userschema.methods.compare=async function(password){
    return await bcrypt.compare(password,this.password,);
}
let User=mongoose.model('User',userschema);
export default User