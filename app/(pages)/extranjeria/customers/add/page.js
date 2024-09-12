'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Apis from '@/app/libs/apis'
import { useAuth } from '@/app/libs/providers/AuthContext';
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const AddCustomer = () => {
  const { user } = useAuth()
  const [thisUser, setThisUser] = useState({})
  const [allNationalities, setAllNationalities] = useState({})
  const [allProcedures, setAllProcedures] = useState({})
  const [allPacks, setAllPacks] = useState({})
  const [allAgents, setAllAgents] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneSecondary, setPhoneSecondary] = useState('')
  const [messenger, setMessenger] = useState('')
  const [agent, setAgent] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [nationality, setNationality] = useState('')
  const [procedure, setProcedure] = useState('')
  const [procedureName, setProcedureName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')
  const [enterDate, setEnterDate] = useState('')
  const [threeMonths, setThreeMonths] = useState('')
  const [servicePack, setServicePack] = useState('')
  const [packName, setPackName] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [paid, setPaid] = useState('')
  const [registerdBy, setRegisteredBy] = useState('')
  const [totalPriceDisabled, setTotalPriceDisabled] = useState(true)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsLoading(true)
    const timeline = {
      registerdBy: user,
      comment: `Registrado para ${procedure != 0 ? procedure : servicePack}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    const accounting = {
      type: 'ingreso',
      amount: paid,
      description: `${firstName} ${lastName}`,
      reference: servicePack != 0 ? packName : procedureName,
      registerdBy: user,
      createdAt: serverTimestamp()
    }
    try {
      const timelineRef = await Apis.timelines.PostTimeline(timeline)
      const timelineUid = timelineRef.id
      if (paid > 0) {
        await Apis.accounting.PostAccounting(accounting)
        toast.success('Ingreso registrado con éxito.')
      }
      const customer = {
        firstName,
        lastName,
        email,
        phone,
        phoneSecondary,
        messenger,
        agent,
        documentType,
        documentNumber,
        nationality,
        procedure,
        birthday,
        gender,
        status,
        enterDate,
        threeMonths,
        servicePack,
        totalPrice,
        paid,
        registerdBy: `${user.firstName} ${user.lastName}`,
        timeline: timelineUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      await Apis.customers.PostCustomer(customer)
      toast.success('Cliente registrado con éxito.')
    } catch (error) {
      toast.error('Error al registrar un cliente.')
    } finally {
      setIsLoading(false)
      router.push('/extranjeria/customers')
    }
  }

  const handle90days = (e) => {
    setEnterDate(e)
    let enter = new Date(e)
    let today = new Date().getTime()
    enter.setDate(enter.getDate() + 90)
    setThreeMonths( enter <= today )
  }

  const handlePackPrice = (e) => {
    if (e.target.name == 'selectPack') {
      const selectedPack = allPacks.find(pack => pack.packs.price == e.target.value)
      setServicePack(e.target.value)
      setPackName(selectedPack.packs.name)
      setProcedure(0)
      setProcedureName('')
      setTotalPriceDisabled(true)
      setTotalPrice(e.target.value)
    } else {
      const selectedProcedure = allProcedures.find(procedure => procedure.procedure.price == e.target.value)
      setProcedure(e.target.value)
      setProcedureName(selectedProcedure.procedure.name)
      setServicePack(0)
      setPackName('')
      setTotalPriceDisabled(false)
      setTotalPrice('0.00 (Ingresar precio...)')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        setThisUser(user)
        const resNationalities = await Apis.nationalities.GetAllNationalities()
        setAllNationalities(resNationalities)
        const resProcedures = await Apis.procedures.GetAllProcedures()
        setAllProcedures(resProcedures)
        const resPacks = await Apis.packs.GetPacks()
        setAllPacks(resPacks)
        const resAgents = await Apis.users.GetAllUsers()
        setAllAgents(resAgents)
      } catch (error) {
        console.info('fetchData')
        console.error(`Error al obtener data`)
      }
      setIsLoading(false)
    }
    fetchData()
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
          <Breadcrumbs />
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
                        <span className="block text-sm">Nombre (*)</span>
                        <InputText
                          type='text'
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Apellidos (*)</span>
                        <InputText
                          type='text'
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Correo electrónico (*)</span>
                        <InputText
                          type='email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Género (*)</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={gender}
                          onChange={e => setGender(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar opción</option>
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
                        <span className="block text-sm">Fecha de nacimiento (*)</span>
                        <InputText
                          type='date'
                          value={birthday}
                          max={new Date().toJSON().slice(0, 10)}
                          onChange={e => setBirthday(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Nacionalidad (*)</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={nationality}
                          onChange={e => setNationality(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar opción</option>
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
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Móvil principal (*)</span>
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
                        >
                          <option value="No">No</option>
                          <option value="Sí">Sí</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                        <div className="mb-4">
                          <span className="block text-sm">Móvil secundario</span>
                          <InputText
                            type='text'
                            value={phoneSecondary}
                            onChange={e => setPhoneSecondary(e.target.value)}
                          />
                        </div>
                    </div>
                    <div className="w-full sm:w-6/12"></div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4"> 
                        <span className="block text-sm">Tipo de documento (*)</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={documentType}
                          onChange={e => setDocumentType(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar opción</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="NIE">NIE</option>
                          <option value="DNI">DNI</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Número de documento (*)</span>
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
                        <InputText
                          type='date'
                          value={enterDate}
                          max={new Date().toJSON().slice(0, 10)}
                          onChange={e => handle90days(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">¿Cumple 90 días en España?</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={threeMonths}
                          disabled
                        >
                          <option value="">Calculando...</option>
                          {threeMonths ? (
                            <option value={threeMonths}>Sí</option>
                          ) : (
                            <option value={threeMonths}>No</option>
                          )}
                        </select>
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
                          name='selectProcedure'
                          onChange={e => handlePackPrice(e)}
                        >
                          {/** TODO: Consumir trámites */}
                          <option value="0">Seleccionar trámite</option>
                          {Object.keys(allProcedures).length && (
                            allProcedures.map(procedure => (
                              <option
                                key={procedure.id}
                                value={procedure.procedure.price}
                                name={procedure.procedure.name}
                              >
                                {procedure.procedure.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Pack</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={servicePack}
                          name='selectPack'
                          onChange={e => handlePackPrice(e)}
                        >
                          <option value="0">Seleccionar pack</option>
                          {Object.keys(allPacks).length && (
                            allPacks.map(pack => (
                              <option
                                key={pack.id}
                                value={pack.packs.price}
                                name={pack.packs.name}
                              >
                                {pack.packs.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        {/** TODO: quitar el valor total, el precio irá directamente del tramite o del pack */}
                        <span className="block text-sm">Valor total (*)</span>
                        <InputText
                          type='text'
                          value={totalPrice}
                          placeholder="Calculando..."
                          disabled={totalPriceDisabled}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Pago inicial (*)</span>
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
                        <span className="block text-sm">Estado (*)</span>
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
                      <div className="mb-4">
                        <span className="block text-sm">Agente (*)</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          value={agent}
                          onChange={e => setAgent(e.target.value)}
                          required
                        >
                          <option value="0">Seleccionar opción</option>
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
                      <Link
                        className="btn btn-danger w-full"
                        href={`./`}
                      >
                        Cancelar
                      </Link>
                    </div>
                  </div>
                  <InputText
                    type='hidden'
                    value={registerdBy}
                    onChange={e => setRegisteredBy(user.uid)}
                  />

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
