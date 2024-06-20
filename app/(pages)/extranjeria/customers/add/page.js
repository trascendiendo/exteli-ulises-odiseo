'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import { db } from '@/app/libs/utils/firebase'
import Apis from '@/app/libs/apis'
import { useAuth } from '@/app/libs/providers/AuthContext';
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';

const AddCustomer = () => {
  const { user } = useAuth()
  const [thisUser, setThisUser] = useState({})
  const [allAgents, setAllAgents] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [messenger, setMessenger] = useState('')
  const [agent, setAgent] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [nationality, setNationality] = useState('')
  const [procedure, setProcedure] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [enterDate, setEnterDate] = useState('')
  const [threeMonths, setThreeMonths] = useState('')
  const [servicePack, setServicePack] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [paid, setPaid] = useState('')
  const [registerdBy, setRegisteredBy] = useState('')
  const [timeline, setTimeline] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await setDoc(doc(db, 'customers'), {

      })
      toast.success('Cliente registrado con éxito.')
      setTimeout(() => {
        setIsLoading(false)
        router.push('/extranjeria/customers')
      }, 5000);
    } catch (error) {
      setIsLoading(false)
      toast.error('Error al registrar un cliente.')
    }
  }

  useEffect(() => {
    const getUser = async () => {
      if ( user ) {
        try {
          const data = await Apis.user.GetUser(user.id)
          setThisUser(data)
        } catch (error) {
          console.info('customers/add/page.js')
          console.error(`Error al obtener data del usuario: ${error}`)
        }
      }
    }
    const getAllAgents = async () => {
      try {
        const data = await Apis.users.GetAllUsers()
        setAllAgents(data)
      } catch (error) {
        console.info('customers/add/page.js')
        console.error(`Error al obtener los usuarios: ${error}`)
      }
    }
    const getAllAgentsButMe = async () => {
      try {
        const data = await Apis.users.getAllAgentsButMe()
        setAllAgents(data)
      } catch (error) {
        console.info('customers/add/page.js')
        console.error(`Error al obtener los usuarios excepto el usuario en sesión: ${error}`)
      }
    }
    getUser()
    if (user.role == 'Administrador') {
      getAllAgentsButMe()
    } else {
      getAllAgents()
    }
  })

  console.log(allAgents)

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
          <h2 className="font-bold text-3xl">Agregar cliente</h2>
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
              <div className="form flex justify-center">
                <div className="w-6/12">

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Nombre</span>
                        <InputText
                          type='text'
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Apellidos</span>
                        <InputText
                          type='text'
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Correo electrónico</span>
                        <InputText
                          type='email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Gender</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={gender}
                          onChange={e => setGender(e.target.value)}
                          required
                        >
                          <option value="0">Seleccionar opción</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Masculino">Masculino</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Fecha de nacimiento</span>
                        {/** TODO: cambiar input a datepicker, no puede elegirse día posterior al actual */}
                        <InputText
                          type='email'
                          value={birthday}
                          onChange={e => setBirthday(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Nacionalidad</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={nationality}
                          onChange={e => setNationality(e.target.value)}
                          required
                        >
                          {/** TODO: Consumir nacionalidades */}
                          <option value="0">Seleccionar opción</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="NIE">NIE</option>
                          <option value="DNI">DNI</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Móvil</span>
                        <InputText
                          type='text'
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">¿Whatsapp?</span>
                        {/** TODO: Cambiar a select con las opciones sí y yo */}
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={messenger}
                          onChange={e => setMessenger(e.target.value)}
                          required
                        >
                          <option value="0">Seleccionar opción</option>
                          <option value="Sí">Sí</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Tipo de documento</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={documentType}
                          onChange={e => setDocumentType(e.target.value)}
                          required
                        >
                          <option value="0">Seleccionar opción</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="NIE">NIE</option>
                          <option value="DNI">DNI</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Número de documento</span>
                        <InputText
                          type='text'
                          value={documentNumber}
                          onChange={e => setDocumentNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Fecha de ingreso</span>
                        {/** TODO: cambiar input a datepicker, no puede elegirse día posterior al actual */}
                        <InputText
                          type='text'
                          value={enterDate}
                          onChange={e => setEnterDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">¿Cumple 90 días en España?</span>
                        {/** TODO: Cambiar a select con dos opciones: sí y no */}
                        <InputText
                          type='text'
                          value={threeMonths}
                          onChange={e => setThreeMonths(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Trámite</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={procedure}
                          onChange={e => setProcedure(e.target.value)}
                          required
                        >
                          {/** TODO: Consumir trámites */}
                          <option value="0">Seleccionar opción</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="NIE">NIE</option>
                          <option value="DNI">DNI</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Pack</span>
                        {/** TODO: cambiar a select, hay que registrar los packs y consumirlos */}
                        <InputText
                          type='text'
                          value={servicePack}
                          onChange={e => setServicePack(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Valor del Pack</span>
                        <InputText
                          type='text'
                          value={totalPrice}
                          onChange={e => setTotalPrice(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Pago inicial</span>
                        <InputText
                          type='text'
                          value={paid}
                          onChange={e => setPaid(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Estado</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={status}
                          onChange={e => setStatus(e.target.value)}
                          required
                        >
                          <option value="0">Seleccionar opción</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Activo">Activo</option>
                          <option value="Incompleto">Incompleto</option>
                          <option value="Finalizado">Finalizado</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      {/** TODO: Visualizado solo por Administrador */}
                      <div className="mb-4">
                        <span className="block text-sm">Agente:</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={agent}
                          onChange={e => setAgent(e.target.value)}
                          required
                        >
                          {/** TODO: Consumir usuarios */}
                          <option value="0">Seleccionar opción</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Activo">Activo</option>
                          <option value="Incompleto">Incompleto</option>
                          <option value="Finalizado">Finalizado</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 mt-5">
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-primary w-full"
                        onClick={handleSubmit}
                      >
                        Registrar
                      </button>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <button
                        className="btn btn-danger w-full"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      {isLoading && <LoadingScreen />}
    </>
  )
}

//export default WithAuth()
export default AddCustomer
