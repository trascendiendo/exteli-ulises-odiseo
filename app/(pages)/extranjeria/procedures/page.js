'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import Apis from '@/app/libs/apis';
import { Badge } from '@/app/ui/components/atoms';

const PageProcedures = () => {
  const router = useRouter()
  const cookies = new Cookies
  const [isLoading, setIsLoading] = useState(false)
  const [procedures, setProcedures] = useState([])
  const [thisUser, setThisUser] = useState({})

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user)
    }
    const fetchProcedures = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.procedures.GetAllProcedures()
        if ( res ) setProcedures(res)
      } catch (error) {
        toast.error('Error al cargar la lista de trámites.')
      }
      setIsLoading(false)
    }
    getUser()
    fetchProcedures()
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
              <Link href='/'>Home</Link>
            </li>
          </ul>
        </div>
        <div className="w-full">
          <h2 className="font-bold text-3xl">Trámites</h2>
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
                  href='/extranjeria/procedures/add'
                >
                  Agregar trámite
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Trámite</th>
                      <th>Precio</th>
                      <th>Status</th>
                      <th>Usuarios en trámite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedures && (
                      procedures.map(procedure => (
                        <tr key={procedure.id}>
                          <td>
                            {procedure.procedure.name}
                          </td>
                          <td>
                            {procedure.procedure.price}
                          </td>
                          <td>
                            {procedure.procedure.status == 'Activo' && (
                              <Badge 
                              className='badge badge__success'
                              text={procedure.procedure.status} 
                              />
                            )}
                            {procedure.procedure.status == 'Inhabilitado' && (
                              <Badge 
                              className='badge badge__banned'
                              text={procedure.procedure.status} 
                              />
                            )}
                          </td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              href={`./procedures/${procedure.id}`}
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

//export default WithAuth()
export default PageProcedures
