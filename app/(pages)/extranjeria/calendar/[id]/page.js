'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PageEvent = () => {
  const params = useParams()
  const uid = params.id
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

  }, [uid])
  console.log(uid)

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
          </div>
          <div
            className="flex gap-8 items-start justify-between w-full"
            style={{
              paddingTop: '24px'
            }}
          >
            <div className="w-full sm:w-6/12">
              <div className="card">
                <div className="card__body">
                  <div className="userUI__content">
                    <div className="userUI__details">
                      <div className="flex gap-4 items-center justify-between sm:flex-col">
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Nombre</span>
                          {/*
                          <InputText
                            name='name'
                            capitalize={true}
                            type='text'
                            defaultValue={procedure.name}
                          />
                          */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Toaster />
          </div>
        </>
      )}
    </>
  )
}

export default PageEvent
