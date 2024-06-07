'use client'

import Link from "next/link"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { isEmpty, values } from "lodash";
import Apis from '@/app/libs/apis'
import timeFormat from "@/app/libs/utils/timeFormat";
import { Badge, InputText, Select } from "@/app/ui/components/atoms";

export default function PageUser () {
  const params = useParams()
  const id = params._id
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState([])
  const token = process.env.NEXT_PUBLIC_API_TOKEN

  useEffect(() => {
    if ( !isEmpty(user) ) {
      setIsLoading(true)
    }
  }, [user])

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      let response = await Apis.users.GetUser(token, id)
      setUser(response.data)
    }
    getData()
  }, [])
  console.log(user)

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
        className="flex gap-8 items-start justify-between w-full sm:flex-col"
        style={{
          paddingTop: '24px'
        }}
      >
        <div className="w-6/12 sm:w-full">
          <div className="card">
            <div className="card__body">
              {/* TODO: colocar skelleton */}
              {user && (  
                <div className="userUI__content">
                  <div className="userUI__details">
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
                      <h4 className="capitalize">
                        {user.firstName} {user.lastName}
                      </h4>
                      <Badge 
                        className='badge badge__primary'
                        text='Administrador'
                      />
                      {/* 
                        <Badge 
                          className={`badge ${user.role == 'Administrador' ? 'badge__primary' : `${user.role == 'Colaborador' ? 'badge__dark' : `${user-role == 'Practicante' ? 'badge__light' : 'badge__secondary'}`}`}`}
                          text={user.role} 
                        />
                      */}
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
                    {/*
                      {user.status == 'Activo' && (

                      )}
                    */}
                    {/* ONLY Admin, aprove */}
                    {/* 
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
                    */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-6/12 sm:w-full">
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
      </div>
    </>
  )
}