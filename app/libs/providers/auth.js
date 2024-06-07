'use client'

import 'react-notifications/lib/notifications.css'
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';

import Apis from '@/app/libs/apis'
const AuthContext = createContext({
  isAuthtenticated: false,
  login: async () => {},
  logout: () => {},
  authError: [],
  addError: () => {},
  deleteError: () => {},
  user: {},
  token: ''
})

export function useAuth () {
  return useContext(AuthContext)
}

export function useIsAuthenticated () {
  const { isAuthtenticated } = useAuth()
  return isAuthtenticated
}

function createNotificacion(type, message) {
  switch (type) {
    case 'info':
      NotificationManager.info(message)
      break;
    case 'success':
      NotificationManager.success(message)
      break;
    case 'warning':
      NotificationManager.warning(message, 'Alerta', 4000)
      break;
    case 'error':
      NotificationManager.error(message, 'Error', 4000)
      break;
  }
}

export function AuthProvider ({ children }) {
  const router = useRouter()
  const cookies = new Cookies()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authError, setAuthError] = useState([])
  const {user, setUser} = useState(null)
  const [token, setToken] = useState(null)
  const handleLogout = () => {
    console.log('removing token... •͡˘㇁•͡˘')
    cookies.remove('eli-token', { path: '/' })
    cookies.remove('user', { path: '/' })
    setUser(null)
    setToken(null)
    setIsLoggedIn(false)
    router.push('login')
  }

  const deleteError = key => {
    setAuthError(authError.filter((_, index) => index !== key))
  }

  const addError = newError => setAuthError(prevError => [newError, ...prevError])

  const handleLogin = async ({ email, password }) => {
    try {
      const { data, status } = await Apis.general.Login({ email, password })
      if (status === 200) {
        setIsLoggedIn(true)
        const { token, user } = data
        const now = new Date()
        let expires = new Date(now.setHours(now.getHours() + 2))
        cookies.set('eli-token', token, { path: '/', expires })
        cookies.set('user', { path: '/', expires })
        router.push('/extranjeria')
      } else {
        throw data
      }
    } catch (error) {
      if (!error.response.data) {
        return console.log('auth error: ', error)
      }
      let { message } = error.response.data.error
      if (typeof message === 'string') {
        if (message == 'Usuario pendiente de aprobación') {
          createNotificacion('warning', 'Pendiente de aprobación.')
        } else {
          createNotificacion('error'), message
        }
        setAuthError(prevError => [['Error', message], ...prevError])
      }
      if (typeof message === 'object') {
        let errors = _.map(
          message,
          (value, key) =>
            new Array(key, typeof value === 'string' ? value : value.join('\n'))
        )
        setAuthError(prevErrors => [...errors, ...prevErrors])
      }
    }
  }

  const verifyToken = async token => {
    try {
      const { data, status } = await Apis.a
      setUser(data)
      if (status !== 200) throw data
      setUser(data)
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    const token = cookies.get('eli-token')
    const user = cookies.get('user')
    if (token) {
      console.log('Eli token: detected •͡˘㇁•͡˘')
      const now = new Date()
      let expires = new Date(now.setHours(now.getHours() + 2))
      cookies.set('eli-token', token, { path: '/', expires})
      cookies.set('user', token, { path: '/', expires})
      setIsLoggedIn(true)
      setToken(token)
      if (!user) {
        verifyToken(token)
      } else {
        setUser(user)
      }
    }
  }, [])

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthtenticated: isLoggedIn,
          login: handleLogin,
          logout: handleLogout,
          user,
          token,
          authError,
          deleteError,
          addError
        }}
      >
        {children}
      </AuthContext.Provider>
      <NotificationContainer />
    </>
  )
}
