import React, { useState } from 'react'
import { UserRoundPen,LogOut,Palette } from 'lucide-react';
import Profile from './Profile';
import useTheme from '../others/useTheme';
import useAuth from '../others/useAuth';
import toast from 'react-hot-toast';
import useSocket from '../others/useSocket';
import { GiHamburgerMenu } from "react-icons/gi";
import RightSideBar from './RightSideBar';
const NavBar = () => {
  let {disconnect}=useSocket()
  let [side,setSide]=useState(false);
  let {isAuth}=useAuth();
    let [theme,setTh]=useState([
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
        "caramellatte",
        "abyss",
        "silk"
      ])
      let {setTheme}=useTheme()
      let change=(e)=>{
        setTheme(e.target.value)
      }
      let [profile,setProfile]=useState(false)
      let profileSet=()=>{
        setProfile(!profile)
      }
      let {logout}=useAuth()
      let handleLogout=async(e)=>{
        try{
          disconnect()
          await logout()
        }catch(err){
          toast.error(err.message)
        }
      }

  return (
    <div className='w-full h-[10%]'>
      <ul className='h-full flex flex-row items-center justify-between' >
        <li className='w-[60%] pl-4 text-3xl '>SKR chatApp</li>
        <button><GiHamburgerMenu className='lg:hidden text-2xl m-5 z-50' onClick={(e)=>setSide(!side)}/></button>
        <ul className= 'hidden h-full md:flex flex-row items-center justify-between '>
        {isAuth&&<li className='w-[10%] flex flex-row justify-center items-center'><button className='flex flex-row' onClick={profileSet}><UserRoundPen/>Profile</button></li>}
        {isAuth&&<li className='w-[10%] flex flex-row justify-center items-center '> <button className='flex flex-row' onClick={handleLogout}><LogOut />Logut</button></li>}
        <li className="w-[10%] flex flex-row justify-center items-center mr-4 ">
            <Palette className='text-2xl'/>
            <select name="" id="" className='hide-scrollbar bg-inherit border-none outline-none' onChange={change} setSide={setSide}>
            {theme.map((theme, index) => (
      <option
        value={theme}
        key={index}
        className=" m-3 border-solid border-2"
      >
        {theme}
      </option>
    ))}

            </select>
        </li>
        </ul>
      
    </ul>
   {profile&&<Profile/>}
   <RightSideBar profileSet={profileSet} handleLogout={handleLogout} change={change} theme={theme} isOpen={side} setSide={setSide}/>
    </div>
    )
}
  

export default NavBar;

