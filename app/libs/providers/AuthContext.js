import React, { createContext, useContext, useEffect, useState } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "@/app/libs/utils/firebase";
import Cookies from "universal-cookie";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if ( !user ) {
        setUser(null)
        cookies.set('eli-token', '', { path: '/' })
        cookies.set('user', '', { path: '/' })
      } else {
        const token = await user.getIdToken()
        setUser(user)
        cookies.set('eli-token', token, { path: '/' })
        cookies.set('user', JSON.stringify(user), { path: '/' })
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
