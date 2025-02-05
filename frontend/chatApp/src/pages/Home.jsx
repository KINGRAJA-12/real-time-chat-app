import React, { useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import Message from './Message'
import { Outlet } from 'react-router-dom'
import useSocket from '../others/useSocket'
import useAuth from '../others/useAuth'
const Home = () => {
  let {getConnect}=useSocket()
  let {isAuth}=useAuth()
  useEffect(()=>{
    getConnect(isAuth._id)
  },[])
  return (
    <div className='heading w-[100%] h-[100%] fixed'>
      <div className='h-full md:w-1/3 w-1/2 '><Sidebar/></div><div className=' h-full md:w-2/3 w-1/2'><Outlet/></div>
    </div>
  )
}
export default Home
