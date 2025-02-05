import { UserRoundPen, LogOut, Palette } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useAuth from "../others/useAuth";
const RightSideBar = ({ profileSet, handleLogout, change, theme, isOpen,setSide }) => {
  let {isAuth}=useAuth();
  return (
    <div
      className={`fixed w-full flex flex-col justify-around p-32 sm:w-[50%] items-center top-0 right-0 h-screen lg:translate-x-full bg-black text-white z-10 shadow-lg transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "translate-x-full"} w-full md:w-1/2`}
    >
        <button className="text-2xl fixed top-0 right-0 m-5" onClick={(e)=>{setSide(!isOpen)}}><IoIosCloseCircleOutline/></button>
        <li className='list-none sm:hidden  vw-[60%] pl-4 text-3xl '>SKR chatApp</li>
   
         {isAuth&&<li className=' w-[10%] flex flex-row justify-center items-center'><button className='flex flex-row' onClick={profileSet}><UserRoundPen/>Profile</button></li>}
            {isAuth&&<li className='w-[10%] flex flex-row justify-center items-center '> <button className='flex flex-row' onClick={handleLogout}><LogOut />Logut</button></li>}
              <li className="w-[10%] flex flex-row justify-center items-center mr-4 ">
                  <Palette className='text-2xl'/>
                  <select name="" id="" className='hide-scrollbar bg-inherit border-none outline-none' onChange={change} setSide={setSide}>
                  {theme.map((theme, index) => (
            <option
              value={theme}
              key={index}
              className=" m-3 border-solid border-2 bg-gray-800"

            >
              {theme}
            </option>
          ))}
      
                  </select>
              </li>
    </div>
  );
};

export default RightSideBar;
