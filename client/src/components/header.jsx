import { FiMenu } from "react-icons/fi";

import { NavLink, useNavigate, Link,useLocation } from 'react-router-dom'
import { useContext, useState,useEffect } from 'react'

import '../App.css'
import { authContext } from '../contexts/authContext'

function Header() {
  let { user, setUser,logout,setAuthMessage } = useContext(authContext);
  let {pathname} = useLocation();
  let [menu, setMenu] = useState(false);


    const links = {
    client: [
      { path: '/', name: 'Home' },
      { path: '/my-responses', name: 'My Responses' },
      { path: '/profile', name: 'Profile' },
      { path: '/contact-us', name: 'Contact Us' }
    ],
    admin: [
      { path: '/admin/home', name: 'Home' },
      { path: '/admin/create-form', name: 'Create Form' },
      { path: '/admin/profile', name: 'Profile' }
    ]
  };


  useEffect(()=>{
   setMenu(false);
   window.scroll(0,0)
  },[pathname])

  return (
    <div className='header w-screen h-18 bg-black shadow-md shadow-[#97d0ed] fixed z-1 top-0 flex justify-center'>
      <div className='headerContainer flex justify-between items-center w-[85%]'>
        <div className='logoContainer text-white hover:text-[#4242FA] font-serif font-bold text-2xl cursor:pointer'>
          <FiMenu onClick={() => { setMenu(true) }} />
        </div>

        <Link to={user.role ==='client' ? '/profile':`/${user.role}/profile`}>
          <div className='profileContainer'>
            <span className='profileImage'>
              {user ? (
                <img src={user.profileImageUrl} className='h-10 w-10 text-white rounded-full' />
              ) : (
                <span className='text-white'>Login/Register</span>
              )}
            </span>
          </div>
        </Link>
      </div>

      {menu && <div className="menuContainer w-screen h-screen fixed z-10 flex">

        <div className="left top-0 left-0 w-[45%] sm:w-[40%] md:w-[35%] lg:w-[30%] h-screen bg-blue-400 z-11 text-black flex flex-col justify-between">


      <div className="containerbodyfooter flex flex-col justify-between">
              {user ? (
              <div className="profilebox flex flex-col px-10 py-2">
                <div className="profile flex justify-between items-center">
              <span className='profileImage pt-1'>
                <img src={user.profileImageUrl} className='h-10 w-10 text-white rounded-full' />
              </span>
               <span className="name font-bold">{user.username}</span>
              </div>
            
               </div>
              ) : (
                <div className="register px-2 py-4 flex items-center justify-start">
                  <Link to='/login' className='text-white pl-4'>Login/Register</Link>
                </div>
              )}

    
           <ul className='body flex flex-col'>
            <li className='py-2 pl-4 font-normal text-md md:text-lg lg:text-xl'>{user.role}</li>
            {links[user.role].map((ele,idx)=>{
              return <NavLink to={ele.path} key={idx} className='py-2 pl-4 font-normal text-md md:text-lg lg:text-xl border-t-2'>{ele.name}</NavLink>
            })}
           </ul>
        </div>


           <ul className='footer'>
          {user && 
           <div className="left-0 cursor-pointer py-4 pl-4 font-normal text-md md:text-lg lg:text-xl border-t-2" onClick={()=>{logout();setAuthMessage('Logout Successfully');}}>
            logout
           </div>}
           </ul>


        </div>
        <div className="right top-0 bg-amber-100 w-full h-screen blur-xs opacity-60 z-12"  onClick={()=>{setMenu(false)}}>
        </div>
      </div>}

    </div>
  )
}

export default Header
