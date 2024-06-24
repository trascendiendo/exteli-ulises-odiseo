'use client'

import { Suspense, useEffect, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import Apis from '@/app/libs/apis';
import { InputText } from '@/app/ui/components/atoms';
import SkeletonDataCustomer from '@/app/ui/components/skeletons/organisms/DataCustomer/DataCustomer';

const Customer = ({
  uid
}) => {
  const [customer, setCustomer] = useState(null)
  const [allNationalities, setAllNationalities] = useState([null])
  const [allProcedures, setAllProcedures] = useState([null])
  const [allPacks, setAllPacks] = useState([null])
  const [allAgents, setAllAgents] = useState([null])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNationalities = await Apis.nationalities.GetAllNationalities()
        setAllNationalities(resNationalities)
        const resProcedures = await Apis.procedures.GetAllProcedures()
        setAllProcedures(resProcedures)
        const resPacks = await Apis.packs.GetPacks()
        setAllPacks(resPacks)
        const resAgents = await Apis.users.GetAllUsers()
        setAllAgents(resAgents)
        const resCustomer = await Apis.customers.GetCustomer(uid)
        setCustomer(resCustomer.customer)
      } catch (error) {
        console.info('organisms/DataCustomer/DataCustomer.js/fetchData()')
        console.error('Error al cargar la data.')
        setError(error)
      }
    }
    fetchData()
  }, [uid])

  if ( error ) {
    return <SkeletonDataCustomer />
  }

  if ( !customer ) {
    return null
  }

  return (
    <div className="userUI__content">
      <div className="userUI__details">
        <form>
          <div className="flex gap-4 items-center justify-between sm:flex-col">
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Nombre</span>
              <InputText
                capitalize={true}
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.firstName}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Apellidos</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.lastName}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Correo electrónico</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.email}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Género:</span>
              <select 
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.gender}
                //disabled={user.role == 'Administrador' ? false : true}
              >
                <option value='Femenino'>Femenino</option>
                <option value='Masculino'>Masculino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Fecha de nacimiento</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.birthday}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Nacionalidad:</span>
              <select 
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.nationality}
                //disabled={user.role == 'Administrador' ? false : true}
              >
                {Object.keys(allNationalities).length && (
                  allNationalities.map(nationality => (
                    <option
                      key={nationality.id}
                      value={nationality.nationality.country}
                    >
                      {nationality.nationality.country}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Móvil</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.phone}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">¿Está habilitado para Whatsapp?</span>
              <select 
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.messenger}
                //disabled={user.role == 'Administrador' ? false : true}
              >
                <option value='No'>No</option>
                <option value='Sí'>Sí</option>
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Tipo de documento:</span>
              <select 
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.documentType}
                //disabled={user.role == 'Administrador' ? false : true}
              >
                <option value="Pasaporte">Pasaporte</option>
                <option value="NIE">NIE</option>
                <option value="DNI">DNI</option>
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Número de documento</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.documentNumber}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Fecha de ingreso</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.enterDate}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">¿Cumple 90 días en España?</span>
              <select 
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.threeMonts}
                disabled
              >
                {customer.threeMonths ? (
                  <option value={customer.threeMonths}>Sí</option>
                ) : (
                  <option value={customer.threeMonths}>No</option>
                )}
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              {customer.procedure != ' ' ? (
                <>
                  <span className="block text-sm">Pack</span>
                  <select 
                    className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                    defaultValue={customer.servicePack}
                    //disabled={user.role == 'Administrador' ? false : true}
                  >
                    {Object.keys(allPacks).length && (
                      allPacks.map(pack => (
                        <option
                          key={pack.id}
                          value={pack.packs.name}
                        >
                          {pack.packs.name}
                        </option>
                      ))
                    )}
                  </select>
                </>
              ) : (
                <>
                  <span className="block text-sm">Trámite</span>
                  <select 
                    className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                    defaultValue={customer.procedure}
                    //disabled={user.role == 'Administrador' ? false : true}
                  >
                    {Object.keys(allProcedures).length && (
                      allProcedures.map(procedure => (
                        <option
                          key={procedure.id}
                          value={procedure.procedure.name}
                        >
                          {procedure.procedure.name}
                        </option>
                      ))
                    )}
                  </select>
                </>
              )}
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Valor total</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.totalPrice}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Pago inicial</span>
              <InputText
                //isDisabled={user.role == 'Administrador' ? false : true}
                type='text'
                placeholder={customer.paid}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Estado</span>
              <select 
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.status}
                //disabled={user.role == 'Administrador' ? false : true}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Activo">Activo</option>
                <option value="Incompleto">Incompleto</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Agente:</span>
              <select 
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.agent}
                //disabled={user.role == 'Administrador' ? false : true}
              >
                {Object.keys(allAgents).length && (
                  allAgents.map(agent => (
                    <option
                      key={agent.id}
                      value={`${agent.firstName} ${agent.lastName}`}
                    >
                      {agent.firstName} {agent.lastName}
                    </option>
                  ))
                )}
              </select>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

const DataCustomer = ({ uid }) => {
  return (
    <Suspense fallback={<SkeletonDataCustomer />}>
      <Customer uid={uid} />
    </Suspense>
  )
}

export default DataCustomer
