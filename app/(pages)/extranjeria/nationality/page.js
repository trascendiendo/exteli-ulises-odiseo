'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';

const PageNationalities = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [nationalities, setNationalities] = useState([])

  useEffect(() => {
    const fetchNationalities = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.nationalities.GetAllNationalities()
        if ( res ) setNationalities(res)
      } catch (error) {
        toast.error('Error al cargar la lista de nacionalidades.')
      }
      setIsLoading(false)
    }
    fetchNationalities()
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
          <h2 className="font-bold text-3xl">Nacionalidades</h2>
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
                  href='/extranjeria/nationality/add'
                >
                  Agregar nacionalidad
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>País</th>
                      <th>ISO 3166</th>
                      <th>Usuarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nationalities && (
                      nationalities.map(nationality => (
                        <tr key={nationality.id}>
                          <td>{nationality.nationality.country}</td>
                          <td>{nationality.nationality.iso3166}</td>
                          <td>1</td>
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

export default PageNationalities
