'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/libs/providers/AuthContext"
import LoadingScreen from "@/app/ui/components/molecules/LoadingScreen"

const PageExtranjeria = () => {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if ( !loading && !user ) router.push('/login')
  }, [user, loading, router])

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
          <h2 className="font-bold text-3xl">Bienvenido, user.firstName</h2>
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
