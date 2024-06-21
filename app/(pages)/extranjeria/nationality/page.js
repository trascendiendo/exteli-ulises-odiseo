'use client'

import { useState } from 'react'
import Link from 'next/link'

const PageNationalities = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [nationalities, setNationalities] = useState([])

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
                    <tr>
                      <td>Perú</td>
                      <td>PE</td>
                      <td>1</td>
                    </tr>
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

export default PageNationalities
