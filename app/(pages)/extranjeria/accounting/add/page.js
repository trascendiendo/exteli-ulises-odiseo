'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { serverTimestamp } from "firebase/firestore"
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';
import Cookies from 'universal-cookie';

const AddAccount = () => {
  const cookies = new Cookies
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [reference, setReference] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    const account = {
      type,
      amount,
      description,
      reference,
      registerdBy: user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    await Apis.accounting.PostAccounting(account)
      .then(() => {
        toast.success(`${type} registrada con éxito.`)
      })
      .catch((error) => {
        toast.error(`Error al registrar un ${type}.`)
      })
      .finally(() => {
        setIsLoading(false)
        router.push('/extranjeria/accounting')
      })
  }

  useEffect(() => {
    const getUser = () => {
      const userRes = cookies.get('user')
      if ( userRes ) setUser(userRes)
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
          <Breadcrumbs />
        </div>
        <div className="w-full">
          <h2 className="font-bold text-3xl">Agregar ingreso o egreso</h2>
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
                        <span className="block text-sm">Tipo</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={type}
                          onChange={e => setType(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar opción</option>
                          <option value="ingreso">Ingreso</option>
                          <option value="egreso">Egreso</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Monto</span>
                        <InputText
                          type='text'
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
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
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Referencia</span>
                        <InputText
                          type='text'
                          value={reference}
                          onChange={e => setReference(e.target.value)}
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

export default AddAccount
