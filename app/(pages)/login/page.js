'use client'

import Link from "next/link";
import Image from "next/image";

import { InputCheckbox, InputText } from "@/app/ui/components/atoms";

export default function Login() {
  const {
    login,
    authError,
    addError
  } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState([])

  const handleSubmit = async () => {
    setIsLoading(true);
    if(Input.email.length <= 0) {
      console.log('Error: Correo electrónico requerido')
    }
    if(Input.password.length <= 0) {
      console.log('Error: Correo electrónico requerido')
    } else {
      await Login(input)
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
                <div className="flex justify-center mb-8">
                  <div className="bg-purple-400" style={{ borderRadius: '50%', height: '210px', width: '210px' }}></div>
                </div>
                <h4 className="mb-4 text-xl" style={{ color: '1d2630' }}>Identificarse con correo electrónico</h4>
                <div className="mb-3">
                  <InputText 
                    type='email'
                    placeholder='Correo electrónico'
                    required
                  />
                </div>
                <div className="mb-3">
                  <InputText 
                    type='password'
                    placeholder='Contraseña'
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
                    className="border font-semibold px-4 py-3 rounded-xl text-sm w-full"
                    style={{ backgroundColor: '#04A9F5', borderBlock: '#04A9F5', color: 'white' }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}