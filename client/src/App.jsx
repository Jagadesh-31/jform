import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'
import { useContext} from 'react'



import { authContext } from './contexts/authContext.jsx'

import {ProtectedRoute} from './layout/protected.jsx'

//client
import {Home} from './pages/client/home.jsx'
import {FormInfo} from './pages/client/formInfo.jsx'
import { ContactUs } from './pages/client/contactus.jsx'
import { MyResponses } from './pages/client/myResponses.jsx'
import { FormFilling } from './pages/client/formFilling.jsx'

//admin
import { AdminHome} from './pages/admin/home'
import { CreateForm } from './pages/admin/createForm.jsx'
import { AdminFormInfo} from './pages/admin/formInfo.jsx'


//shared
import {Unauthorized} from './pages/shared/unauthorized.jsx'
import { Login, Signup } from './pages/shared/register.jsx'
import { Profile } from './pages/shared/profile.jsx'
import PageNotFound from './pages/shared/pageNotFound.jsx'
import { FormResponse } from './pages/shared/formResponse.jsx'


let router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    children: [
      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            index:true,
            element : <Navigate to='/admin/home'/>
          },
          {
            path:'home',
            element :  <AdminHome />
          },
          {
            path: 'create-form',
            element: <CreateForm />
          },
          {
            path: 'form/:id',
            element: <AdminFormInfo />
          },
          {
            path: 'response/:id',
            element: <FormResponse/>
          },
          {
            path: 'profile',
            element: <Profile/>
          }
        ]
      }
    ]
  },
  {
    path: '/',
    children: [
      {
        element:<ProtectedRoute allowedRoles={['client']} />,
        children: [
          {
            index:true,
            element : <Navigate to='/home'/>
          },
          {
            path: 'home',
            element: <Home />
          },
          {
            path: 'contact-us',
            element: <ContactUs />
          },
          {
            path: 'form/:id',
            element: <FormInfo />
          },
          {
            path: 'form/:id/fill',
            element: <FormFilling />
          },
          {
            path: 'my-responses',
            element: <MyResponses/>
          },
          {
            path: 'response/:id',
            element: <FormResponse/>
          },
          {
            path: 'profile',
            element: <Profile />
          },
        ]
      }
    ]
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])

function App () {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
