import jwt from 'jsonwebtoken';
export const tokenGenerate=async(userid,res)=>{
    let token=await jwt.sign({id:userid},process.env.SECRET_KEY)
    await res.cookie("jwt",token,{httpOnly:true,secure:false,maxAge:7*24*60*60*1000})
}