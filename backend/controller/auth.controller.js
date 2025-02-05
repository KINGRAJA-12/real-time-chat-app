import { tokenGenerate } from '../utils/generateToken.js';
import User from './../models/user.js';

export const Register=async (req,res,next)=>{
    try{
    let {name:username,email,password,phone}=req.body;
    if((!username)||(!email)||(!password)||(!phone)){
        return res.status(400).json({message:"all field require"});
    }
    if(password.length<8){
        return res.status(400).json({message:"password must grater then 7"});
    }
    if(phone.length!==10){
        return res.status(400).json({message:"context number length must be 10"});
    }
    let user=await User.findOne({email:email})
    if(user){
        return res.status(400).json({message:"email already taken"});
    }
    user=await User.create({username,email,password,phone});
    return res.status(201).json({user})
    
    
}catch(err){
    return res.status(500).json({message:err.message})
}
    
}
export const Login=async(req,res,next)=>{
    try{
    let {email,password}=req.body;
    if((!email)||(!password)){
        return res.status(400).json({message:"all field require"})
    }
    let user=await User.findOne({email:email})
    if(!user){
        return res.status(400).json({message:"no user found"})
    }
    let isMatch=user.compare(password)
    if(!isMatch){
        return res.status(400).json({message:"invalid password"})
    }
    await tokenGenerate(user._id,res)
    console.log(res.cookie.jwt)

    return res.status(200).json({user})
    
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
export const getMe=async(req,res,next)=>{
    try{
        let user=req.user;
        if(!user){
            return res.status(400).json({message:"user no found"})
        }
        return res.status(200).json({user})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
export const Logout=async(req,res,next)=>{
    try{
        res.cookie('jwt',"",{maxAge:0})
        return res.status(200).json({message:"logout su"})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
