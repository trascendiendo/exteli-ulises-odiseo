'use client'

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis';
import { InputText } from '@/app/ui/components/atoms';
import SkeletonDataAccounting from '@/app/ui/components/skeletons/organisms/DataAccounting/DataAccounting';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const Accounting = ({
  uid
}) => {
  const cookies = new Cookies
  const [isLoading, setIsLoading] = useState(false)
  const [accounting, setAccounting] = useState(null)
  const [error, setError] = useState(null)
  const [thisUser, setThisUser] = useState({})
  const router = useRouter()

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user)
    }
    getUser()
    const fetchData = async () => {
      try {
        const res = await Apis.accounting.GetAccounting(uid)
        setAccounting(res.accounting)
      } catch (error) {
        console.info('organisms/DataAccounting/DataAccounting.js/fetchData()')
        console.error('Error al cargar la data.')
        setError(error)
      }
    }
    fetchData()
  }, [uid])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const updatedAccounting = {
      accounting: {
        ...accounting,
        type: e.target.type.value,
        amount: e.target.amount.value,
        description: e.target.description.value,
        reference: e.target.reference.value,
        updatedAt: serverTimestamp()
      }
    }
    try {
      await Apis.accounting.PatchAcconting(uid, updatedAccounting, accounting.type)
      toast.success(`${accounting.type} actualizado con éxito`)
    } catch (error) {
      toast.error(`Error al actualizar el ${accounting.type}`)
      console.error(error)
    } finally {
      setIsLoading(false)
      router.push('/extranjeria/accounting')
    }
  }

  if ( error ) {
    return <SkeletonDataAccounting />
  }

  if ( !accounting ) {
    return null
  }

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
          <h2 className="font-bold text-3xl">
            {accounting.type}
          </h2>
        </div>
      </div>
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
                        <span className="block text-sm">Tipo</span>
                        <select
                          name='type'
                          className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                          defaultValue={accounting.type}
                        >
                          <option value="ingreso">Ingreso</option>
                          <option value="egreso">Egreso</option>
                        </select>
                      </div>
                      <div className="w-6/12 sm:w-full">
                        <span className="block text-sm">Monto</span>
                        <InputText
                          name='amount'
                          capitalize={true}
                          type='text'
                          defaultValue={accounting.amount}
                        />
                      </div>
                      <div className="w-6/12 sm:w-full">
                        <span className="block text-sm">Descripción</span>
                        <textarea
                          className={`block border mt-2 rounded-lg px-3 py-3.5 text-sm w-full`}
                          style={{ resize: 'none'}}
                          rows='7'
                          name='description'
                          defaultValue={accounting.description}
                        >
                        </textarea>
                      </div>
                      <div className="w-6/12 sm:w-full">
                        <span className="block text-sm">Referencia</span>
                        <InputText
                          name='reference'
                          capitalize={true}
                          type='text'
                          defaultValue={accounting.reference}
                        />
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
      </div>
    </>
  )
}

const DataAccounting = ({ uid }) => {
  return (
    <Suspense fallback={<SkeletonDataAccounting />}>
      <Accounting uid={uid} />
    </Suspense>
  )
}

export default DataAccounting
