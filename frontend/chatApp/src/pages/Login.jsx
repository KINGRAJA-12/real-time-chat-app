import React from 'react'
import {EyeClosed,Eye} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../others/useAuth'

const Login = () => {
    let [eye,setEye]=useState(false)
    let handleEye=()=>{
        setEye(!eye)
    }
    let {isLogin,login}=useAuth()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  let handleSubmit=async(e)=>{
    e.preventDefault()
    try{
    if(!emailRegex.test(email))return toast.error("invalid email")
    if(password.length<8)return toast.error("require atleast 8 character")
    await login({email,password})
    }catch(err){toast.error(err.message)}
  finally{
    setEmail('')
    setPassword('')
  }}
  return (
   <>
   <div className="heading">
  <div className="card">
    <h1 className='font-mono text-[50px] text-center m-4 font-bold'>Login</h1>
    <div className='flex flex-col justify-center p-5 w-[100%] h-[20%]'>
        <label htmlFor='email' className='label'>email</label>
        <input type="text" placeholder='Enter email..' value={email} className='p-2 rounded-md  border-none hover:border-none h-10 ' onChange={e=>{setEmail(e.target.value)}}/>
    </div>
    <div className='flex flex-col justify-center p-5 w-[100%] h-[20%]'>
        <label htmlFor="password" className='label'>password</label>
        <div className='relative h-10'><input type={eye?"text":"password"} placeholder='Enter passowrd..' value={password} onChange={e=>{setPassword(e.target.value)}}   className='p-2 rounded-md border-none  h-full w-full outline-none'/><button className='absolute top-2 right-2' onClick={handleEye}>{eye?<Eye/>:<EyeClosed/>}</button></div>
    </div>
    <div className='flex flex-col justify-center items-center p-5 w-[100%] h-[20%]'>
        <button className='h-10 w-[80%] rounded-md text-white bg-blue-700 font-mono hover:bg-blue-900 hover:text-lg mb-2' onClick={handleSubmit}>Login</button>
       <a href="http://localhost:3000/auth/google" className='w-[80%]'><button className='text-white h-10 w-[100%] rounded-md bg-red-700  font-mono hover:bg-red-900 hover:text-lg mt-1'><i className='fab fa-google'></i> continue with google</button></a> 
    </div>
    <span className='text-center '>or</span>
    <span className='text-center mb-7'>Don't have an account <Link to={'/register'}>Register</Link></span>
  </div>
</div>

   </>
  )
}

export default Login


