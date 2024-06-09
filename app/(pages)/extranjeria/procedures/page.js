'use client'

import { useEffect, useState } from "react";
import Link from "next/link"
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { collection, getDocs } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast'
import { db } from "@/app/libs/utils/firebase"
import { Badge } from "@/app/ui/components/atoms";

const PageProcedures = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [procedures, setProcedures] = useState([])

  useEffect(() => {
    const fetchProcedures = async () => {
      setIsLoading(true)
      try {
        const querySnapshot = await getDocs(collection(db, 'procedures'))
        const proceduresList = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          ...doc.data()
        }))
        setProcedures(proceduresList)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        toast.error('Error al cargar la lista de trámites.')
      }
    }
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
                      <th>Status</th>
                      <th>Pendientes</th>
                      <th>Finalizados</th>
                      <th>Usuarios en trámite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {procedures && (
                      procedures.map(procedure => (
                        <tr key={procedure._id}>
                          <td>
                            {procedure.name}
                          </td>
                          <td>
                            {user.status == 'Activo' && (
                              <Badge 
                              className='badge badge__success'
                              text={user.status} 
                              />
                            )}
                            {user.status == 'Inhabilitado' && (
                              <Badge 
                              className='badge badge__banned'
                              text={user.status} 
                              />
                            )}
                          </td>
                          <td>
                            pendientes
                          </td>
                          <td>
                            finalizados
                          </td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              href={`./procedures/${user._id}`}
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
