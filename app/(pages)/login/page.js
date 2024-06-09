'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import Cookies from "universal-cookie";
import { InputCheckbox, InputText } from "@/app/ui/components/atoms";
import { auth } from "@/app/libs/utils/firebase";
import LoadingScreen from "@/app/ui/components/molecules/LoadingScreen";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepOnline, setKeepOnline] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const res = await signInWithEmailAndPassword(auth, email, password)
      if ( res ) {
        onAuthStateChanged(auth, (user) => {
          if ( user ) {
            router.push('/extranjeria')
          }
        })
      }
    } catch (error) {
      setIsLoading(false)
      const errorCode = error.code
      console.log(errorCode)
      if (errorCode === 'auth/invalid-email') {
        setEmail('')
        toast.error('Correo electrónico erróneo')
      }
      if (errorCode === 'auth/invalid-credential') {
        setPassword('')
        toast.error('Contraseña incorrecta')
      }
    }
  }

  return (
    <>
      <div className="flex items-center h-full min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ zIndex: '1' }}>
            <Image
              src='/images/background.jpeg'
              alt='Madrid'
              fill={true}
              quality={80}
              style={{ objectFit: 'cover' }}
              loading='lazy'
            />
          </div>
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(33, 37, 41, .85)', backdropFilter: 'blur(1px)', zIndex: '2' }}></div>
        </div>
        <div className="flex h-full items-end w-full" style={{ zIndex: '5' }}>
          <div className="flex justify-center w-6/12">
            <div className="px-8 py-16 w-4/6">
              <hr className="mb-3 mt-4 opacity-25"/>
              <div className="my-1 text-white">
                <p>Hecho con ♥ por Trascendiendo Digital</p>
              </div>
            </div>
          </div>
          <div className="flex flex-grow items-center justify-center w-6/12">
            <div className="bg-white flex items-center mx-3 my-5 w-full rounded-xl" style={{ maxWidth: '480px', minHeight: 'calc(100vh - 110px)' }}>
              <div className="flex flex-col justify-center p-6 w-full">
                <div className="flex justify-center mb-12">
                  <div className="bg-purple-400" style={{ borderRadius: '50%', height: '210px', width: '210px' }}>
                    <Image
                      src={'/images/logo.png'}
                      height={210}
                      width={210}
                      alt="Extranjería Eli"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
                <h4 className="mb-4 text-xl" style={{ color: '1d2630' }}>Identificarse con correo electrónico</h4>
                <div className="mb-3">
                  <InputText 
                    type='email'
                    placeholder='Correo electrónico'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <InputText 
                    type='password'
                    placeholder='Contraseña'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <InputCheckbox 
                    type='checkbox'
                    id='rememberMe'
                    text='Recuérdame'
                  />
                  <Link className="text-sm" href='/forgot-password'>¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="mb-14 mt-5">
                  <button
                    className="btn btn-primary w-full"
                    onClick={handleSubmit}
                    disabled={!password}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div> 
        </div>
        {isLoading && <LoadingScreen />}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  )
}
