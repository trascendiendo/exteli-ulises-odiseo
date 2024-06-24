'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Timeline } from '@/app/ui/components/organisms';
import { CardCustomer } from '@/app/ui/components/organisms';
import { DataCustomer } from '@/app/ui/components/organisms';
import { TitleCustomer } from '@/app/ui/components/organisms';

const PageCustomer = () => {
  const params = useParams()
  const uid = params.id
  const router = useRouter()
  const cookies = new Cookies
  const [thisUser, setThisUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user)
    }
    getUser()
  }, [])

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
              <ul className="breadcrumbs">
                <li>
                  <Link href='/'>Home</Link>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <TitleCustomer 
                uid={uid}
              />
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
                  <CardCustomer
                    uid={uid}
                  />
                </div>
              </div>
              <div className="card mt-4">
                <div className="card__header border-b p-6">
                  <h5 className="font-semibold text-sm">Comentarios</h5>
                </div>
                <div className="card__body">
                  <Timeline 
                    uid={uid}
                    agent={thisUser.id}
                  />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-6/12">
              <div className="card">
                <div className="card__header border-b p-6">
                  <h5 className="font-semibold text-sm">Información personal</h5>
                </div>
                <div className="card__body">
                  <DataCustomer
                    uid={uid}
                  />
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

export default PageCustomer
