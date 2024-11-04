'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Calendar, Eye, FileText, MapPin,TextAUnderline, Trash, User } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listMonth from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import { Warning, X } from '@phosphor-icons/react';
import Cookies from 'universal-cookie';
import Apis from '@/app/libs/apis';
import { dateFormat, getUser } from '@/app/libs/utils';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PageCalendar = () => {
  const cookies = new Cookies
  const [thisUser, setThisUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [agents, setAgents] = useState(null)
  const [events, setEvents] = useState(null)
  const [modal, setModal] = useState(false)
  const calendarRef = useRef(null)

  const [eventTitle, setEventTitle] = useState(undefined)
  const [description, setDescription] = useState(undefined)
  const [eventStart, setEventStart] = useState(undefined)
  const [eventEnd, setEventEnd] = useState(undefined)
  const [eventVenue, setEventVenue] = useState(undefined)
  const [eventClient, setEventClient] = useState(undefined)
  const [eventAgent, setEventAgent] = useState(undefined)

  const handleCloseModal = () => {
    setModal(false)
  }

  const handleSelect = (selectInfo) => {
    let calendar = selectInfo.view.calendar
    calendar.unselect()
  }

  const handleEventClick = async (clickInfo) => {
    const event = clickInfo.event
    setEventTitle(event.title)
    setDescription(event.extendedProps.description)
    setEventStart(event.start)
    setEventEnd(event.end)
    setEventVenue(event.extendedProps.venue)
    setEventClient(event.extendedProps.client)
    const getAgentFullName = await Apis.users.GetUser(event.extendedProps.agent)
    if ( getAgentFullName ) setEventAgent(`${getAgentFullName.firstName} ${getAgentFullName.lastName}`)
    setModal(true)
  }

  const handleAgentCalendar = (agent) => {
    getEvents(agent)
  }

  const getEvents = async (uid) => {
    setLoading(true)
    try {
      const res = await Apis.calendar.GetEvents(uid)
      setEvents(res)
    } catch (error) {
      console.info('fetchEvents')
      console.error(`Error al obtener events calendar/page.js`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      const userRes = cookies.get('user')
      if ( userRes ) {
        setThisUser(userRes)
      }
      setLoading(true)
      try {
        const agentRes = await Apis.users.GetAllUsers()
        setAgents(agentRes)
      } catch (error) {
        console.info('getData')
        console.error(`Error al obtener data`)
      }
      setLoading(false)
    }
    getData()
  }, [])

  useEffect(() => {
    if ( thisUser && thisUser.uid ) {
      getEvents(thisUser.uid)
    }
  }, [thisUser])

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
          <h2 className="font-bold text-3xl">Agenda</h2>
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
                <div className="w-3/12">
                  <span className="block text-sm">Seleccionar agente</span>
                  <select
                    className="border rounded-lg px-3 py-3.5 text-sm w-full"
                    onChange={(e) => handleAgentCalendar(e.target.value)}
                    value={thisUser.uid}
                  >
                    <option>Seleccionar agente</option>
                    {agents && (
                      agents.map(agent => (
                        <option
                          key={agent.id}
                          value={agent.id}
                        >
                          {agent.firstName} {agent.lastName}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <Link
                  className="btn btn-success"
                  href='/extranjeria/calendar/add'
                >
                  Agregar cita
                </Link>
              </div>
              <div>
                {events && (
                  <FullCalendar
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                    }}
                    slotDuration='00:30:00'
                    navLinks={true}
                    height='auto'
                    droppable={true}
                    selectable={true}
                    selectMirror={true}
                    editable={true}
                    dayMaxEvents={true}
                    handleWindowResize={true}
                    select={handleSelect}
                    eventClick={handleEventClick}
                    events={events}
                    initialView='dayGridMonth'
                    locale={esLocale}
                    plugins={[ dayGridPlugin, timeGridPlugin, listMonth, interactionPlugin ]}
                    timeZone='Europe/Madrid'
                    slotMinTime="10:00:00"
                    slotMaxTime="18:00:00"
                    nowIndicator={true}
                    ref={calendarRef}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Toaster />
        {modal && (
          <div className={`modal`}>
            <div className='modal__content' style={{ height: '480px' }}>
              <div className='modal__close'>
                <button onClick={handleCloseModal}>
                  <X size={32} />
                </button>
              </div>
              <div className='mt-4'>
                <div className='flex gap-3 mb-3'>
                  <div>
                    <span className='bg-gray-200 flex items-center justify-center rounded-xl px-1 py-2'>
                      <TextAUnderline size={32} />
                    </span>
                  </div>
                  <div>
                    <h5 className='font-semibold mb-1 text-lg'>
                      Título    
                    </h5>
                    <p className='font-light'>
                      {eventTitle}
                    </p>
                  </div>
                </div>
                <div className='flex gap-3 mb-3'>
                  <div>
                    <span className='bg-gray-200 flex items-center justify-center rounded-xl px-1 py-2'>
                      <MapPin size={32} />
                    </span>
                  </div>
                  <div>
                    <h5 className='font-semibold mb-1 text-lg'>
                      Lugar
                    </h5>
                    <p className='font-light'>
                      {eventVenue}
                    </p>
                  </div>
                </div>
                <div className='flex gap-3 mb-3'>
                  <div>
                    <span className='bg-gray-200 flex items-center justify-center rounded-xl px-1 py-2'>
                      <Calendar size={32} />
                    </span>
                  </div>
                  <div>
                    <h5 className='font-semibold mb-1 text-lg'>
                      Fecha
                    </h5>
                    {eventEnd ? 
                      <>
                        <p className='font-light'>
                          {dateFormat(eventStart)} al {dateFormat(eventEnd)}
                        </p>
                      </> :
                      <>
                        <p className='font-light'>
                          {dateFormat(eventStart)}
                        </p>
                      </>
                    }
                  </div>
                </div>
                <div className='flex gap-3 mb-3'>
                  <div>
                    <span className='bg-gray-200 flex items-center justify-center rounded-xl px-1 py-2'>
                      <FileText size={32} />
                    </span>
                  </div>
                  <div>
                    <h5 className='font-semibold mb-1 text-lg'>
                      Descripción
                    </h5>
                    <p className='font-light'>
                      {description}
                    </p>
                  </div>
                </div>
                <div className='flex gap-3'>
                  <div>
                    <span className='bg-gray-200 flex items-center justify-center rounded-xl px-1 py-2'>
                      <User size={32} />
                    </span>
                  </div>
                  <div>
                    <h5 className='font-semibold mb-1 text-lg'>
                      Agente
                    </h5>
                    <p className='font-light'>
                      {eventAgent}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default PageCalendar
