'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, Trash } from '@phosphor-icons/react/dist/ssr';
import toast, { Toaster } from 'react-hot-toast'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listMonth from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import { Warning, X } from '@phosphor-icons/react';
import Apis from '@/app/libs/apis';
import { dateFormat, timeFormat } from '@/app/libs/utils';
import { Badge } from '@/app/ui/components/atoms';
import { Breadcrumbs } from '@/app/ui/components/organisms';

const PageCalendar = () => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState(null)
  const [modal, setModal] = useState(false)

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
    console.log(calendar)
  }

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event
    console.log(event.end)
    setEventTitle(event.title)
    setDescription(event.extendedProps.description)
    setEventStart(event.start)
    setEventEnd(event.end)
    setEventVenue(event.extendedProps.venue)
    setEventClient(event.extendedProps.client)
    setEventAgent(event.extendedProps.agent)

    setModal(true)
  }

  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  useEffect(() => {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    setEvents([
      {
        title: 'All Day Event',
        start: new Date(y, m, 1),
        allDay: true,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
        venue: 'City Town',
        className: 'event-warning'
      },
      {
        title: 'Long Event',
        start: new Date(y, m, 7),
        end: new Date(y, m, 10),
        allDay: true,
        description:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        venue: 'City Town',
        className: 'event-primary'
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: new Date(y, m, 9, 16, 0),
        allDay: false,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
        venue: 'City Town',
        className: 'event-danger'
      },
      {
        groupId: 999,
        title: 'Repeating Event',
        start: new Date(y, m, 16, 16, 0),
        allDay: false,
        description:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        venue: 'City Town',
        className: 'event-danger'
      },
      {
        title: 'Conference',
        start: new Date(y, m, 11),
        end: new Date(y, m, 13),
        allDay: true,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
        venue: 'City Town',
        className: 'event-info'
      },
      {
        title: 'Meeting',
        start: new Date(y, m, 12, 10, 30),
        end: new Date(y, m, 12, 12, 30),
        allDay: false,
        description:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        venue: 'City Town',
        className: 'event-danger'
      },
      {
        title: 'Lunch',
        start: new Date(y, m, 12, 12, 30),
        allDay: false,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
        venue: 'City Town',
        className: 'event-success'
      },
      {
        title: 'Meeting',
        start: new Date(y, m, 14, 14, 30),
        allDay: false,
        description:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        venue: 'City Town',
        className: 'event-warning'
      },
      {
        title: 'Happy Hour',
        start: new Date(y, m, 14, 17, 30),
        allDay: false,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
        venue: 'City Town',
        className: 'event-info'
      },
      {
        title: 'Dinner',
        start: new Date(y, m, 15, 20, 0o0),
        allDay: false,
        description:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        venue: 'City Town',
        className: 'event-primary'
      },
      {
        title: 'Birthday Party',
        start: new Date(y, m, 13, 0o0, 0o0),
        allDay: false,
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.',
        venue: 'City Town',
        className: 'event-success'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        allDay: true,
        description:
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
        venue: 'City Town',
        start: new Date(y, m, 28)
      }
    ])
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
                <div className="w-4/12"></div>
                <Link
                  className="btn btn-success"
                  href='/extranjeria/packs/add'
                >
                  Agregar cita
                </Link>
              </div>
              <div>
                <FullCalendar
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                  }}
                  slotDuration='00:10:00'
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
                  initialView='dayGrid'
                  locale={esLocale}
                  plugins={[ dayGridPlugin, timeGridPlugin, listMonth, interactionPlugin ]}
                />
              </div>
            </div>
          </div>
        </div>
        <Toaster />
        {modal && (
          <div className={`modal`}>
            <div className='modal__content' style={{ height: '350px' }}>
              <div className='modal__close'>
                <button onClick={handleCloseModal}>
                  <X size={32} />
                </button>
              </div>
              <div className='flex justify-center mt-4'>
                <p>
                  {eventTitle}
                </p>
                <p>
                  {description}
                </p>
                <p>
                  {dateFormat(eventStart)}
                </p>
                {eventEnd ? 
                  <>
                    <p>
                      {dateFormat(eventStart)}
                    </p>
                  </> :
                  <>
                    <p>
                      {dateFormat(eventStart)} to {dateFormat(eventEnd)}
                    </p>
                  </>
                }
                <p>
                  {eventVenue}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default PageCalendar
