
import '../../App.css'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authContext } from '../../contexts/authContext.jsx'
import Loader from '../../components/loader.jsx'

export const Profile = () => {
  const navigate = useNavigate()
  const { user, logout, setAuthMessage } = useContext(authContext)

  return (
    <div className='backgroundDiv min-h-screen'>
      <div className='container flex flex-col items-center gap-5'>
        <div className='header py-2 w-full flex items-center justify-between'>
          <span className='heading font-bold text-white text-md md:text-xl xl:text-2xl'>
            My Profile
          </span>
          <Link
            to='/login'
            className='logoutBtn btn font-medium text-white text-md md:text-lg xl:text-xl '
            onClick={() => {
              logout()
              setAuthMessage('Logout Successfully')
            }}
          >
            Logout
          </Link>
        </div>

      
        <div className='w-1/2 text-white flex flex-col min-w-[250px] justify-evenly items-start gap-3 border-2 border-[#636364] p-4 rounded-xl'>
          <div className='w-full py-2 flex gap-4 flex-col'>
            <label className='text-white font-medium text-md md:text-xl lg:text-2xl'>
              Username
            </label>
            <input
              type='text'
              value={user.username}
              disabled
              className='rounded-lg p-2 pl-4 text-amber-100 bg-[#636364] border-[#636364] border-2 text-sm md:text-md lg:text-lg w-full cursor-not-allowed'
            />
          </div>

          <div className='w-full py-2 flex gap-4 flex-col'>
            <label className='text-white font-medium text-md md:text-xl lg:text-2xl'>
              Email
            </label>
            <input
              type='email'
              value={user.email}
              disabled
              className='rounded-lg p-2  pl-4 text-amber-100 bg-[#636364] border-[#636364] border-2 text-sm md:text-md lg:text-lg w-full cursor-not-allowed'
            />
          </div>
        </div>

      </div>
    </div>
  )
}
