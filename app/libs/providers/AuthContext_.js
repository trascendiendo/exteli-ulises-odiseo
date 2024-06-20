'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import { auth } from "@/app/libs/utils/firebase";

const AuthContext = createContext({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  loading: false,
  user: {},
  token: '',
  authError: ''
})

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const cookies = new Cookies
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const handleLogin = async (email, password) => {
    try {
      setIsLoading(true)
      const res = await signInWithEmailAndPassword(auth, email, password)
      if ( res ) {
        console.log(res.user)
        const token = res.user.uid
        const user = {
          email: res.user.email,
          lastSignInTime: res.user.metadata.lastSignInTime,
          uid: res.user.uid
        }
        const now = new Date()
        let expires = new Date(now.setHours(now.getHours() + 2))
        cookies.set('eli-token', token, { path : '/', expires })
        cookies.set('user', user, { path : '/', expires })
        setIsLoggedIn(true)
        setIsLoading(false)
        {/*
          onAuthStateChanged(auth, (user) => {
            if ( user ) {
              router.push('/extranjeria')
            }
          })
        */}
      }
    } catch (error) {
      setIsLoading(false)
      const errorCode = error.code
      setAuthError(errorCode)
    }
  }

  const handleLogout = () => {
    console.log('ELI Token removing •͡˘㇁•͡˘')
    cookies.remove('eli-token', { path : '/' })
    cookies.remove('user', { path : '/' })
    signOut(auth)
      .then(() => {
        setUser(null)
        setToken(null)
        setIsLoggedIn(false)
        router.push('/login')
      }).catch(() => {

      })
  }

  return (
    <>
      <AuthContext.Provider 
        value={{ 
          isAuthenticated: isLoggedIn, 
          login: handleLogin,
          logout: handleLogout,
          loading: isLoading,
          user, 
          token,
          authError
        }}
      >
        { children }
      </AuthContext.Provider>
      {/*<Toaster position="top-right" reverseOrder={false} />*/}
    </>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
