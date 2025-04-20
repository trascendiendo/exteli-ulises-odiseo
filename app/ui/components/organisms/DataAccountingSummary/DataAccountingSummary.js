'use client'

import { Suspense, useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { serverTimestamp } from 'firebase/firestore';
import Apis from '@/app/libs/apis';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const Summary = () => {
  const [dates, setDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [accounting, setAccounting] = useState(null)
  
  useEffect(() => {
    const handleAccounting = async () => {
      try {
        const res = await Apis.accounting.GetAllAccountingByPeriod(dates[0], dates[1])
        setAccounting(res)
      } catch (error) {
        console.info('handleAccounting')
        console.error(`Error al obtener data`)
      } finally {
        setLoading(false)
      }
    }
    if ( dates[1] != null ) {
      handleAccounting()
    }
  }, [dates])

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
            Ingresos por periodo
          </h2>
        </div>
      </div>
      <div
        className="flex gap-8 items-start justify-between w-full"
        style={{
          paddingTop: '24px'
        }}
      >
        <div className='flex gap-8 items-start justify-between w-full'>
          <div className="w-full sm:w-6/12">
            <div className="card">
              <div className="card__body">
                <div className='flex-auto flex-col'>
                  <label className='font-bold block mb-2'>Seleccionar periodo</label>
                  <Calendar 
                    value={dates} 
                    onChange={(e) => setDates(e.value)} 
                    selectionMode='range'
                    readOnlyInput
                    hideOnRangeSelection
                  />
                  {accounting &&
                    <>
                      {accounting.length == 0 ?
                        <>
                          <p>No se encontraron registros para este periodo.</p>
                        </>
                        :
                        <>
                          <table className='accounting__summary'>
                            <thead>
                              <tr>
                                <th>Tipo</th>
                                <th>Referencia</th>
                                <th>Monto abonado</th>
                              </tr>
                            </thead>
                            <tbody>
                              {accounting.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{item.accounting.type}</td>
                                  <td>{item.accounting.reference}</td>
                                  <td>{Number(item.accounting.amount).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan={2}><strong>Total:</strong></td>
                                <td>
                                  {accounting.reduce((acc, item) => acc + Number(item.accounting.amount), 0).toFixed(2)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </>
                      }
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Summary