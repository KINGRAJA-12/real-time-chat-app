import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export const Protected=async(req,res,next)=>{
    try{
        console.log("protected called")
        let token=await req.cookies?.jwt;
        if(!token){
            return res.status(400).json({message:"unauthorized"})
        }
        let data=jwt.verify(token,process.env.SECRET_KEY)
        if(!data){
             return res.status(400).json({message:"token not found in protection"})
         }
         let user=await User.findById(data.id);
         if(!user){
             return res.status(400).json({message:"no user found in token"})
         }
         req.user=user;
         next()
    }catch(err){
        return res.status(500).json({message:err.message})
    }

}