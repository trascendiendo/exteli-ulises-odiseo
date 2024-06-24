import React, { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged } from 'firebase/auth';
import Apis from '@/app/libs/apis'
import { auth } from '@/app/libs/utils/firebase';
import Cookies from 'universal-cookie';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if ( !user ) {
        setUser(null)
        cookies.set('user', '', { path: '/' })
      } else {
        const uid = user.uid
        const res = await Apis.users.GetUser(uid)
        setUser(res)
        cookies.set('user', JSON.stringify(res), { path: '/' })
      }
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
