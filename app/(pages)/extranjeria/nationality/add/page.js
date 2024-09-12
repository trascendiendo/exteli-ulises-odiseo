'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { serverTimestamp } from "firebase/firestore"
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const AddNationality = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [country, setCountry] = useState('')
  const [iso3166, setIso3166] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    const nationality = {
      country,
      iso3166,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    await Apis.nationalities.PostNationality(nationality)
      .then(() => {
        toast.success('Nacionalidad registrada con éxito.')
      })
      .catch((error) => {
        toast.error('Error al registrar una nacionalidad.')
      })
      .finally(() => {
        setIsLoading(false)
        router.push('/extranjeria/nationality')
      })
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
          <h2 className="font-bold text-3xl">Agregar nacionalidad</h2>
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
                        <span className="block text-sm">País</span>
                        <InputText
                          type='text'
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">ISO 3166</span>
                        <InputText
                          type='text'
                          value={iso3166}
                          onChange={e => setIso3166(e.target.value)}
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

export default AddNationality
