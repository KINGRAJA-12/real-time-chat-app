import Msg from "../models/message.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.CLOUDE_API_KEY, 
    api_secret:process.env.CLOUDE_API_SECRET
  });
export const getAllusers=async(req,res,next)=>{
    try{
        let user=req.user;
        if(!user){
            return res.status(400).json({message:"user no found"})
        }
        let alluser=await User.find({_id:{ $ne:user._id}})
        return res.status(200).json({alluser})
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
export const getConver=async(req,res,next)=>{
    try{
        let data=[]
        let {id:firstId}=req.params
        if(!firstId){
            return res.status(400).json({message:"one id missinng"});
        }
        let secondId=req.user._id
        let msg=await Msg.find({$or:[{senderId:firstId,receiverId:secondId},{senderId:secondId,receiverId:firstId}]})
        let receiver=await User.findById(firstId);
        let receivername=receiver.username

       for(let value of msg){
            
            data.push({text:value.text,image:value.image,sender:value.senderId})
            
           
        }
      
        return res.status(200).json({data:data,name:receivername})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
export const sendMsg=async(req,res,next)=>{
    try{
        let imgUrl=null;
        let{id:receiverId}=req.params
        if(!receiverId){
            return res.status(400).json({message:"id missing"})
        }
        let senderId=req.user._id
        let {text,image}=req.body
        if(image){
            let data=await cloudinary.uploader.upload(image)
            imgUrl=data.secure_url
        }
        let newmsg=await Msg.create({senderId,receiverId,text:text||null,image:imgUrl||null})
        return res.status(200).json({newmsg})

    }catch(err){
        return res.status(500).json({message:err.message})
    }
}
export const updateProfile=async(req,res,next)=>{
    try{
        let userId=req.user._id
        let user=await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"user data not found to update profile"})
        }
        let {img}=req.body
        if(!img){
            return res.status(400).json({message:"profile image is missing"})
        }
        let url=await cloudinary.uploader.upload(img)
        if(!url){
            return res.status(500).json({message:"url not found"})
        }
        let imgUrl= url.secure_url
         user.imgUrl=imgUrl
        await user.save()
        return res.status(200).jsonS({message:"profile uploaded successfully"})

    }catch(err){
        return res.status(500).status({message:err.message})
    }
}
export const searchUser=async(req,res,next)=>{
    try{
        let id=req.user._id
        let user=await User.find({$and:[{username:{
            $regex:req.query.name,
            $options:"i"
        }},{_id:{$ne:id}}]})
        return res.status(200).json(user);

    }catch(err){
        return res.status(500).json({message:err.message})
    }
}