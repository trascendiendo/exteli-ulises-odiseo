'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Code } from '@phosphor-icons/react';
import Apis from '@/app/libs/apis';
import { Breadcrumbs } from '@/app/ui/components/organisms'

const PageWhatsapp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [lists, setLists] = useState([])
  const [list, setList] = useState([])
  const [message, setMessage] = useState('')
  const [encodedmessage, setEncodedMessage] = useState('')

  const getList = async (listUid) => {
    setIsLoading(true)
    try {
      const res = await Apis.rrss.GetList(listUid)
      if ( res ) {
        setList(res.selectedCustomers)
      }
    } catch (error) {
      console.error(`getList: Error al obtener la lista ${listUid}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEncodeMessage = () => {
    const encoded = encodeURIComponent(message)
    setMessage(message)
    setEncodedMessage(encoded)
  }

  useEffect(() => {
    const getWhatsappLists = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.rrss.GetLists()
        if ( res ) {
          setLists(res)
        }
      } catch (error) {
        console.error(`getWhatsappLists: Error al obtener listas de difusion`)
      } finally {
        setIsLoading(false)
      }
    }
    getWhatsappLists()
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
                <div className="w-10/12">

                  <div className="flex gap-4 mb-4">
                    <div className="w-3/12">
                      <span className="block text-sm">Seleccionar lista de difusión</span>
                      <select
                        name='list'
                        className='border rounded-lg px-3 py-3.5 text-sm w-full'
                        onChange={(e) => getList(e.target.value)}
                      >
                        <option>Seleccionar lista...</option>
                        {lists.length > 0 && (
                          lists.map(list => (
                            <option 
                              key={`${list.id}-${list.nombre}`}
                              value={list.id}
                            >
                              {list.nombre}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    <div className="nouser-select w-3/12">
                    </div>
                    <div className="nouser-select w-3/12">
                    </div>
                    <div className="nouser-select w-3/12">
                    </div>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div className="w-4/12">
                      <span className="block text-sm">TEXT Mensaje:</span>
                      <textarea
                        name='message'
                        className='block border mt-2 rounded-lg px-3 py-3.5 text-sm w-full'
                        style={{ resize: 'none' }}
                        rows='7'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      >

                      </textarea>
                    </div>
                    <div className="w-4/12">
                      <span className="block text-sm">&nbsp;</span>
                      <button
                        className='btn btn-primary mt-2 w-full uppercase'
                        onClick={handleEncodeMessage}
                      >
                        Codificar <Code size={32} />
                      </button>
                    </div>
                    <div className="w-4/12">
                      <span className="block text-sm">HTML encoded:</span>
                      <textarea
                        name='encodedMessage'
                        className='block border mt-2 rounded-lg px-3 py-3.5 text-sm w-full'
                        style={{ resize: 'none' }}
                        rows='7'
                        value={encodedmessage}
                        readOnly
                      >

                      </textarea>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <table className='table'>
                      <thead></thead>
                      <tbody>
                        {list.length > 0 && (
                          list.map((item, index) => (
                            <tr key={`${index}${item.numero}`}>
                              <td>
                                <Link
                                  href={`https://api.whatsapp.com/send?phone=34${item.numero}&text=${encodedmessage}`}
                                >
                                  https://api.whatsapp.com/send?phone=34{item.numero}
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
        </div>
      </div>
    </>
  )
}

export default PageWhatsapp
