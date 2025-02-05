import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import dbconnect from './lib/db.js';
import msgroute from './routes/auth.routes.js';
import mainRoute from './routes/msg.routes.js'
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import User from './models/user.js';
import { tokenGenerate } from './utils/generateToken.js';
import cors from 'cors'
import {app,io,server} from './socket.js'
dotenv.config()
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}))
app.use(cookieParser())
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({limit:'10mb',extended:true}))
app.use(passport.initialize());
app.use("/api/data",mainRoute)
app.use("/api/auth" ,msgroute)
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:"http://localhost:3000/auth/callback/google"
},
async function(accessToken, refreshToken, profile, cb) {
  try{
    let googleId=await profile.id
    let email=await profile.emails&&profile.emails[0]?profile.emails[0].value:null
    let name=profile?.displayName
    let picture=await profile.photos&&profile.photos[0]?profile.photos[0].value:null
  let user=await User.findOne({googleId:googleId})
  if(!user){
    user=await User.create({
      googleId:googleId,
      username:name,
      email:email,
      imgUrl:picture
    })
  }
  return cb(null,user._id)
}catch(err){
  return cb(err,null)
}
}
))
app.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
app.get('/auth/callback/google', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  async function(req, res) {
    try{
    let userId=req.user;
    await tokenGenerate(userId,res)
    res.redirect('http://localhost:5173');
    }catch(err){console.log(err.message)}
  });
server.listen(3000,async()=>{
    try{
    await dbconnect()
    }catch(err){
        console.log(err.message)
    }
    
})
