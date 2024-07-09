'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { Eye } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { Badge } from '@/app/ui/components/atoms';

const PageUsers = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.users.GetAllUsers()
        if ( res ) setUsers(res)
      } catch (error) {
        toast.error('Error al cargar la lista de usuarios.')
      }
      setIsLoading(false)
    }
    fetchUsers()
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
          <h2 className="font-bold text-3xl">Usuarios</h2>
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
                  href='/extranjeria/users/add'
                >
                  Agregar usuario
                </Link>
              </div>
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
                        <tr key={user.id}>
                          <td>
                            <div className="flex items-center justify-start">
                              <div className="">
                                <Image
                                  src={user.avatar ? user.avatar : `${user.gender == 'Masculino' ? '/images/avatarUserMale.png' : '/images/avatarUserFem.png'}`}
                                  height={40}
                                  width={40}
                                  alt="Rickon Stark"
                                  quality={80}
                                  loading="lazy"
                                />
                              </div>
                              <div className="ml-3">
                                <h5 className="capitalize mb-0">{user.firstName} {user.lastName}</h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            {user.email}
                          </td>
                          <td>
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
                          </td>
                          <td>
                            {user.phone}
                          </td>
                          <td>
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
                          </td>
                          <td>
                            <Link
                              className="btn btn-primary"
                              href={`./users/${user.id}`}
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
export default PageUsers
