'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, Trash } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { Badge } from '@/app/ui/components/atoms';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PagePacks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [packs, setPacks] = useState([])

  const handleDelete = async (uid) => {
    await Apis.procedures.DeleteProcedure(uid)
      .then(() => {
        console.info(`Eliminado: ${uid}`)
      })
      .catch((error) => {
        console.error(`error`)
      })
  }

  useEffect(() => {
    const fetchPacks = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.packs.GetPacks()
        if ( res ) setPacks(res)
      } catch (error) {
        toast.error('Error al cargar la lista de nacionalidades.')
      }
      setIsLoading(false)
    }
    fetchPacks()
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
          <h2 className="font-bold text-3xl">Packs</h2>
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
              <div className="w-full flex justify-between mb-5">
                <div className="w-4/12"></div>
                <Link
                  className="btn btn-success"
                  href='/extranjeria/packs/add'
                >
                  Agregar pack
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Trámites</th>
                      <th>Precio</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packs && (
                      packs.map(pack => (
                        <tr key={pack.id}>
                          <td>
                            {pack.packs.name}
                          </td>
                          <td>
                            {pack.packs.procedures ? (
                              <>
                                <div className='flex items-center justify-start gap-x-1'>
                                  {pack.packs.procedures.map(procedure => (
                                    <Badge
                                      key={procedure}
                                      className='badge badge__primary'
                                      text={procedure}
                                    />
                                  ))}
                                </div>
                              </>
                            ) : (
                              <>
                                <Badge
                                  className='badge badge__primary'
                                  text='No se han agregado trámites'
                                />
                              </>
                            )}
                          </td>
                          <td>
                            {pack.packs.price}€
                          </td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              href={`./packs/${pack.id}`}
                            >
                              Ver más <Eye size={28} />
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default PagePacks
