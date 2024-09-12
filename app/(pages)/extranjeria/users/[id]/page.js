'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis';
import { Badge, InputText } from '@/app/ui/components/atoms';

const PageUser = () => {
  const params = useParams()
  const uid = params.id
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.users.GetUser(uid)
        if ( res ) {
          const {
            firstName,
            lastName,
            email,
            phone,
            role,
            gender,
            status,
            createdAt,
            updatedAt
          } = res
          setUser({
            firstName,
            lastName,
            email,
            phone,
            role,
            gender,
            status,
            createdAt: new Date(createdAt.seconds * 1000).toLocaleDateString("es-Es"),
            updatedAt: new Date(updatedAt.seconds * 1000).toLocaleDateString("es-Es")
          })
        }
        {/**
          if ( userDoc.exists() ) {
            const { 
              firstName, 
              lastName, 
              email, 
              phone, 
              role, 
              gender,
              status,
              createdAt,
              updatedAt
            } = userDoc.data()
            setUser({
              firstName,
              lastName,
              email,
              phone,
              role,
              gender,
              status,
              updatedAt: new Date(updatedAt.seconds * 1000).toLocaleDateString("es-ES")
            })
          }
        */}
      } catch (error) {
        toast.error('Error al cargar al usuario.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
          {user && (
            <h2 className="font-bold text-3xl">
              {user.firstName} {user.lastName}
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
        <div className="w-full sm:w-6/12">
          <div className="card">
            <div className="card__body">
              {/* TODO: colocar skelleton */}
              {user && (  
                <div className="userUI__content flex justify-center">
                  <div className="userUI__details md:w-8/12">
                    <div className="userUI__avatar flex justify-center">
                      <Image
                        src={user.gender == 'Masculino' 
                          ? '/images/avatarUserMale.png' 
                          : '/images/avatarUserFem.png'}
                        height={140}
                        width={140}
                        alt={`${user.firstName} ${user.lastName}`}
                        quality={100}
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-4 userUI__profile text-center">
                      <h4 className="capitalize font-semibold mb-1 text-lg">
                        {user.firstName} {user.lastName}
                      </h4>
                      <Badge 
                        className={`badge ${user.role == 'Administrador' ? 'badge__primary' : `${user.role == 'Colaborador' ? 'badge__dark' : `${user.role == 'Practicante' ? 'badge__light' : 'badge__secondary'}`}`}`}
                        text={user.role} 
                      />
                    </div>
                    {/* ONLY if status == 'Activo' */}
                    <div className="userUI__summary flex items-center justify-center mt-4">
                      <div className="w-4/12 flex flex-col items-center">
                        <strong className="text-base">4</strong>
                        <span className="text-sm">Procesos</span>
                      </div>
                      <div className="w-4/12 border border-b-0 border-t-0 flex flex-col items-center">
                        <strong className="text-base">21</strong>
                        <span className="text-sm">Notas</span>
                      </div>
                      <div className="w-4/12 flex flex-col items-center">
                        <strong className="text-base">7</strong>
                        <span className="text-sm">Clientes</span>
                      </div>
                    </div>
                    {/* ONLY Admin, aprove */}
                    {user.role == 'Administrator' && (
                      <>
                        {user.status == 'Pendiente' && (
                          <div className="userUI__status flex gap-4 items-center justify-center mt-4">
                            <div className="w-6/12">
                              <button
                                className="btn btn-primary w-full"
                              >
                                Aprobar
                              </button>
                            </div>
                            <div className="w-6/12">
                              <button
                                className="btn btn-danger w-full"
                              >
                                Denegar
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full sm:w-6/12">
          <div className="card">
            <div className="card__header border-b p-6">
              <h5 className="font-semibold text-sm">Información personal</h5>
            </div>
            <div className="card__body">
              {/* TODO: colocar skelleton */}
              {user && (
                <div className="userUI__content">
                  <div className="userUI__details">
                    <form>
                      <div className="flex gap-4 items-center justify-between sm:flex-col">
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Nombre</span>
                          <InputText
                            capitalize={true}
                            isDisabled={user.role == 'Administrador' ? false : true}
                            type='text'
                            placeholder={user.firstName}
                          />
                        </div>
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Apellidos</span>
                          <InputText
                          isDisabled={user.role == 'Administrador' ? false : true}
                            type='text'
                            placeholder={user.lastName}
                          />
                        </div>
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Correo electrónico</span>
                          <InputText
                          isDisabled={user.role == 'Administrador' ? false : true}
                            type='text'
                            placeholder={user.email}
                          />
                        </div>
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Móvil</span>
                          <InputText
                          isDisabled={user.role == 'Administrador' ? false : true}
                            type='text'
                            placeholder={user.phone}
                          />
                        </div>
                        {/* ONLY for Administradores */}
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Rol</span>
                          <select 
                            className="border rounded-lg px-3 py-3.5 text-sm w-full" value={user.role}
                            disabled={user.role == 'Administrador' ? false : true}
                          >
                            <option>{user.role}</option>
                          </select>
                        </div>
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Género</span>
                          <select 
                            className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                            disabled={user.role == 'Administrador' ? false : true}
                            value={user.gender}
                          >
                            <option>{user.gender}</option>
                          </select>
                        </div>
                        {/* ONLY for Administradores */}
                        <div className="w-6/12 sm:w-full">
                          <span className="block text-sm">Estado</span>
                          <select 
                            className="border rounded-lg px-3 py-3.5 text-sm w-full" value={user.status}
                            disabled={user.role == 'Administrador' ? false : true}
                          >
                            <option>{user.status}</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <span className="text-sm">Creado el: </span>
                          <span className="text-sm">{user.createdAt}</span>
                        </div>
                        <div className="w-full">
                          <span className="text-sm">Actualizado el: </span>
                          <span className="text-sm">{user.updatedAt}</span>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  )
}

//export default WithAuth()
export default PageUser
