import axios from 'axios'

import { createContext, useState,useEffect } from 'react';
import axios from '../api/axios.jsx'
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authLoading,setAuthLoading] = useState(true);


  const logout=()=>{
    setUser(null);
    localStorage.removeItem('token');
  }

    useEffect(()=>{
    if (!user) {
      const token = localStorage.getItem('token');
      if (token) {
        axios
          .get('/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(res => {
            if(localStorage.getItem('link_id')){
              getLinkStatus(res.data[0]);
            } else{setUser(res.data[0]);setAuthLoading(false)}
          }).catch(err=>{
            console.log(err)
            if(err.status==401){
              logout();
            }
            setAuthLoading(false)
          })
      } else{setAuthLoading(false)};
    }
  },[]);

  return (
    <authContext.Provider value={{user,setUser,logout,authLoading}}>
      {children}
    </authContext.Provider>
  )
}