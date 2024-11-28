'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis'
import { Breadcrumbs } from '@/app/ui/components/organisms'

const PageMessaging = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [templates, setTemplates] = useState(null)

  const handleSubmit = (e) => {

  }

  useEffect(() => {
    const getTemplates = async () => {
      setIsLoading(true)
      try {
        const resTemplates = await Apis.wa.GetTemplates()
        console.log(resTemplates)
        setTemplates(resTemplates)
      } catch (error) {
        console.info('fetchData')
        console.error(`Error al obtener plantillas`)
      }
    }
    getTemplates()
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
          <h2 className="font-bold text-3xl">
            Whatsapp
          </h2>
        </div>
      </div>
      <div
        className="flex gap-8 items-start justify-between w-full"
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
                      <div className="mb-3">
                        <strong>Datos del mensaje</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Plantilla del mensaje</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                        >
                          <option value="0">Seleccionar plantilla</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Lista de difusión</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                        >
                          <option value="0">Seleccionar lista</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-5">
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-success w-full uppercase"
                        onClick={handleSubmit}
                      >
                        Enviar
                      </button>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <Link
                        className="btn btn-danger w-full uppercase"
                        href={`./`}
                      >
                        Cancelar
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageMessaging
