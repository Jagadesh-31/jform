import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { authContext } from '../../contexts/authContext.jsx'
import axios from '../api/axios.jsx'

export function FormFilling() {
  const { user } = useContext(authContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState(null)
  const [responses, setResponses] = useState({})
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formRes = await axios.get(`/forms/find?formId=${id}`)
        setForm(formRes.data || null)
      } catch (err) {
        console.error(err)
        setMessage('Error loading form')
      } finally {
        setLoading(false)
      }
    }
    fetchForm()
  }, [id])

  const handleChange = (label, value) => {
    setResponses(prev => ({ ...prev, [label]: value }))
  }

  const handleFileChange = (label, file) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF or Image files are allowed!')
      return
    }
    setFiles(prev => ({ ...prev, [label]: file }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('formId', id)
      formData.append('submittedBy', user._id)
      formData.append('responses', JSON.stringify(responses))

      Object.entries(files).forEach(([label, file]) => {
        formData.append('files', file, file.name)
      })

      await axios.post('/responses/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setMessage('Form submitted successfully!')
      setTimeout(() => navigate('/home'), 1500)
    } catch (err) {
      console.error(err)
      setMessage('Failed to submit form')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className='text-white text-center p-10 text-lg'>Loading form...</div>

  if (!form) return (
    <div className='text-center text-red-400 mt-10'>
      <h2>⚠️ Form not found or failed to load.</h2>
      <Link to='/home' className='text-blue-400 underline block mt-4'>← Back to Home</Link>
    </div>
  )

  return (
    <div className='backgroundDiv min-h-screen flex flex-col items-center p-6'>
      <div className='max-w-3xl w-full bg-gray-900 rounded-2xl shadow-lg p-8'>
        <h1 className='text-md md:text-xl font-bold mb-3 text-white text-center'>{form.title}</h1>
        <p className='text-gray-300 text-center mb-6'>{form.description}</p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          {form.fields?.map((field, index) => (
            <div key={index} className='flex flex-col gap-2'>
              <label className='font-semibold text-gray-100'>
                {field.label} {field.required && <span className='text-red-500'>*</span>}
              </label>

              {field.type === 'text' && (
                <input
                  type='text'
                  required={field.required}
                  onChange={e => handleChange(field.label, e.target.value)}
                  className='p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              )}

              {field.type === 'number' && (
                <input
                  type='number'
                  required={field.required}
                  onChange={e => handleChange(field.label, e.target.value)}
                  className='p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  required={field.required}
                  onChange={e => handleChange(field.label, e.target.value)}
                  className='p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                ></textarea>
              )}

              {field.type === 'select' && (
                <select
                  required={field.required}
                  onChange={e => handleChange(field.label, e.target.value)}
                  className='p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select...</option>
                  {field.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
              )}

              {field.type === 'file' && (
                <input
                  type='file'
                  required={field.required}
                  accept='.pdf,image/*'
                  onChange={e => handleFileChange(field.label, e.target.files[0])}
                  className='text-white'
                />
              )}
            </div>
          ))}

          <button
            type='submit'
            disabled={submitting}
            className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-200 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? (
              <div className='flex items-center justify-center gap-2'>
                <svg className='animate-spin h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
                </svg>
                Uploading...
              </div>
            ) : (
              'Submit'
            )}
          </button>

          {message && <p className='text-center text-lg mt-3 text-white'>{message}</p>}
        </form>
      </div>
    </div>
  )
}
