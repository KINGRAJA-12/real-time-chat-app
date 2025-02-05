import express from 'express';
import { getAllusers, getConver, searchUser, sendMsg, updateProfile } from '../controller/msg.controller.js';
import { Protected } from '../utils/prourl.js';
const mainRoute=express.Router()
mainRoute.get("/getAlluser",Protected,getAllusers)
mainRoute.get("/getConvmsg/:id",Protected,getConver)
mainRoute.post("/sendmsg/:id",Protected,sendMsg)
mainRoute.post("/update-profile",Protected,updateProfile)
mainRoute.get("/searchmsg",Protected,searchUser)
export default mainRoute
