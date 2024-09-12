'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { auth, db } from '@/app/libs/utils/firebase'
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordsCorrect, setPasswordCorrect] = useState(false)
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user

    const newUser = {
      uid: user.uid,
      firstName,
      lastName,
      email,
      phone,
      role,
      gender,
      status,
      lastConnection: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    await Apis.users.PostUser(user.uid, newUser)
      .then(() => {
        console.info(newUser)
        toast.success('Usuario registrado con éxito.')
      })
      .catch((error) => {
        toast.error('Error al crear un usuario.')
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
        //router.push('/extranjeria/users')
      })
  }

  useEffect(() => {
    if ( 
      password == passwordConfirm &&
      password != '' &&
      passwordConfirm != ''
    ) {
      setPasswordCorrect(true)
    } else {
      setPasswordCorrect(false)
    }
  }, [password, passwordConfirm])

  return (
    <>
      <div
        className="page-header bg-transparent"
        style={{
          borderRadius: '8px',
          minHeight: '55px',
          padding: '13px 0px'
        }}
      >
        <div className="w-full">
          <ul className="breadcrumbs">
            <li>
              <Link href='/'>Home</Link>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-3xl">Agregar usuario</h2>
        </div>
      </div>
      <div
        className="row"
        style={{
          paddingTop: '24px'
        }}
      >
        <div className="w-full">
          <div className="card">
            <div className="card__body">
              <div className="form flex justify-center">
                <div className="w-6/12">
                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Nombre</span>
                        <InputText
                          type='text'
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Apellidos</span>
                        <InputText
                          type='text'
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Correo electrónico</span>
                        <InputText
                          type='email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Móvil</span>
                        <InputText
                          type='text'
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Contraseña</span>
                        <InputText
                          type='password'
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Confirmar Contraseña</span>
                        <InputText
                          type='password'
                          value={passwordConfirm}
                          onChange={e => setPasswordConfirm(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Rol</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={role}
                          onChange={e => setRole(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar opción</option>
                          <option value="Administrador">Administrador</option>
                          <option value="Colaborador">Colaborador</option>
                          <option value="Practicante">Practicante</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Gender</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={gender}
                          onChange={e => setGender(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar opción</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Estado</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={status}
                          onChange={e => setStatus(e.target.value)}
                          required
                        >
                          <option value="0">Seleccionar opción</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Activo">Activo</option>
                          <option value="Baja">Baja</option>
                          <option value="Inhabilitado">Inhabilitado</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12"></div>
                  </div>

                  <div className="flex gap-6 mt-5">
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-primary w-full"
                        onClick={handleSubmit}
                        disabled={!passwordsCorrect}
                      >
                        Registrar
                      </button>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <Link
                        className="btn btn-danger w-full"
                        href={`./users`}
                      >
                        Cancelar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      {isLoading && <LoadingScreen />}
    </>
  )
}

//export default WithAuth()
export default AddUser
