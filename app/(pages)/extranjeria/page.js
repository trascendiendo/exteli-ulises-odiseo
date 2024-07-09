'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'universal-cookie';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen'

const PageExtranjeria = () => {
  const router = useRouter()
  const cookies = new Cookies
  const [loading, setLoading] = useState(false)
  const [thisUser, setThisUser] = useState({})

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user)
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
              
            </li>
          </ul>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-3xl">
            {thisUser.gender == 'Femenino' ? (
              <>
                ¡Bienvenida, {thisUser.firstName}!
              </>
            ) : (
              <>
                ¡Bienvenido, {thisUser.firstName}!
              </>
            )}
          </h2>
        </div>
      </div>
      <div
        className="row"
        style={{
          paddingTop: '24px'
        }}
      >
        <div className="flex gap-5">
          <div className="w-full sm:w-4/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
          <div className="w-full sm:w-4/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
          <div className="w-full sm:w-4/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="w-full sm:w-7/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
          <div className="w-full sm:w-5/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
            <div className="card mt-5">
              <div className="card__body">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="w-full sm:w-4/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
          <div className="w-full sm:w-4/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
          <div className="w-full sm:w-4/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-5">
          <div className="w-full sm:w-4/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
          <div className="w-full sm:w-8/12">
            <div className="card">
              <div className="card__body">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingScreen />}
    </>
  )
}

export default PageExtranjeria
