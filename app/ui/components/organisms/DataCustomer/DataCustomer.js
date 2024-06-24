'use client'

import { Suspense, useEffect, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis';
import { InputText } from '@/app/ui/components/atoms';
import SkeletonDataCustomer from '@/app/ui/components/skeletons/organisms/DataCustomer/DataCustomer';

const Customer = ({
  uid
}) => {
  const cookies = new Cookies
  const [customer, setCustomer] = useState(null)
  const [allNationalities, setAllNationalities] = useState(null)
  const [allProcedures, setAllProcedures] = useState(null)
  const [allPacks, setAllPacks] = useState(null)
  const [allAgents, setAllAgents] = useState(null)
  const [error, setError] = useState(null)
  const [thisUser, setThisUser] = useState({})

  useEffect(() => {
    const getUser = () => {
      const user = cookies.get('user')
      if ( user ) setThisUser(user)
    }
  getUser()
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(e)
    const updatedCustomer = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      gender: e.target.gender.value,
      birthday: e.target.birthday.value,
      nationality: e.target.nationality.value,
      phone: e.target.phone.value,
      messenger: e.target.messenger.value,
      documentType: e.target.documentType.value,
      documentNumber: e.target.documentNumber.value,
      enterDate: e.target.enterDate.value,
      threeMonths: customer.threeMonths,
      servicePack: e.target.servicePack.value ? e.target.servicePack.value : '',
      procedure: e.target.procedure.value ? e.target.procedure.value : '',
      totalPrice: e.target.totalPrice.value,
      paid: e.target.paid.value,
      status: e.target.status.value,
      agent: e.target.agent.value,
      updatedAt: serverTimestamp()
    }
    console.log('uid', uid)
    console.log('updatedCustomer', updatedCustomer)
    try {
      await Apis.customers.PatchCustomer(uid, updatedCustomer)
      toast.success('Usuario actualizado con éxito')
    } catch (error) {
      toast.error('Error al actualizar el usuario')
      console.error(error)
    }
  }

  if ( error ) {
    return <SkeletonDataCustomer />
  }

  if ( !customer ) {
    return null
  }

  return (
    <div className="userUI__content">
      <div className="userUI__details">
        <form onSubmit={handleUpdate}>
          <div className="flex gap-4 items-center justify-between sm:flex-col">
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Nombre</span>
              <InputText
                name='firstName'
                capitalize={true}
                type='text'
                defaultValue={customer.firstName}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Apellidos</span>
              <InputText
                name='lastName'
                type='text'
                defaultValue={customer.lastName}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Correo electrónico</span>
              <InputText
                name='email'
                type='text'
                defaultValue={customer.email}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Género:</span>
              <select 
                name='gender'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.gender}
              >
                <option value='Femenino'>Femenino</option>
                <option value='Masculino'>Masculino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Fecha de nacimiento</span>
              <InputText
                name='birthday'
                type='text'
                defaultValue={customer.birthday}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Nacionalidad:</span>
              <select 
                name='nationality'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.nationality}
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
                name='phone'
                type='text'
                defaultValue={customer.phone}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">¿Está habilitado para Whatsapp?</span>
              <select 
                name='messenger'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.messenger}
              >
                <option value='No'>No</option>
                <option value='Sí'>Sí</option>
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Tipo de documento:</span>
              <select 
                name='documentType'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.documentType}
              >
                <option value="Pasaporte">Pasaporte</option>
                <option value="NIE">NIE</option>
                <option value="DNI">DNI</option>
              </select>
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Número de documento</span>
              <InputText
                name='documentNumber'
                type='text'
                defaultValue={customer.documentNumber}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Fecha de ingreso</span>
              <InputText
                name='enterDate'
                type='text'
                defaultValue={customer.enterDate}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">¿Cumple 90 días en España?</span>
              <select 
                name='threeMonts'
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
              <span className="block text-sm">Pack</span>
              <select 
                name='servicePack'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.servicePack}
                disabled={customer.servicePack == ''}
              >
                {customer.servicePack == '' ? (
                  <option value="">---</option>
                ) : (
                  <option value="">Seleccionar pack</option>
                )}
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
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Trámite</span>
              <select 
                name='procedure'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.procedure}
                disabled={customer.procedure == ''}
              >
                {customer.procedure == '' ? (
                  <option value="">---</option>
                ) : (
                  <option value="">Seleccionar trámite</option>
                )}
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
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Valor total</span>
              <InputText
                name='totalPrice'
                type='text'
                defaultValue={customer.totalPrice}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Pago inicial</span>
              <InputText
                name='paid'
                type='text'
                defaultValue={customer.paid}
              />
            </div>
            <div className="w-6/12 sm:w-full">
              <span className="block text-sm">Estado</span>
              <select 
                name='status'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.status}
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
                name='agent'
                className="border rounded-lg px-3 py-3.5 text-sm w-full" 
                defaultValue={customer.agent}
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
            <div className="flex justify-center w-6/12 sm:w-full">
              <div className="w-full sm:w-6/12">
                <button
                  className="btn btn-primary w-full"
                  type='submit'
                >
                  Actualizar
                </button>
              </div>
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
