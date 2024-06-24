'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from "universal-cookie";
import Apis from '@/app/libs/apis'
import { auth } from '@/app/libs/utils/firebase';
import { InputCheckbox, InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';

const Login = () => {
  const cookies = new Cookies
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // 3MiJ6R2glGF2Ql

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      if ( res ) {
        //router.push('/extranjeria')
      }
    } catch (error) {
      console.info('login/page.js')
      console.error(`Error al authenticarse: ${error}`)
    }
    setLoading(false)
  }

  useEffect(() => {
    const user = cookies.get('user')
    console.log(user)
    if ( user ) router.push('/extranjeria')
  },[])

  return (
    <>
      <div className="flex items-center relative md:min-h-screen">
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <div className="absolute bottom-0 left-0 right-0 top-0" style={{ zIndex: '1' }}>
            <Image
              src='/images/background.jpeg'
              alt='Madrid'
              fill={true}
              quality={80}
              style={{ objectFit: 'cover' }}
              loading='lazy'
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0" style={{ backgroundColor: 'rgba(33, 37, 41, .85)', backdropFilter: 'blur(1px)', zIndex: '2' }}></div>
        </div>
        <div className="flex flex-col-reverse h-full items-end w-full md:flex-row" style={{ zIndex: '5' }}>
          <div className="flex justify-center w-full md:w-6/12">
            <div className="px-8 py-8 w-full md:py-16 md:w-4/6">
              <hr className="hidden mb-3 mt-4 opacity-25 md:block"/>
              <div className="my-1 text-center text-white md:text-left">
                <p>Hecho con ♥ por Trascendiendo Digital</p>
              </div>
            </div>
          </div>
          <div className="flex flex-grow items-center justify-center w-full md:w-6/12">
            <div className="bg-white flex items-center mx-3 my-8 w-full rounded-xl md:my-5" style={{ maxWidth: '480px', minHeight: 'calc(100vh - 110px)' }}>
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
                <div className="mb-5 mt-5 md:mb-14">
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
        {loading && <LoadingScreen />}
      </div>
    </>
  )
}

export default Login
