'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PageLists = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [lists, setLists] = useState([])

  useEffect(() => {
    const fetchLists = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.rrss.GetLists()
        if ( res ) setLists(res)
      } catch (error) {
        toast.error('Error al cargar la lista de nacionalidades.')
      }
      setIsLoading(false)
    }
    fetchLists()
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
            Listas de difusión
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
              <div className="w-full flex justify-between mb-5">
                <div className="w-4/12"></div>
                <Link
                  className="btn btn-success"
                  href='/extranjeria/rrss/lists/add'
                >
                  Crear lista de difusión
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Lista</th>
                      <th>Usuarios</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lists && (
                      lists.map(list => (
                        <tr key={list.id}>
                          <td>{list.nombre}</td>
                          <td>{list.selectedCustomers.length}</td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              href={`./lists/${list.id}`}
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

export default PageLists
