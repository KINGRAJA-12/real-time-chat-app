import express from 'express';
import { Register, Login, getMe, Logout} from '../controller/auth.controller.js';
import { Protected } from '../utils/prourl.js';

const msgroute=express.Router()
msgroute.post("/register",Register)
msgroute.post("/login",Login)
msgroute.get("/logout",Logout)
msgroute.get("/getuser",Protected,getMe)
export default msgroute
