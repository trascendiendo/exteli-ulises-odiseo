'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  ArrowFatLinesRight, 
  ArrowFatLineLeft,
  Eye 

} from "@phosphor-icons/react/dist/ssr";
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { Badge } from '@/app/ui/components/atoms';

const PageAccounting = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [accounting, setAccounting] = useState(null)

  useEffect(() => {
    const fetchAccounting = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.accounting.GetAllAccounting()
        if ( res ) setAccounting(res)
      } catch (error) {
        toast.error('Error al cargar la contabilidad.')
      }
      setIsLoading(false)
    }
    fetchAccounting()
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
          <h2 className="font-bold text-3xl">Contabilidad</h2>
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
                  href='/extranjeria/accounting/add'
                >
                  Agregar registro
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Monto</th>
                      <th>Descripción</th>
                      <th>Referencia</th>
                      <th>Registrado por</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounting && (
                      accounting.map(account => (
                        <tr key={account.id}>
                          <td>
                            {account.accounting.type == 'ingreso' ? (
                              <Badge
                                className='badge badge__success'
                                text={<ArrowFatLinesRight size={21} />}
                              />
                            ) : (
                              <Badge
                                className='badge badge__danger'
                                text={<ArrowFatLineLeft size={21} />}
                              />
                            )}
                          </td>
                          <td>{account.accounting.amount}</td>
                          <td>Concepto: {account.accounting.description}</td>
                          <td>{account.accounting.reference}</td>
                          <td>{account.accounting.registerdBy.firstName} {account.accounting.registerdBy.lastName}</td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              href={`./accounting/${account.id}`}
                            >
                              Ver detalles <Eye size={28} />
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
      </div>
    </>
  )
}

export default PageAccounting