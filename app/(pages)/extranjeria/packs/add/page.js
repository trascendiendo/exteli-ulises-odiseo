'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { serverTimestamp } from "firebase/firestore"
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { InputCheckbox, InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const AddPack = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [procedures, setProcedures] = useState([])
  const [thisProcedures, setThisProcedures] = useState([])
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    const pack = {
      name,
      price,
      procedures,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    await Apis.packs.PostPack(pack)
      .then(() => {
        toast.success('Pack registrado con éxito.')
      })
      .catch((error) => {
        toast.error('Error al registrar un pack.')
      })
      .finally(() => {
        setIsLoading(false)
        router.push('/extranjeria/packs')
      })
  }

  const handleProcedure = (e) => {
    let newArray = [...procedures, e]
    if ( procedures.includes(e) ) {
      newArray = newArray.filter(procedure => procedure !== e)
    }
    setProcedures(newArray)
  }

  useEffect(() => {
    const fetchProcedures = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.procedures.GetAllProcedures()
        if ( res ) setThisProcedures(res)
      } catch (error) {
        toast.error('Error al cargar la lista de trámites.')
      }
      setIsLoading(false)
    }
    fetchProcedures()
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
          <Breadcrumbs />
        </div>
        <div className="w-full">
          <h2 className="font-bold text-3xl">Agregar pack</h2>
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
                        <span className="block text-sm">Precio</span>
                        <InputText
                          type='text'
                          value={price}
                          onChange={e => setPrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className=' w-full'>
                      <span className="block text-sm">Trámites</span>
                      <div className="mb-4 mt-2 flex align-top flex-wrap gap-y-4">
                        {thisProcedures && (
                          thisProcedures.map(procedure => (
                            <div key={procedure.id} className='w-4/12'>

                              <div>
                                <label>
                                  <input 
                                    type='checkbox'
                                    id={procedure.id}
                                    value={procedure.procedure.name}
                                    className='inline-block mr-3'
                                    onChange={e => handleProcedure(e.target.value)}
                                  />
                                  {procedure.procedure.name}
                                </label>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-5">
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-primary w-full"
                        onClick={handleSubmit}
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

export default AddPack
