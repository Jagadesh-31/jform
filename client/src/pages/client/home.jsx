

import { useState, useEffect, useContext, createContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../../App.css'

import Loader from '../../components/loader.jsx'
import {FormsContainer} from '../../components/formsContainer.jsx'
import { authContext } from '../../contexts/authContext.jsx'
import axios from '../api/axios.jsx'

export const dataContext = createContext()

export function Home () {
  let { user, setUser } = useContext(authContext)
  let [data, setData] = useState() 
  let [loading, setLoading] = useState(true)
  let navigate = useNavigate()

  useEffect(() => {
    setData(null)
    setLoading(true)
      axios
        .get('/forms/find')
        .then(res => {
          setData(res.data)
          console.log(res.data)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false);
        })
  }, [])

  return (
    <div className='backgroundDiv min-h-screen'>
      <div className='container w-[85%] flex flex-col gap-4'>
        <div className='options flex justify-center items-center'>
                <span
                  className={`rounded-2xl p-1 px-3 font-bold text-lg text-white cursor-pointer bg-[#4242FA]
                  }`}
                >
                  Forms
                </span>
        </div>


        <div className='main w-full'>
            <div className='forms'>
              {loading ? (
                <Loader />
              ) : (<>
                  {(data && data?.length) ? <FormsContainer data={data}/>:<p className='text-white font-bold text-2xl'>No Forms Found...</p>}
                   </>
              )}
            </div>

        </div>
      </div>
    </div>
  )
}
