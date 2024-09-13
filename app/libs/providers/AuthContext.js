'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';

const AuthProvider = ({ children }) => {
  const cookies = new Cookies
  const router = useRouter()

  useEffect(() => {
    const user = cookies.get('user')
    if ( !user ) router.push('/')
  }, [router]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      { children }
    </>
  )
}

export default AuthProvider
