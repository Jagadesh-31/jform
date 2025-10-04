import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../contexts/authContext'


export function Login() {
  const { user, setUser, authMessage } = useContext(authContext)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData)
      setMessage(res.data.message)

      if (res.data.token) {
        setUser(res.data.user)
        localStorage.setItem('token', res.data.token)

       
        if (res.data.user.role === 'admin') {
          navigate('/admin', { replace: true })
          return
        }

      
        navigate(from, { replace: true })
      }
    } catch (err) {
      console.error(err)
      setMessage('Invalid credentials or server error')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (user) {
    return <Navigate to={from} replace />
  }

  return (
    <div className='w-screen h-screen bg-[#ebebeb] flex justify-center items-center'>
      <div className='bg-[#F8F8F8] min-w-[400px] max-w-[600px] rounded-2xl px-6 py-8 flex flex-col items-center gap-4'>
        {authMessage && (
          <span className='text-red-600 font-bold'>{authMessage}</span>
        )}

        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-black font-medium text-lg md:text-xl'>
            Welcome Back
          </h1>
          <h3 className='text-black font-normal text-sm'>
            Please enter your details.
          </h3>
        </div>

        <form
          className='w-3/5 flex flex-col min-w-[200px] gap-3'
          onSubmit={handleSubmit}
        >
          <label htmlFor='email' className='text-black font-medium text-sm'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            className='rounded-lg p-2 pl-3 text-[#636364] font-medium border-2 text-sm w-full focus:outline-none'
            value={formData.email}
            onChange={handleChange}
          />

          <label
            htmlFor='password'
            className='text-black font-medium text-sm'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='*************'
            required
            className='rounded-lg p-2 text-[#636364] font-normal text-sm border-2 w-full pl-3 focus:outline-none mb-3'
            value={formData.password}
            onChange={handleChange}
          />

          {message && (
            <div className='w-full text-center text-[#EA454c] font-medium text-sm'>
              {message}
            </div>
          )}

          <div className='text-center'>
            <span
              className='text-[#EA454c] font-medium text-sm cursor-pointer'
              onClick={() => navigate('/forgotPassword')}
            >
              Forgot Password?
            </span>
          </div>

          <button
            type='submit'
            className='w-full h-9 text-white font-medium text-sm bg-[#EA454c] rounded-xl border-2 border-[#636364] cursor-pointer'
          >
            Login
          </button>

          <div className='flex justify-center items-center gap-2'>
            <span className='text-[#636364] font-medium text-xs'>
              Don't have an account?
            </span>
            <Link to={'/signup'} className='text-[#EA454c] font-bold text-sm'>
              Register for free!
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}


export function Signup() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/home'
  const { user, setUser } = useContext(authContext)
  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/auth/register', formData)
      setMessage(res.data.message)

      if (res.data.token) {
        setUser(res.data.user)
        localStorage.setItem('token', res.data.token)
        navigate(from, { replace: true })
      }
    } catch (err) {
      console.error(err)
      setMessage('Registration failed. Try again.')
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='w-screen h-screen bg-[#ebebeb] flex justify-center items-center'>
      <div className='bg-[#F8F8F8] min-w-[400px] max-w-[600px] rounded-2xl px-6 py-8 flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-black font-medium text-lg md:text-xl'>
            Create an Account
          </h1>
          <h3 className='text-black font-normal text-sm'>
            Please enter your details.
          </h3>
        </div>

        <form
          className='w-3/5 flex flex-col min-w-[200px] gap-3'
          onSubmit={handleSubmit}
        >
          <label htmlFor='email' className='text-black font-medium text-sm'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter your email'
            className='rounded-lg p-2 pl-3 text-[#636364] font-medium border-2 text-sm w-full focus:outline-none'
            value={formData.email}
            onChange={handleChange}
          />

          <label
            htmlFor='username'
            className='text-black font-medium text-sm'
          >
            Username
          </label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Enter username'
            className='rounded-lg p-2 text-[#636364] font-normal text-sm border-2 w-full pl-3 focus:outline-none'
            required
            value={formData.username}
            onChange={handleChange}
          />

          <label
            htmlFor='password'
            className='text-black font-medium text-sm'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='*************'
            required
            className='rounded-lg p-2 text-[#636364] font-normal text-sm border-2 w-full pl-3 focus:outline-none mb-3'
            value={formData.password}
            onChange={handleChange}
          />

          {message && (
            <div className='w-full text-center text-[#EA454c] font-medium text-sm'>
              {message}
            </div>
          )}

          <button
            type='submit'
            className='w-full h-9 text-white font-medium text-sm bg-[#EA454c] rounded-xl border-2 border-[#636364]'
          >
            Signup
          </button>

          <div className='flex justify-center items-center gap-2'>
            <span className='text-[#636364] font-medium text-xs'>
              Already have an account?
            </span>
            <Link to={'/login'} className='text-[#EA454c] font-bold text-sm'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
