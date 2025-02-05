import mongoose from "mongoose";
import User from "./user.js";
let messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'User',
        require:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'User',
        require:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true})
let Msg=mongoose.model('Msg',messageSchema)
export default Msg