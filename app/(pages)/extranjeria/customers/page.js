'use client'

import { useEffect, useState } from "react";
import Link from "next/link"
import { Eye } from "@phosphor-icons/react/dist/ssr";
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { Badge } from "@/app/ui/components/atoms";

const PageClients = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.customers.GetAllCustomers()
        if ( res ) setCustomers(res)
      } catch (error) {
        toast.error('Error al cargar la lista de clientes.')
      }
      setIsLoading(false)
    }
    fetchClients()
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
          <h2 className="font-bold text-3xl">Clientes</h2>
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
                  href='/extranjeria/customers/add'
                >
                  Agregar cliente
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Pasaporte</th>
                      <th>Nacionalidad</th>
                      <th>Agente</th>
                      <th>Status</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers && (
                      customers.map(customer => (
                        <tr key={customer.id}>
                          <td>
                            {customer.customer.firstName} {customer.customer.lastName}
                          </td>
                          <td>
                            <Badge 
                              className='badge badge__primary mr-2'
                              text={customer.customer.documentType} 
                            />
                            <code>
                              {customer.customer.documentNumber}
                            </code>
                          </td>
                          <td>
                            {customer.customer.nationality}
                          </td>
                          <td>
                            {customer.customer.agent}
                          </td>
                          <td>
                            {customer.customer.status == 'Pendiente' && (
                              <Badge 
                              className='badge badge__banned'
                              text={customer.customer.status} 
                              />
                            )}
                            {customer.customer.status == 'Activo' && (
                              <Badge 
                                className='badge badge__success'
                                text={customer.customer.status} 
                              />
                            )}
                            {customer.customer.status == 'Incompleto' && (
                              <Badge 
                                className='badge badge__danger'
                                text={customer.customer.status} 
                              />
                            )}
                            {customer.customer.status == 'Finalizado' && (
                              <Badge 
                                className='badge badge__primary'
                                text={customer.customer.status} 
                              />
                            )}
                          </td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              href={`./customers/${customer.id}`}
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
export default PageClients
