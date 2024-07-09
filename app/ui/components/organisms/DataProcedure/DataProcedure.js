'use client'

import { Suspense, useEffect, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis';
import { InputText } from '@/app/ui/components/atoms';
import SkeletonDataProcedure from '@/app/ui/components/skeletons/organisms/DataProcedure/DataProcedure';

const Procedure = ({
  uid
}) => {
  const cookies = new Cookies
  const [procedure, setProcedure] = useState(null)
  const [allAgents, setAllAgents] = useState(null)
  const [error, setError] = useState(null)
  const [thisUser, setThisUser] = useState({})

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user)
    }
    getUser()
    const fetchData = async () => {
      try {
        const resProcedure = await Apis.procedures.GetProcedure(uid)
        setProcedure(resProcedure.procedure)
        const resAgents = await Apis.users.GetAllUsers()
        setAllAgents(resAgents)
      } catch (error) {
        console.info('organisms/DataProcedure/DataProcedure.js/fetchData()')
        console.error('Error al cargar la data.')
        setError(error)
      }
    }
    fetchData()
  }, [uid])

  const handleUpdate = async (e) => {
    
  }

  if ( error ) {
    return <SkeletonDataProcedure />
  }

  if ( !procedure ) {
    return null
  }

  return (
    <div
      className="flex gap-8 items-start justify-between w-full"
      style={{
        paddingTop: '24px'
      }}
    >
      <form onSubmit={handleUpdate} className='flex gap-8 items-start justify-between w-full'>
        <div className="w-full sm:w-6/12">
          <div className="card">
            <div className="card__body">
              <div className="userUI__content">
                <div className="userUI__details">
                  <div className="flex gap-4 items-center justify-between sm:flex-col">
                    <div className="w-6/12 sm:w-full">
                      <span className="block text-sm">Nombre</span>
                      <InputText
                        name='firstName'
                        capitalize={true}
                        type='text'
                        defaultValue={procedure.name}
                      />
                    </div>
                    <div className="w-6/12 sm:w-full">
                      <span className="block text-sm">Descripción</span>
                      <textarea
                        className={`block border mt-2 rounded-lg px-3 py-3.5 text-sm w-full`}
                        style={{ resize: 'none'}}
                        rows='7'
                      >
                      </textarea>
                    </div>
                    <div className="w-6/12 sm:w-full">
                      <span className="block text-sm">Precio</span>
                      <InputText
                        name='firstName'
                        capitalize={true}
                        type='text'
                        defaultValue={procedure.price || 0.00}
                      />
                    </div>
                    <div className="w-6/12 sm:w-full">
                      <span className="block text-sm">Estado</span>
                      <select 
                        name='status'
                        className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                        defaultValue={procedure.status}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Activo">Activo</option>
                        <option value="Incompleto">Incompleto</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </div>
                    <div className="w-6/12 sm:w-full">
                      Actualizado el: 
                    </div>
                    <div className="flex justify-center w-6/12 sm:w-full">
                      <div className="w-full sm:w-6/12">
                        <button
                          className="btn btn-primary w-full"
                          type='submit'
                        >
                          Actualizar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-6/12">
        </div>
      </form>
      <Toaster />
    </div>

  )
}

const DataProcedure = ({ uid }) => {
  return (
    <Suspense fallback={<SkeletonDataProcedure />}>
      <Procedure uid={uid} />
    </Suspense>
  )
}

export default DataProcedure