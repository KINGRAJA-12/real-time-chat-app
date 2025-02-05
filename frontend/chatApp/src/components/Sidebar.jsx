import React, { useEffect, useState } from 'react'
import { Search,BeanOff } from 'lucide-react';
import profile from './../assets/profile.jpg'
import { Link } from 'react-router-dom';
import axiosInstance from '../others/axiosInstancs';
import useSocket from '../others/useSocket';
import toast from 'react-hot-toast';
const Sidebar = () => {
  let {activeUsersList}=useSocket()
  let [alluser,setAlluser]=useState([])
  let [text,setText]=useState('')
  useEffect(()=>{
    let fetchAll=async()=>{
      try{
        let res=await axiosInstance.get("/data/getAlluser")
        setAlluser(res.data.alluser)
      }catch(err){
        console.log(err.message)
      }
    }
    fetchAll()
    console.log("useEffecte trigger")
  },[])
  let handleChange=async(e)=>{
    try{
      setText(e.target.value)
      let res=await axiosInstance.get(`/data/searchmsg?name=${e.target.value}`)
      if(res.status==200){
        setAlluser(res.data)
      }
    }catch(err){
      toast.error(err.response?.data?.message)
    }
  }
  return (
    <div className='h-[100%] flex flex-col'>
      <header className='w-full'>
      <div className='relative h-10'><input onChange={handleChange} type="text" placeholder='search..'   className='p-2 rounded-md border-none h-full w-full outline-none'/><Search className='absolute top-2 right-2' /></div>
      </header>
      <section className='w-full h-[100%]'>
        <ul className=' w-full h-[100%] p-1 overflow-y-scroll hide-scrollbar'>
          {alluser&&alluser.length>0?(alluser.map((data,index)=>(
            <Link to={`/${data._id}`} key={index}><li className='w-full h-[10%] flex flex-row justify-center items-center px-1 mb-2 rounded-md border-2 border-gray-400 '>
                <img src={data.imgUrl?data.imgUrl:profile} alt="" className='w-10 h-10 rounded-3xl' />
                <div className='w-[80%] h-full flex flex-row justify-center items-center'>
                <span className='w-[90%] text-center'>{data.username}</span>
                {activeUsersList.includes(data._id)?(<span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                 </span>):(<BeanOff/>)}
                </div>
            </li>
            </Link>
))):(<div>No usuer found</div>

)}
        
        </ul>
      </section>
    </div>
  )
}

export default Sidebar
