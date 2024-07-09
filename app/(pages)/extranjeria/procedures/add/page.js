'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from "universal-cookie";
import Apis from '@/app/libs/apis';
import { auth, db } from '@/app/libs/utils/firebase'
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';


const AddProcedure = () => {
  const router = useRouter()
  const cookies = new Cookies
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('0')
  const [thisUser, setThisUser] = useState({})

  const handleSubmit = async () => {
    setIsLoading(true)
    const procedure = {
      name,
      description,
      status,
      registerdBy: thisUser,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    await Apis.procedures.PostProcedure(procedure)
      .then(() => {
        toast.success('Trámite registrado con éxito.')
      })
      .catch((error) => {
        toast.error('Error al crear un trámite.')
      })
      .finally(() => {
        setIsLoading(false)
        router.push('/extranjeria/procedures')
      })    
  }

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user.uid)
    }
  getUser()
  }, [])

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
          <h2 className="font-bold text-3xl">Agregar trámite</h2>
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
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Estado</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={status}
                          onChange={e => setStatus(e.target.value)}
                          required
                        >
                          <option value="0">Seleccionar</option>
                          <option value="Activo">Activo</option>
                          <option value="Inhabilitado">Inhabilitado</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full">
                      <div className="mb-4">
                        <span className="block text-sm">Descripción</span>
                        <InputText
                          type='text'
                          value={description}
                          onChange={e => setDescription(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-5">
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-primary w-full"
                        onClick={handleSubmit}
                        disabled={!name && !description}
                      >
                        Registrar
                      </button>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-danger w-full"
                      >
                        Cancelar
                      </button>
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
export default AddProcedure
