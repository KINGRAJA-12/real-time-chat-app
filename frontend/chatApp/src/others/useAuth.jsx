import {create} from 'zustand'
import axiosInstance from './axiosInstancs.js'
import toast from 'react-hot-toast'
import axios from 'axios'
let useAuth=create((set)=>({
    isAuth:null,
    isRegister:false,
    isLogin:false,
    isGetAlluser:false,
    isGetConversion:false,
    isLogout:false,
    isUpdate:false,
    allMsg:undefined,
    isSend:false,
    register:async(data)=>{
        try{
            set({isRegister:true})
            let res=await axiosInstance.post("/auth/register",data)
            toast.success("user register successfull")
        }catch(err){
            toast.error(err.response?.data?.message)
        }finally{
            set({isRegister:false})
        }
    },
    login:async(data)=>{
        try{
        set({isLogin:true})
        let res=await axiosInstance.post("/auth/login",data)
        console.log(res)
        set({isAuth:res.data?.user})
        toast.success("login successfull")
        }
        catch(err){
            toast.error(err.response?.data?.message)
            
        }
        finally{
            set({isLogin:false})
        }
            
    },
   getme:async()=>{
        try{
            console.log("get me called")
            let res=await axiosInstance.get("/auth/getuser")
            set({isAuth:res.data?.user})
        }
        catch(err){
            console.log(err.message)
        }
    },
    logout:async()=>{
        try{
            set({isLogout:true})
            let res=await axiosInstance.get("/auth/logout")
            if(res.status===200){
                set({isAuth:null})
                toast.success("logout successfully")
            }
        }catch(err){
            console.log(err)
            toast.error(err.response?.data?.message)
        }finally{
            set({isLogout:false})
        }
    },
    update:async(img)=>{
        try{
            set({isUpdate:true})
            let res=await axiosInstance.post("/data/update-profile",{img})
            if(res.status===200){
                toast.success("profile updated successfully")
            }
        }catch(err){
            toast.error(err.response?.data?.message)
        }finally{
            set({isUpdate:false})
        }
    },
    addTodb:async(data,id)=>{
        try{
            set({isSend:true})
            let res=await axiosInstance.post(`/data/sendmsg/${id}`,data);
            
        }catch(err){
            toast.error(err?.response?.data?.message)
        }finally{
            set({isSend:false})
        }
    }


}))
export default useAuth