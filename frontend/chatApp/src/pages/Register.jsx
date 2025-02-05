import React from 'react'
import {EyeClosed,Eye} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useAuth from './../others/useAuth.jsx'

const Register = () => {
  let [eye,setEye]=useState(false)
      let handleEye=()=>{
          setEye(!eye)
      }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let {isRegister,register}=useAuth()
  let [name,setName]=useState('')
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  let [phone,setPhone]=useState('')
  let handleSubmit=async(e)=>{
    e.preventDefault()
    try{
    if(name.length===0)return toast.error("name required");
    if(!emailRegex.test(email))return toast.error("invalid email")
    if(password.length<8)return toast.error("require atleast 8 character")
    if(phone.length!==10)return toast.error("invalid context number")
      console.log(name+" "+email+" "+phone+" "+password)
    await register({name,email,password,phone})
    }catch(err){toast.error(err.message)}
  finally{
    setName('')
    setEmail('')
    setPhone('')
    setPassword('')
  }}
  return (
    <>
    <div className="heading relative">
      <div className="sm:w-[400px] h-3/4 w-full flex flex-col bg-gradient-to-br  rounded-3xl shadow-md shadow-gray-500/100 brightness-110 hover:opacity-90 mb-10">
        <h1 className='font-mono text-[40px] text-center font-bold '>Register</h1>
        <div className='flex flex-col justify-center p-5 w-[100%] h-[15%]'>
        <label htmlFor='username' className='rlabel'>Username</label>
        <input type="text" placeholder='Enter name..' value={name} className='p-2 rounded-md border-none hover:border-none h-10 focus:border-none focus:outline-none' autoComplete='off' onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className='flex flex-col justify-center p-5 w-[100%] h-[15%]'>
        <label htmlFor='email' className='rlabel'>Email</label>
        <input type="text" autoComplete='off' value={email} placeholder='Enter name..' onChange={(e)=>{setEmail(e.target.value)}} className='p-2 rounded-md  border-none h-10 focus:border-solid focus:border-2  focus:outline-none'/>
        </div>
        <div className='flex flex-col justify-center p-5 w-[100%] h-[15%]'>
        <label htmlFor='context' className='rlabel'>Context</label>
        <input type="text" placeholder='Enter context number..' value={phone} className='p-2 rounded-md z border-none  h-10   focus:outline-none' onChange={e=>{setPhone(e.target.value)}}/>
        </div>
        <div className='flex flex-col justify-center p-5 w-[100%] h-[15%]'>
        <label htmlFor="password" className='rlabel'>password</label>
        <div className='relative h-10'><input type={eye?"text":"password"} value={password} placeholder='Enter passowrd..'  onChange={e=>{setPassword(e.target.value)}} className='p-2 rounded-md  border-none  h-full w-full  focus:outline-none'/><button className='absolute top-2 right-2 text-white' onClick={handleEye}>{eye?<Eye/>:<EyeClosed/>}</button></div>
        </div>
        <div className='flex flex-col justify-center items-center p-2 w-[100%] h-[20%]'>
        <button className='h-10 w-[80%] rounded-md bg-blue-700 text-white font-mono hover:bg-blue-900 hover:text-lg mt-2' disabled={isRegister} onClick={handleSubmit}>{isRegister?"loading":"Register"}</button>
        </div>
        <span className='text-center '>or</span>
            <span className='text-center  mb-7'>Already have an account <Link to={'/login'}>Login</Link></span>
      </div>
    </div>
 
    </>
  )
}

export default Register
