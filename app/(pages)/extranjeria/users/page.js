'use client'

import Link from "next/link"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye } from "@phosphor-icons/react/dist/ssr";
import { isEmpty, values } from "lodash";
import Apis from '@/app/libs/apis'
import { Badge } from "@/app/ui/components/atoms";

export default function PageUsers () {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const token = process.env.NEXT_PUBLIC_API_TOKEN

  useEffect(() => {
    if ( !isEmpty(users) ) {
      setIsLoading(true)
    }
  }, [users])

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      let response = await Apis.users.GetUsers(token)
      setUsers(response.data)
    }
    getData()
  }, [])

  return (
    <>
      <div
        className="page-header bg-transparent flex items-center"
        style={{
          borderRadius: '8px',
          minHeight: '55px',
          padding: '13px 0px'
        }}
      >
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
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo electrónico</th>
                      <th>Rol</th>
                      <th>Móvil</th>
                      <th>Status</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && (
                      users.map(user => (
                        <tr key={user._id}>
                          <td>
                            <div className="flex items-center">
                              <div className="ml-4">
                                <Image
                                  src={user.avatar ? user.avatar : `${user.gender == 'Masculino' ? '/images/avatarUserMale.png' : '/images/avatarUserFem.png'}`}
                                  height={40}
                                  width={40}
                                  alt="Rickon Stark"
                                  quality={80}
                                  loading="lazy"
                                />
                              </div>
                              <div className="mx-3">
                                <h5 className="capitalize mb-0">{user.firstName} {user.lastName}</h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              {user.email}
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              {user.role == 'Administrador' && (
                                <Badge 
                                  className='badge badge__primary'
                                  text={user.role} 
                                />
                              )}
                              {user.role == 'Colaborador' && (
                                <Badge 
                                  className='badge badge__dark'
                                  text={user.role} 
                                />
                              )}
                              {user.role == 'Practicante' && (
                                <Badge 
                                  className='badge badge__light'
                                  text={user.role} 
                                />
                              )}
                              {user.role == 'Super Administrador' && (
                                <Badge 
                                  className='badge badge__secondary'
                                  text={user.role} 
                                />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              {user.phone}
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              {user.status == 'Activo' && (
                                <Badge 
                                  className='badge badge__success'
                                  text={user.status} 
                                />
                              )}
                              {user.status == 'Pendiente' && (
                                <Badge 
                                  className='badge badge__pending'
                                  text={user.status} 
                                />
                              )}
                              {user.status == 'Baja' && (
                                <Badge 
                                  className='badge badge__danger'
                                  text={user.status} 
                                />
                              )}
                              {user.status == 'Inhabilitado' && (
                                <Badge 
                                  className='badge badge__banned'
                                  text={user.status} 
                                />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <Link
                                className="btn btn-primary"
                                href={`./users/${user._id}`}
                              >
                                Ver más <Eye size={28} />
                              </Link>
                            </div>
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