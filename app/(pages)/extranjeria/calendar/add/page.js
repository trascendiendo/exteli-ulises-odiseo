'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { serverTimestamp } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis'
import { InputText } from '@/app/ui/components/atoms';
import LoadingScreen from '@/app/ui/components/molecules/LoadingScreen';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const AddEvent = () => {
  const cookies = new Cookies
  const [thisUser, setThisUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [today, setToday] = useState(() => {
    const date = new Date()
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const d = date.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${d}`
  })
  const [agent, setAgent] = useState('')
  const [agents, setAgents] = useState(null)
  const [availableHours, setAvailableHours] = useState(null)
  const [eventTitle, setEventTitle] = useState('')
  const [eventPlace, setEventPlace] = useState('')
  const [eventStart, setEventStart] = useState('')
  const [eventEnd, setEventEnd] = useState(undefined)
  const [allDay, setAllDay] = useState(false)
  const [eventDescription, setEventDescription] = useState(undefined)
  const router = useRouter()

  const handleAllDay = () => {
    setAllDay(!allDay)
  }

  const handleCreateEvent = async () => {
    setIsLoading(true)
    try {
      const [year, month, day] = today.split('-').map(Number)
      const [startHour, startMinutes] = eventStart.split(':').map(Number)
      const [endHour, endMinutes] = eventEnd.split(':').map(Number)
      const event = {
        title: eventTitle,
        start: new Date(year, month - 1, day, startHour, startMinutes),
        end: new Date(year, month - 1, day, endHour, endMinutes),
        allDay: allDay,
        description: eventDescription,
        venue: eventPlace,
        agent: agent
      }
      await Apis.calendar.PostEvent(agent, event)
      toast.success('Evento registrado con éxito.')
    } catch (error) {
      toast.error('Error al registrar un evento.')
    } finally {
      setIsLoading(false)
      router.push('/extranjeria/calendar')
    }
  }

  useEffect(() => {
    const fetchAgents = async () => {
      setIsLoading(true)
      const status = 'Activo'
      try {
        const res = await Apis.users.GetAllUsersByStatus(status)
        setAgents(res)
      } catch (error) {
        console.info('fetchAgents calendar/add/page.js')
        console.error(`Error al obtener data`)
      }
      setIsLoading(false)
    }
    fetchAgents()
  }, [])

  useEffect(() => {
    const getAvailableHours = async () => {
      setIsLoading(true)
      try {
        const res = await Apis.calendar.GetTodayHours(today)
        if ( res ) {
          const now = new Date()
          const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
          const filteredHours = today === now.toISOString().split('T')[0]
            ? res.filter(hour => hour > currentTime)
            : res
          setAvailableHours(filteredHours)
        }
      } catch (error) {
        console.error(`getAvailableHours: Error al obtener horas disponibles`)
      } finally {
        setIsLoading(false)
      }
    }
    getAvailableHours()
  }, [today])

  useEffect(() => {
    if ( eventStart ) {
      const [startHour, startMinute] = eventStart.split(':').map(Number)
      const endDate = new Date()
      endDate.setHours(startHour, startMinute + 30)
  
      const formattedEnd = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`
      setEventEnd(formattedEnd)
    }
  }, [eventStart])

  const isFormValid = eventTitle && eventPlace && agent && eventStart

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
          <h2 className="font-bold text-3xl">Agregar evento</h2>
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
                        <span className="block text-sm">Título del evento/cita (*)</span>
                        <InputText
                          type='text'
                          value={eventTitle}
                          onChange={e => setEventTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Lugar de la evento/cita (*)</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          onChange={e => {
                            setEventPlace(e.target.value)
                          }}
                        >
                          <option value="">Seleccionar oficina</option>
                          <option value="Jacinto Verdaguer 12">Jacinto Verdaguer 12</option>
                          <option value="Vallecas">Vallecas</option>
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
                          <option value=''>Seleccionar agente</option>
                          {agents && (
                            agents.map(agent => (
                              <option
                                key={agent.id}
                                value={`${agent.id}`}
                              >
                                {agent.firstName} {agent.lastName}
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
                        <span className="block text-sm">Fecha de la cita (*)</span>
                        <InputText
                          type='date'
                          min={new Date().toISOString().split('T')[0]}
                          value={today}
                          onChange={e => setToday(e.target.value)}
                          required
                          autoComplete='none'
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <div className="mb-4">
                        <span className="block text-sm">Inicio del evento/cita (*)</span>
                        <select
                          className="border rounded-lg px-3 py-3.5 text-sm w-full"
                          onChange={e => {
                            setEventStart(e.target.value)
                          }}
                        >
                          <option value="">Seleccionar hora de inicio</option>
                          {availableHours && (
                            availableHours.map((hour, index) => (
                              <option
                                key={index}
                                value={hour}
                              >
                                {hour}
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
                        <span className="block text-sm">Descripción del evento</span>
                        <textarea
                          name='notes'
                          className='block border rounded-lg px-3 py-3.5 text-sm w-full'
                          style={{ resize: 'none' }}
                          rows='7'
                          onChange={e => setEventDescription(e.target.value)}
                        >  
                        </textarea>
                      </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="w-full sm:w-6/12">
                      <Link
                        className='btn btn-danger w-full uppercase'
                        href={`./`}
                      >
                        Cancelar
                      </Link>
                    </div>
                    <div className="w-full sm:w-6/12">
                      <button
                        className='btn btn-success w-full uppercase'
                        onClick={handleCreateEvent}
                        disabled={!isFormValid}
                      >
                        Registrar
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

export default AddEvent
