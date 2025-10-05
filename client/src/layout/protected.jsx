

import { Outlet, useLocation, Navigate,useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'

import { authContext } from '../contexts/authContext'

import Header from '../components/header'
import Footer from '../components/footer'
import Loader from '../components/loader'


export function ProtectedRoute ({allowedRoles}) {
  const { user, setUser,authLoading,} = useContext(authContext);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(()=>{
    if (!authLoading){

      if(!user){
       navigate('/login');
      } else{
       if(!allowedRoles.includes(user.role)){
          navigate('/unauthorized');
        }
      }
  }},[authLoading,user])


  return(
    <div className='bg-black w-screen overflow-hidden'>
      {authLoading?<Loader/>:
        <>
         {user &&
         <>
         <Header/>
           <Outlet/>
         <Footer/>
         </>}
         </>}
    </div>)

}
