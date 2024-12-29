'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';
import Apis from '@/app/utils/api';

const PageList = () => {
  const params = useParams()
  const uid = params.id
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState(null)

  useEffect(() => {
    const getLists = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.rrss.GetList(uid)
        if ( res ) {
          setList(res.selectedCustomers)
        }
      } catch (error) {
        console.error('Error al cargar la lista de difusión.', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    getLists()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {list && (
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
                  {list && (
                    <h2 className="font-bold text-3xl">
                      {list.nombre}
                    </h2>
                  )}
                </div>
              </div>
              <div
                className="flex gap-8 items-start justify-between w-full"
                style={{
                  paddingTop: '24px'
                }}
              >
                <table className='table'>
                  <thead></thead>
                  <tbody>
                    {list.length > 0 && (
                      list.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item.nombre}
                          </td>
                          <td>
                            {item.numero}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default PageList