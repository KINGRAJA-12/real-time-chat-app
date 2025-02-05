import React, { useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import useTheme from './others/useTheme'
import { Toaster } from 'react-hot-toast';
import Message from './pages/Message'
import Nomessage from './pages/Nomessage'
import useAuth from './others/useAuth'
import { Navigate } from 'react-router-dom'
const App = () => {
  let {theme}=useTheme()
  let {isAuth}=useAuth()
  let {getme}=useAuth()
  useEffect(()=>{
    let fetchUser=async()=>{
    try{
    await getme()
    }catch(err){
      console.log(err)
    }
  }
  fetchUser()
  },[])
  return (
   <>
   <div className='h-full w-full overflow-hidden' data-theme={theme}>
   <NavBar/>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={isAuth?<Home/>:<Navigate to={'/login'}/>}>
       <Route index element={isAuth?<Nomessage/>:<Navigate to={'/login'}/>}/>
       <Route path='/:id' element={isAuth?<Message/>:<Navigate to={'/login'}/>}/>
    </Route>
    <Route path='/login' element={isAuth?<Navigate to={'/'}/>:<Login/>}/>
    <Route path='/register' element={isAuth?<Navigate to={'/'}/>:<Register/>}/>
   </Routes>
   </BrowserRouter>
   <Toaster/>
   </div>
   </>
  )
}

export default App
